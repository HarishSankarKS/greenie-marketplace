"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Cpu, Clock } from "lucide-react";
import { materials, categories, categoryIcons, getInventorySummary, Category } from "@/lib/mock/materials";
import MaterialCard from "@/components/MaterialCard";

const categoryEmoji: Record<Category, string> = {
  Concrete: "🪨", Steel: "⚙️", Wood: "🪵", Plastic: "♻️", Glass: "🪟"
};

const TOTAL = 1240;

export default function HomePage() {
  const inventory = getInventorySummary();
  const maxInventory = Math.max(...Object.values(inventory));
  const featuredMaterials = materials.filter((m) => m.availableQty > 0).slice(0, 4);

  const trustBadges = [
    { icon: "⚡", label: "WTN Generated" },
    { icon: "🤖", label: "Edge AI Sorted" },
    { icon: "✅", label: "GREENIE Verified" },
    { icon: "🧪", label: "Lab Certified (opt.)" },
  ];

  return (
    <div style={{ background: "var(--color-neutral-100)" }}>

      {/* ── HERO — 60/40 Split ── */}
      <section className="hero-bg" style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* LEFT — 60% */}
            <div>
              <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 16 }}>
                Our Marketplace
              </p>
              <h1 className="text-display" style={{ color: "#ffffff", marginBottom: 20, lineHeight: 1.05 }}>
                Sorted.<br />Certified.<br />Delivered.
              </h1>
              <p className="text-body" style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, maxWidth: 420 }}>
                GREENIE's Edge AI-sorted C&D materials — concrete, steel, wood, plastic, glass — available for instant purchase directly from Coimbatore's Transfer Stations.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                <Link href="/catalog" className="btn-primary">
                  Browse Materials <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <Link href="#how-it-works" className="btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                  How It Works
                </Link>
              </div>

              {/* Trust row */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {trustBadges.map((b) => (
                  <div key={b.label} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "var(--radius-full)",
                    padding: "5px 12px",
                    fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)"
                  }}>
                    <span>{b.icon}</span> {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Live Stock Visual */}
            <div style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "var(--radius-xl)",
              padding: 28,
              backdropFilter: "blur(8px)"
            }}>
              {/* Counter */}
              <div style={{ marginBottom: 20, textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
                  <span className="text-display" style={{ color: "var(--color-accent-amber)", lineHeight: 1 }}>
                    {TOTAL.toLocaleString()}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, fontWeight: 600 }}>Tonnes</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>
                  Available Across All Stations Today
                </p>
              </div>

              {/* Category stock bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {categories.map((cat) => {
                  const qty = Math.round(inventory[cat] || 0);
                  const pct = maxInventory > 0 ? (qty / maxInventory) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 18 }}>{categoryEmoji[cat]}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{cat}</span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-accent-amber)" }}>{qty}t</span>
                      </div>
                      <div className="stock-bar">
                        <div className="stock-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Live · Updates every 30 seconds from Transfer Stations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY SHELF ── */}
      <section style={{ background: "var(--color-white)", padding: "48px 0", borderBottom: "1px solid var(--color-neutral-200)" }}>
        <div className="container-page">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 className="text-h2" style={{ color: "var(--color-neutral-900)" }}>Material Categories</h2>
            <Link href="/catalog" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary-700)", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {categories.map((cat) => {
              const qty = Math.round(inventory[cat] || 0);
              return (
                <Link key={cat} href={`/catalog?category=${cat}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "var(--color-neutral-100)",
                    border: "1.5px solid var(--color-neutral-200)",
                    borderRadius: "var(--radius-lg)",
                    padding: "20px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-primary-500)";
                      el.style.background = "var(--color-primary-50)";
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "var(--shadow-hover)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-neutral-200)";
                      el.style.background = "var(--color-neutral-100)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 8 }}>{categoryEmoji[cat]}</div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "var(--color-neutral-900)", marginBottom: 4 }}>{cat}</p>
                    <span className="chip-amber" style={{ margin: "4px auto 8px", display: "inline-flex" }}>
                      {qty}t available
                    </span>
                    <p style={{ fontSize: 11, color: "var(--color-primary-700)", fontWeight: 600 }}>Browse →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED MATERIALS ── */}
      <section className="section-gap">
        <div className="container-page">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 6 }}>In Stock Right Now</p>
              <h2 className="text-h1" style={{ color: "var(--color-neutral-900)" }}>Available Now</h2>
            </div>
            <Link href="/catalog" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: "var(--color-primary-700)", textDecoration: "none"
            }}>
              View all materials <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {featuredMaterials.map((m) => (
              <MaterialCard key={m.id} material={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: "var(--color-white)", padding: "64px 0", borderTop: "1px solid var(--color-neutral-200)" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 8 }}>Simple Process</p>
            <h2 className="text-h1" style={{ color: "var(--color-neutral-900)" }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { step: "01", icon: "🔍", title: "Browse & Filter", desc: "Search by material type, grade, or nearest Transfer Station zone. Filters update live." },
              { step: "02", icon: "🛒", title: "Add to Cart", desc: "Choose quantity (minimum order applies), select delivery or self-pickup, book a time slot." },
              { step: "03", icon: "💳", title: "Pay Securely", desc: "UPI, NEFT, or Purchase Order. GST invoice auto-generated. Payment clears in minutes." },
              { step: "04", icon: "🚛", title: "Track & Receive", desc: "Live GPS tracking via GREENIE Fleet Intelligence. Proof of delivery photo on arrival." },
            ].map((s) => (
              <div key={s.step} className="card" style={{ padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <span style={{
                  position: "absolute", top: 12, right: 16,
                  fontSize: 48, fontWeight: 900, color: "var(--color-neutral-200)",
                  lineHeight: 1, userSelect: "none"
                }}>{s.step}</span>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 className="text-h3" style={{ color: "var(--color-neutral-900)", marginBottom: 8 }}>{s.title}</h3>
                <p className="text-sm-body" style={{ color: "var(--color-neutral-500)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ background: "var(--color-primary-900)", padding: "48px 0" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { icon: <Cpu style={{ width: 28, height: 28 }} />, title: "AI Grade Verified", desc: "Every batch graded by GREENIE's Edge AI at the Transfer Station conveyor — what you see matches what you receive." },
              { icon: <FlaskConical style={{ width: 28, height: 28 }} />, title: "Lab Certified Options", desc: "Select materials include CPWD-format lab certificates downloadable directly from the product page." },
              { icon: <Clock style={{ width: 28, height: 28 }} />, title: "Live Stock Sync", desc: "Inventory updates in <30 seconds from Transfer Station to your screen. No stale listings." },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 52, height: 52, flexShrink: 0,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-accent-amber)"
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONE CTA ── */}
      <section style={{ padding: "64px 0", background: "var(--color-neutral-100)" }}>
        <div className="container-page">
          <div style={{
            background: "var(--color-white)",
            border: "1.5px solid var(--color-neutral-200)",
            borderRadius: "var(--radius-xl)",
            padding: "48px",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40,
            boxShadow: "var(--shadow-card)"
          }}>
            <div>
              <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 8 }}>4 Locations</p>
              <h2 className="text-h1" style={{ color: "var(--color-neutral-900)", marginBottom: 10 }}>Pick Your Nearest Station</h2>
              <p className="text-body" style={{ color: "var(--color-neutral-500)", maxWidth: 400 }}>
                Browse by zone to minimize logistics distance. Materials sourced from your zone incur lower delivery costs.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
              {[
                { zone: "North", cls: "zone-north" }, { zone: "South", cls: "zone-south" },
                { zone: "East", cls: "zone-east" },  { zone: "West",  cls: "zone-west" },
              ].map(({ zone, cls }) => (
                <Link key={zone} href={`/catalog?zone=${zone}`}
                  className={cls}
                  style={{
                    padding: "12px 24px", borderRadius: "var(--radius-md)",
                    fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" as const,
                    transition: "transform 0.15s, box-shadow 0.15s"
                  }}>
                  {zone} Zone
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
