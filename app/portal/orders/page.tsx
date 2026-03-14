"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { orders } from "@/lib/mock/orders";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusMeta: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:          { label: "Pending",          color: "#6B7280", bg: "#F9FAFB",  border: "#E5E7EB" },
  confirmed:        { label: "Confirmed",        color: "#1D4ED8", bg: "#DBEAFE",  border: "#BFDBFE" },
  preparing:        { label: "Preparing",        color: "#B45309", bg: "#FEF3C7",  border: "#FDE68A" },
  loaded:           { label: "Loaded",           color: "#C2410C", bg: "#FFEDD5",  border: "#FED7AA" },
  in_transit:       { label: "In Transit",       color: "#7C3AED", bg: "#F3E8FF",  border: "#DDD6FE" },
  ready_for_pickup: { label: "Ready for Pickup", color: "#0F766E", bg: "#CCFBF1",  border: "#99F6E4" },
  delivered:        { label: "Delivered",        color: "#15803D", bg: "#DCFCE7",  border: "#BBF7D0" },
  reviewed:         { label: "Reviewed",         color: "#15803D", bg: "#DCFCE7",  border: "#BBF7D0" },
};

const categoryEmoji: Record<string, string> = {
  "Crushed Concrete": "🪨", "Structural Steel": "⚙️", "Steel": "⚙️",
  "HDPE": "♻️", "PVC": "♻️", "Timber": "🪵", "Glass": "🪟",
};

function getEmoji(name: string) {
  for (const [key, val] of Object.entries(categoryEmoji)) {
    if (name.includes(key)) return val;
  }
  return "📦";
}

export default function OrdersPage() {
  const activeOrders = orders.filter((o) => !["delivered", "reviewed"].includes(o.status));
  const completedOrders = orders.filter((o) => ["delivered", "reviewed"].includes(o.status));

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "var(--color-primary-900)",
        borderBottom: "3px solid var(--color-accent-amber)",
        padding: "32px 0 48px"
      }}>
        <div className="container-page">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/portal/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>My Orders</span>
          </nav>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 20 }}>My Orders</h1>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Active", value: activeOrders.length, emoji: "🟡" },
              { label: "Delivered", value: completedOrders.length, emoji: "✅" },
              { label: "Total Orders", value: orders.length, emoji: "📦" },
            ].map(({ label, value, emoji }) => (
              <div key={label} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginRight: 8 }}>{emoji} {label}:</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page" style={{ marginTop: -24, paddingBottom: 64 }}>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 14 }}>Active Orders</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeOrders.map((order) => {
                const meta = statusMeta[order.status] || statusMeta.pending;
                return (
                  <Link key={order.id} href={`/portal/orders/${order.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "var(--color-white)",
                      border: `1.5px solid ${meta.border}`,
                      borderRadius: "var(--radius-lg)",
                      padding: "20px 24px",
                      boxShadow: "var(--shadow-card)",
                      transition: "transform 0.15s, box-shadow 0.15s",
                      cursor: "pointer"
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          <div style={{
                            width: 44, height: 44, flexShrink: 0,
                            background: meta.bg, borderRadius: "var(--radius-md)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                          }}>{getEmoji(order.items[0]?.materialName || "")}</div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--color-neutral-900)" }}>{order.id}</p>
                            <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginTop: 2 }}>{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: "var(--radius-full)", background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14, paddingLeft: 58 }}>
                        {order.items.map((item) => (
                          <div key={item.materialId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "var(--color-neutral-700)", fontWeight: 500 }}>{item.materialName}</span>
                            <span style={{ fontSize: 12, color: "var(--color-neutral-500)" }}>
                              {item.quantity} {item.unit}s × {formatCurrency(item.unitPrice)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 58 }}>
                        <span style={{ fontSize: 12, color: "var(--color-neutral-500)" }}>
                          {order.deliveryMode === "delivery" ? "🚛 Delivery" : "🏭 Self Pickup"}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--color-primary-700)" }}>{formatCurrency(order.total)}</span>
                          <ArrowRight style={{ width: 16, height: 16, color: "var(--color-neutral-400)" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Orders */}
        {completedOrders.length > 0 && (
          <div>
            <p className="text-overline" style={{ color: "var(--color-neutral-500)", marginBottom: 14 }}>Completed Orders</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {completedOrders.map((order) => {
                const meta = statusMeta[order.status] || statusMeta.delivered;
                return (
                  <Link key={order.id} href={`/portal/orders/${order.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "var(--color-white)",
                      border: "1.5px solid var(--color-neutral-200)",
                      borderRadius: "var(--radius-lg)", padding: "18px 24px",
                      boxShadow: "var(--shadow-card)", opacity: 0.9,
                      transition: "opacity 0.15s", cursor: "pointer"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          <div style={{
                            width: 40, height: 40, flexShrink: 0,
                            background: "#DCFCE7", borderRadius: "var(--radius-md)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                          }}>✅</div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)" }}>{order.id}</p>
                            <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginTop: 2 }}>
                              {formatDate(order.createdAt)} · {order.items.map(i => i.materialName).join(", ")}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 16, fontWeight: 800, color: "var(--color-primary-700)" }}>{formatCurrency(order.total)}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: "var(--radius-full)", background: meta.bg, color: meta.color }}>{meta.label}</span>
                          <ArrowRight style={{ width: 14, height: 14, color: "var(--color-neutral-400)" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: 64, textAlign: "center", boxShadow: "var(--shadow-card)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 8 }}>No orders yet</p>
            <Link href="/catalog" className="btn-primary" style={{ display: "inline-flex" }}>Browse materials</Link>
          </div>
        )}
      </div>
    </div>
  );
}
