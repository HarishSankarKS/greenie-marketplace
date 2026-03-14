"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { Truck, MapPin, Calendar, CreditCard, Check } from "lucide-react";

const deliverySlots = [
  "Mon 16 Mar · 8:00–12:00", "Mon 16 Mar · 13:00–17:00",
  "Tue 17 Mar · 8:00–12:00", "Tue 17 Mar · 13:00–17:00",
  "Wed 18 Mar · 8:00–12:00",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [address, setAddress] = useState("14, Anna Nagar, Coimbatore – 641003");

  const logisticsFee = deliveryMode === "delivery" ? 800 : 0;
  const pickupDiscount = deliveryMode === "pickup" ? Math.round(subtotal * 0.03) : 0;
  const taxableAmount = subtotal - pickupDiscount + logisticsFee;
  const gst = Math.round(taxableAmount * 0.18);
  const total = taxableAmount + gst;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link href="/catalog" className="text-green-700 font-semibold hover:text-green-800">Browse Materials →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-page py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Mode */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-green-600"/>Delivery Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { mode: "delivery" as const, label: "GREENIE Delivery", sub: "We bring it to you · ₹800 logistics fee", icon: "🚛" },
                  { mode: "pickup" as const, label: "Self Pickup", sub: "Collect from Transfer Station · 3% discount", icon: "🏭" },
                ].map(({ mode, label, sub, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setDeliveryMode(mode)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${deliveryMode === mode ? "border-green-600 bg-green-50" : "border-gray-100 bg-gray-50 hover:border-green-300"}`}
                  >
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className={`font-semibold text-sm ${deliveryMode === mode ? "text-green-800" : "text-gray-900"}`}>{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Address or Station */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600"/>
                {deliveryMode === "delivery" ? "Delivery Address" : "Pickup Station"}
              </h2>
              {deliveryMode === "delivery" ? (
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 resize-none"
                />
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.material.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.material.zone} Transfer Station</p>
                        <p className="text-xs text-gray-500">for {item.material.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slot */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-600"/>
                {deliveryMode === "delivery" ? "Delivery Slot" : "Pickup Slot"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deliverySlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${
                      selectedSlot === slot
                        ? "border-green-600 bg-green-50 text-green-800"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-green-300"
                    }`}
                  >
                    {selectedSlot === slot ? <Check className="w-3 h-3 inline mr-1.5 text-green-600"/> : null}
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-green-600"/>Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "upi", label: "UPI", icon: "📱" },
                  { id: "netbanking", label: "Net Banking", icon: "🏦" },
                  { id: "neft", label: "NEFT / RTGS", icon: "💸" },
                  { id: "po", label: "Purchase Order", icon: "📋" },
                ].map(({ id, label, icon }) => (
                  <div key={id} className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:border-green-400 transition-colors">
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div>
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.material.id} className="flex justify-between items-start gap-2 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.material.name}</p>
                        <p className="text-xs text-gray-400">{item.quantity} {item.material.unit}s</p>
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        {formatCurrency(item.material.pricePerUnit * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  {pickupDiscount > 0 && <div className="flex justify-between text-green-600"><span>Pickup discount (3%)</span><span>− {formatCurrency(pickupDiscount)}</span></div>}
                  {logisticsFee > 0 && <div className="flex justify-between text-gray-500"><span>Logistics fee</span><span>{formatCurrency(logisticsFee)}</span></div>}
                  <div className="flex justify-between text-gray-500"><span>GST (18%)</span><span>{formatCurrency(gst)}</span></div>
                  <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span className="text-green-700">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => { clearCart(); router.push("/checkout/confirmation"); }}
                  disabled={!selectedSlot}
                  className="w-full mt-5 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-colors disabled:opacity-50 shadow-md"
                >
                  Place Order
                </button>
                {!selectedSlot && (
                  <p className="text-xs text-center text-gray-400 mt-2">Please select a delivery slot</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
