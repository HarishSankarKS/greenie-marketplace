"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, ShoppingCart, Heart, Star, FlaskConical, Zap } from "lucide-react";
import { Material } from "@/lib/mock/materials";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

const zoneColorMap: Record<string, string> = {
  North: "zone-north", South: "zone-south", East: "zone-east", West: "zone-west",
};

const categoryEmoji: Record<string, string> = {
  Concrete: "🪨", Steel: "⚙️", Wood: "🪵", Plastic: "♻️", Glass: "🪟"
};

export default function MaterialCard({ material }: { material: Material }) {
  const { addItem } = useCart();
  const [hovering, setHovering] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock = material.availableQty === 0;
  const isLowStock = !isOutOfStock && material.availableQty < material.minOrder * 5;

  // Mock star rating
  const rating = 4.7;
  const reviewCount = Math.floor(Math.random() * 40) + 8;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(material, material.minOrder);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="card"
      style={{ overflow: "hidden", cursor: "pointer", position: "relative" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* ── Thumbnail 4:3 ── */}
      <Link href={`/catalog/${material.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{
          position: "relative",
          paddingBottom: "75%", // 4:3
          background: "linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 100%)",
          overflow: "hidden"
        }}>
          {/* Category emoji as placeholder */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 64, opacity: 0.15, transition: "opacity 0.2s"
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.25")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.15")}
          >
            {categoryEmoji[material.category] || "📦"}
          </div>

          {/* Badges — top row */}
          <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* Left: GREENIE VERIFIED */}
            <span style={{
              background: "var(--color-primary-900)", color: "#fff",
              fontSize: 9, fontWeight: 800, padding: "3px 7px",
              borderRadius: "var(--radius-full)", letterSpacing: "0.06em", textTransform: "uppercase"
            }}>
              ✓ GREENIE
            </span>
            {/* Right: save icon */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(!wished); }}
              style={{
                background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "var(--radius-full)",
                width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <Heart style={{ width: 14, height: 14, color: wished ? "#ef4444" : "#9ca3af", fill: wished ? "#ef4444" : "none" }} />
            </button>
          </div>

          {/* Grade chip — bottom left (amber, Musemind style) */}
          <div style={{ position: "absolute", bottom: 10, left: 10 }}>
            <span className="chip-amber">{material.grade.split("/")[0].trim()}</span>
          </div>

          {/* Lab cert badge */}
          {material.labCertAvailable && (
            <div style={{ position: "absolute", bottom: 10, right: 10 }}>
              <span style={{
                background: "#EFF6FF", color: "#1D4ED8",
                border: "1px solid #BFDBFE",
                fontSize: 9, fontWeight: 700, padding: "3px 7px",
                borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: 3
              }}>
                <FlaskConical style={{ width: 8, height: 8 }} /> Lab Cert
              </span>
            </div>
          )}

          {/* Low stock banner */}
          {isLowStock && (
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              background: "#FEF2F2", border: "1px solid #FECACA",
              color: "#991B1B", fontSize: 10, fontWeight: 700,
              padding: "4px 10px", borderRadius: "var(--radius-full)"
            }}>
              Only {material.availableQty}t left!
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(17,24,39,0.45)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{
                background: "rgba(17,24,39,0.8)", color: "#fff",
                fontSize: 12, fontWeight: 700, padding: "6px 16px",
                borderRadius: "var(--radius-full)"
              }}>Out of Stock</span>
            </div>
          )}

          {/* Quick Add hover overlay */}
          {hovering && !isOutOfStock && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "var(--color-accent-amber)",
              padding: "10px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "opacity 0.2s"
            }}>
              <button
                onClick={handleAddToCart}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  fontSize: 12, fontWeight: 700, color: "var(--color-neutral-900)"
                }}
              >
                <Zap style={{ width: 14, height: 14 }} />
                {added ? "Added!" : `Quick Add · ${material.minOrder} ${material.unit}`}
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* ── Card body ── */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Zone + Category */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span className={zoneColorMap[material.zone] || "chip-neutral"}
            style={{ fontSize: 10, padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}>
            <MapPin style={{ width: 9, height: 9 }} /> {material.zone}
          </span>
        </div>

        {/* Material name */}
        <Link href={`/catalog/${material.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)",
            lineHeight: 1.35, marginBottom: 4,
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const
          }}>
            {material.name}
          </h3>
        </Link>

        {/* Grade label */}
        <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginBottom: 8 }}>{material.grade}</p>

        {/* Star rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          {[1,2,3,4,5].map((s) => (
            <Star key={s} style={{ width: 11, height: 11, fill: s <= Math.round(rating) ? "#F9A825" : "#E5E7EB", color: s <= Math.round(rating) ? "#F9A825" : "#E5E7EB" }} />
          ))}
          <span style={{ fontSize: 11, color: "var(--color-neutral-500)" }}>{rating} ({reviewCount})</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-neutral-500)" }}>
            {material.availableQty > 0 ? `${material.availableQty.toLocaleString()}t` : "—"} stk
          </span>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "var(--color-neutral-900)" }}>
            {formatCurrency(material.pricePerUnit)}
          </span>
          <span style={{ fontSize: 12, color: "var(--color-neutral-500)" }}>/{material.unit}</span>
          <span style={{ fontSize: 10, color: "var(--color-accent-amber)", fontWeight: 700, marginLeft: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <MapPin style={{ width: 9, height: 9 }} /> {material.zone} Station
          </span>
        </div>

        {/* CTA */}
        {isOutOfStock ? (
          <button style={{
            width: "100%", padding: "10px", border: "1.5px solid var(--color-neutral-200)",
            borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600,
            color: "var(--color-neutral-500)", background: "transparent", cursor: "pointer",
            transition: "all 0.15s"
          }}>
            Notify When Back
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%", padding: "10px",
              background: added ? "var(--color-success)" : "var(--color-primary-900)",
              border: "none", borderRadius: "var(--radius-md)",
              fontSize: 13, fontWeight: 600, color: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s"
            }}
          >
            <ShoppingCart style={{ width: 15, height: 15 }} />
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}
