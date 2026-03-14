"use client";

import Link from "next/link";
import { Package, Clock, IndianRupee, ShoppingCart, ArrowRight, TrendingUp, Truck, Star } from "lucide-react";
import { orders } from "@/lib/mock/orders";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  pending:          { label: "Pending",          color: "#6B7280", bg: "#F9FAFB" },
  confirmed:        { label: "Confirmed",        color: "#1D4ED8", bg: "#DBEAFE" },
  preparing:        { label: "Preparing",        color: "#B45309", bg: "#FEF3C7" },
  loaded:           { label: "Loaded",           color: "#C2410C", bg: "#FFEDD5" },
  in_transit:       { label: "In Transit",       color: "#7C3AED", bg: "#F3E8FF" },
  ready_for_pickup: { label: "Ready for Pickup", color: "#0F766E", bg: "#CCFBF1" },
  delivered:        { label: "Delivered",        color: "#15803D", bg: "#DCFCE7" },
  reviewed:         { label: "Reviewed",         color: "#15803D", bg: "#DCFCE7" },
};

export default function BuyerDashboard() {
  const activeOrders = orders.filter((o) => !["delivered", "reviewed"].includes(o.status));
  const totalSpent = orders.filter((o) => ["delivered", "reviewed"].includes(o.status)).reduce((s, o) => s + o.total, 0);

  const stats = [
    { icon: "🛒", label: "Active Orders",  value: String(activeOrders.length), sub: "in progress" },
    { icon: "📦", label: "Total Orders",   value: String(orders.length), sub: "all time" },
    { icon: "💰", label: "Total Spent",    value: formatCurrency(totalSpent), sub: "incl. GST" },
    { icon: "⭐", label: "Avg Rating",     value: "4.6 / 5", sub: "given by you" },
  ];

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* ── HERO BANNER ── */}
      <div style={{
        background: "var(--color-primary-900)",
        borderBottom: "3px solid var(--color-accent-amber)",
        padding: "40px 0 56px",
      }}>
        <div className="container-page">
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-accent-amber)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Buyer Portal
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Welcome back, Rajesh 👋</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Contractor · Coimbatore · GSTIN verified</p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container-page" style={{ paddingTop: 32, paddingBottom: 64 }}>

        {/* Stats row — overlapping the banner */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
          marginTop: -32, marginBottom: 32,
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "var(--color-white)",
              border: "1.5px solid var(--color-neutral-200)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              boxShadow: "var(--shadow-card)"
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
              <p style={{ fontSize: 22, fontWeight: 800, color: "var(--color-neutral-900)", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 4 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: "var(--color-neutral-200)", marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>

          {/* Active Orders */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-neutral-900)" }}>Active Orders</h2>
              <Link href="/portal/orders" style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 13, fontWeight: 600, color: "var(--color-primary-700)", textDecoration: "none"
              }}>
                All Orders <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>

            {activeOrders.length === 0 ? (
              <div className="card" style={{ padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                <p style={{ fontWeight: 600, color: "var(--color-neutral-900)", marginBottom: 6 }}>No active orders</p>
                <Link href="/catalog" style={{ fontSize: 13, color: "var(--color-primary-700)", fontWeight: 600, textDecoration: "none" }}>
                  Browse materials →
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {activeOrders.map((order) => {
                  const meta = statusMeta[order.status] || statusMeta.pending;
                  return (
                    <Link key={order.id} href={`/portal/orders/${order.id}`} style={{ textDecoration: "none" }}>
                      <div className="card" style={{ padding: "20px 24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)" }}>{order.id}</p>
                            <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 2 }}>{formatDate(order.createdAt)}</p>
                          </div>
                          <span style={{
                            fontSize: 11, fontWeight: 700, padding: "4px 12px",
                            borderRadius: "var(--radius-full)",
                            background: meta.bg, color: meta.color
                          }}>{meta.label}</span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                          {order.items.map((item) => (
                            <p key={item.materialId} style={{ fontSize: 12, color: "var(--color-neutral-500)" }}>
                              {item.materialName} · <strong style={{ color: "var(--color-neutral-700)" }}>{item.quantity} {item.unit}s</strong>
                            </p>
                          ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 18, fontWeight: 800, color: "var(--color-primary-700)" }}>
                            {formatCurrency(order.total)}
                          </span>
                          {order.status === "in_transit" && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: "#7C3AED" }}>
                              <Truck style={{ width: 14, height: 14 }} /> Live tracking available
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Quick Actions */}
            <div className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 12 }}>Quick Actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { href: "/catalog",         icon: "🛒", label: "Browse Materials" },
                  { href: "/portal/orders",   icon: "📋", label: "My Orders" },
                  { href: "/portal/tracker",  icon: "🚛", label: "Live Tracker" },
                  { href: "/portal/payments", icon: "💳", label: "Payment History" },
                ].map(({ href, icon, label }) => (
                  <Link key={href} href={href} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: "var(--radius-md)",
                    fontSize: 13, fontWeight: 500, color: "var(--color-neutral-700)",
                    textDecoration: "none", transition: "all 0.15s"
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--color-primary-50)"; el.style.color = "var(--color-primary-700)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--color-neutral-700)"; }}>
                    <span style={{ fontSize: 18 }}>{icon}</span> {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* One-click Reorder */}
            {orders.filter((o) => o.status === "delivered").slice(0, 1).map((o) => (
              <div key={o.id} style={{
                background: "var(--color-primary-50)",
                border: "1.5px solid var(--color-primary-500)",
                borderRadius: "var(--radius-lg)", padding: 20
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                  🔄 One-Click Reorder
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-neutral-900)", marginBottom: 4 }}>{o.items[0].materialName}</p>
                <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginBottom: 16 }}>{o.items[0].grade}</p>
                <Link href="/catalog" className="btn-secondary" style={{ display: "block", textAlign: "center", justifyContent: "center" }}>
                  Reorder Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
