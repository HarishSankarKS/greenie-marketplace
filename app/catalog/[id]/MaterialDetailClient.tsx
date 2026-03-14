"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, ShoppingCart, FlaskConical, ChevronLeft, Star,
  Package, Bell, AlertCircle, Check
} from "lucide-react";
import { getMaterialById, categoryIcons } from "@/lib/mock/materials";
import { getReviewsForMaterial, getAverageRatings } from "@/lib/mock/reviews";
import { useCart } from "@/components/CartProvider";
import { formatCurrency, formatDate } from "@/lib/utils";

const zoneBgMap: Record<string, string> = {
  North: "zone-north", South: "zone-south", East: "zone-east", West: "zone-west",
};

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export default function MaterialDetailClient({ id }: { id: string }) {
  const material = getMaterialById(id);
  if (!material) notFound();

  const reviews = getReviewsForMaterial(id);
  const avgRatings = getAverageRatings(id);
  const { addItem, items } = useCart();

  const [qty, setQty] = useState(material.minOrder);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isOutOfStock = material.availableQty === 0;
  const alreadyInCart = items.some((i) => i.material.id === material.id);

  const handleAddToCart = () => {
    addItem(material, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const overallAvg = avgRatings
    ? ((avgRatings.materialQuality + avgRatings.gradeAccuracy + avgRatings.deliveryPunctuality) / 3).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-page py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-green-700 transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{material.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 h-72 md:h-96 flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="text-9xl opacity-10">{categoryIcons[material.category]}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent" />
              {material.labCertAvailable && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
                  <FlaskConical className="w-3.5 h-3.5" /> Lab Certificate Available
                </div>
              )}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                  <span className="text-white text-lg font-bold bg-gray-800/70 px-6 py-3 rounded-2xl">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Material Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Category", value: material.category },
                  { label: "Grade", value: material.grade },
                  { label: "Source Zone", value: `${material.zone} Transfer Station` },
                  { label: "Unit", value: material.unit },
                  { label: "Min. Order", value: `${material.minOrder} ${material.unit}s` },
                  { label: "Available", value: isOutOfStock ? "Out of Stock" : `${material.availableQty.toLocaleString()} ${material.unit}s` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-0.5 font-medium">{label}</p>
                    <p className={`text-sm font-semibold ${label === "Available" && isOutOfStock ? "text-red-500" : "text-gray-900"}`}>{value}</p>
                  </div>
                ))}
              </div>
              {material.labCertAvailable && (
                <button className="mt-4 flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors w-full justify-center font-medium">
                  <FlaskConical className="w-4 h-4" /> Download Lab Certificate (PDF)
                </button>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{material.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {material.tags.map((t) => (
                  <span key={t} className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">#{t}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Buyer Reviews</h2>
                {avgRatings && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{overallAvg}</span>
                    <div><StarRating value={Number(overallAvg)} /><p className="text-xs text-gray-400 mt-0.5">{avgRatings.count} review{avgRatings.count !== 1 ? "s" : ""}</p></div>
                  </div>
                )}
              </div>
              {avgRatings && (
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  {[
                    { label: "Material Quality", val: avgRatings.materialQuality },
                    { label: "Grade Accuracy", val: avgRatings.gradeAccuracy },
                    { label: "Delivery", val: avgRatings.deliveryPunctuality },
                  ].map(({ label, val }) => (
                    <div key={label} className="text-center">
                      <p className="text-lg font-bold text-gray-900">{val.toFixed(1)}</p>
                      <StarRating value={val} />
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              )}
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No reviews yet — be the first to order!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.buyerName}</p>
                          <p className="text-xs text-gray-400">{r.buyerType} · {formatDate(r.createdAt)}</p>
                        </div>
                        <StarRating value={(r.materialQuality + r.gradeAccuracy + r.deliveryPunctuality) / 3} />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${zoneBgMap[material.zone]}`}>
                    <MapPin className="w-3 h-3 inline mr-0.5" />{material.zone}
                  </span>
                  <span className="text-xs text-gray-500 px-2.5 py-1 bg-gray-100 rounded-full font-medium">{material.category}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">{material.name}</h1>
                <p className="text-sm text-gray-500 mb-5">{material.grade}</p>
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-green-700">{formatCurrency(material.pricePerUnit)}</span>
                    <span className="text-sm text-gray-400">per {material.unit}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">+ 18% GST · Logistics fee calculated at checkout</p>
                </div>
                {!isOutOfStock ? (
                  <>
                    <div className="flex items-center gap-2 mb-5 p-3 bg-green-50 rounded-xl border border-green-100">
                      <Package className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-700 font-medium">{material.availableQty.toLocaleString()} {material.unit}s in stock</p>
                    </div>
                    <div className="mb-5">
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Quantity</label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQty(Math.max(material.minOrder, qty - material.minOrder))} className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors font-bold text-lg">−</button>
                        <div className="flex-1 text-center"><span className="text-lg font-bold text-gray-900">{qty}</span><span className="text-sm text-gray-400 ml-1">{material.unit}s</span></div>
                        <button onClick={() => setQty(Math.min(material.availableQty, qty + material.minOrder))} className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-700 transition-colors font-bold text-lg">+</button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 text-center">Min. order: {material.minOrder} {material.unit}s</p>
                    </div>
                    <div className="mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-gray-900">{formatCurrency(material.pricePerUnit * qty)}</span>
                      </div>
                    </div>
                    <button onClick={handleAddToCart} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md ${addedToCart ? "bg-green-500 text-white" : "bg-green-700 hover:bg-green-800 text-white"}`}>
                      {addedToCart ? <><Check className="w-4 h-4" />Added to Cart!</> : <><ShoppingCart className="w-4 h-4" />Add to Cart</>}
                    </button>
                    {alreadyInCart && !addedToCart && <p className="text-xs text-center text-green-600 mt-2">✓ Already in cart</p>}
                    <Link href="/checkout" className="block w-full text-center mt-2 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:border-green-400 hover:text-green-700 transition-colors">Proceed to Checkout</Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700 font-medium">Currently Out of Stock</p>
                    </div>
                    {notifySubmitted ? (
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-700 font-semibold">You&apos;re on the list!</p>
                        <p className="text-xs text-green-600 mt-1">We&apos;ll notify you when this is back in stock.</p>
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setNotifySubmitted(true); }} className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 block"><Bell className="w-4 h-4 inline mr-1.5 text-amber-500" />Notify When In Stock</label>
                        <input type="email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} required placeholder="your@email.com" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400" />
                        <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-colors text-sm">Notify Me</button>
                      </form>
                    )}
                  </>
                )}
              </div>
              <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
                {["✓ AI grade-verified at Transfer Station", "✓ Real-time stock from Fleet Intelligence", "✓ GST invoice on every order", "✓ Live GPS tracking included"].map((t) => (
                  <p key={t} className="text-xs text-green-700 font-medium py-1">{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
