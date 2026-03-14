"use client";

import { X, ShoppingCart, MapPin, Trash2, AlertTriangle, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, subtotal } = useCart();

  const zones = [...new Set(items.map((i) => i.material.zone))];
  const hasZoneConflict = zones.length > 1;

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100%", width: "100%", maxWidth: 420,
        background: "var(--color-white)", zIndex: 50,
        display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)"
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 20px",
          background: "var(--color-primary-900)",
          borderBottom: "3px solid var(--color-accent-amber)",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart style={{ width: 20, height: 20, color: "var(--color-accent-amber)" }} />
            <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>Your Cart</h2>
            {items.length > 0 && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "2px 10px",
                background: "var(--color-accent-amber)", borderRadius: "var(--radius-full)",
                color: "var(--color-neutral-900)"
              }}>{items.length}</span>
            )}
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.1)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <X style={{ width: 16, height: 16, color: "#fff" }} />
          </button>
        </div>

        {/* Zone Conflict */}
        {hasZoneConflict && (
          <div style={{
            margin: "12px 16px 0",
            padding: "10px 14px",
            background: "#FFFBEB", border: "1.5px solid #FDE68A",
            borderRadius: "var(--radius-md)",
            display: "flex", gap: 10, alignItems: "flex-start", flexShrink: 0
          }}>
            <AlertTriangle style={{ width: 15, height: 15, color: "#B45309", marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>Multi-Zone Order</p>
              <p style={{ fontSize: 11, color: "#B45309", marginTop: 2, lineHeight: 1.5 }}>
                Items from {zones.join(", ")} zones — logistics complexity may increase delivery cost.
              </p>
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
              <div style={{
                width: 80, height: 80,
                background: "var(--color-neutral-100)", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36
              }}>🛒</div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-neutral-700)" }}>Your cart is empty</p>
              <p style={{ fontSize: 13, color: "var(--color-neutral-500)", textAlign: "center" }}>
                Browse verified C&D materials and add them here.
              </p>
              <Link href="/catalog" onClick={onClose} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 22px", background: "var(--color-primary-700)",
                color: "#fff", fontSize: 13, fontWeight: 700,
                borderRadius: "var(--radius-md)", textDecoration: "none"
              }}>
                Browse Materials <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => (
                <div key={item.material.id} style={{
                  background: "var(--color-neutral-100)",
                  border: "1.5px solid var(--color-neutral-200)",
                  borderRadius: "var(--radius-md)", padding: "14px 16px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.material.name}
                      </p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: "2px 8px",
                          background: "var(--color-white)", border: "1px solid var(--color-neutral-200)",
                          borderRadius: "var(--radius-full)", color: "var(--color-neutral-500)"
                        }}>{item.material.grade}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: "2px 8px",
                          background: "var(--color-primary-50)", border: "1px solid var(--color-primary-500)",
                          borderRadius: "var(--radius-full)", color: "var(--color-primary-700)"
                        }}>
                          📍 {item.material.zone}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.material.id)} style={{
                      width: 28, height: 28, border: "none", background: "none", cursor: "pointer",
                      color: "var(--color-neutral-400)", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "var(--radius-sm)", transition: "all 0.15s", flexShrink: 0
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FEE2E2"; (e.currentTarget as HTMLElement).style.color = "#DC2626"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "var(--color-neutral-400)"; }}>
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => updateQty(item.material.id, Math.max(item.material.minOrder, item.quantity - item.material.minOrder))}
                        style={{
                          width: 28, height: 28, border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-sm)",
                          background: "var(--color-white)", cursor: "pointer", fontSize: 16, fontWeight: 700,
                          color: "var(--color-neutral-700)", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>−</button>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-neutral-900)", minWidth: 60, textAlign: "center" }}>
                        {item.quantity} {item.material.unit}
                      </span>
                      <button onClick={() => updateQty(item.material.id, item.quantity + item.material.minOrder)}
                        style={{
                          width: 28, height: 28, border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-sm)",
                          background: "var(--color-white)", cursor: "pointer", fontSize: 16, fontWeight: 700,
                          color: "var(--color-neutral-700)", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>+</button>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-primary-700)" }}>
                      {formatCurrency(item.material.pricePerUnit * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & CTA */}
        {items.length > 0 && (
          <div style={{
            borderTop: "1.5px solid var(--color-neutral-200)",
            padding: "20px 20px 24px",
            flexShrink: 0
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[
                { label: "Subtotal", value: formatCurrency(subtotal) },
                { label: "GST (18%)", value: formatCurrency(gst) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-neutral-500)" }}>
                  <span>{label}</span><span>{value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, paddingTop: 10, borderTop: "1.5px solid var(--color-neutral-200)", marginTop: 4 }}>
                <span style={{ color: "var(--color-neutral-900)" }}>Total</span>
                <span style={{ color: "var(--color-primary-700)" }}>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={onClose} className="btn-primary" style={{ display: "flex", justifyContent: "center", width: "100%", height: 48, fontSize: 15 }}>
              Proceed to Checkout <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <button onClick={onClose} style={{
              width: "100%", marginTop: 10, padding: "8px", background: "none", border: "none",
              fontSize: 13, color: "var(--color-neutral-500)", cursor: "pointer"
            }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
