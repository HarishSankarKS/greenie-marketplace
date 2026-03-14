"use client";

import Link from "next/link";
import { MapPin, Cpu, FlaskConical, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background: "var(--color-primary-900)", padding: "80px 0 64px" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <div style={{
            width: 72, height: 72, margin: "0 auto 24px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "var(--radius-xl)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36
          }}>♻️</div>
          <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>About GREENIE</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Coimbatore's first AI-powered Construction &amp; Demolition waste processing and resale platform —
            turning urban debris into verified, economic value.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ padding: "80px 0", background: "var(--color-white)" }}>
        <div className="container-page" style={{ maxWidth: 1100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 16 }}>Why We Exist</p>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 20, lineHeight: 1.25 }}>
                The Problem We Solve
              </h2>
              <p style={{ fontSize: 16, color: "var(--color-neutral-500)", lineHeight: 1.75, marginBottom: 16 }}>
                Coimbatore generates <strong style={{ color: "var(--color-neutral-900)" }}>100–150 tonnes of C&amp;D waste daily</strong>.
                Most of it is illegally dumped or poorly processed — while buyers searching for affordable
                aggregate, steel, and wood pay premium prices in the informal market with no quality guarantees.
              </p>
              <p style={{ fontSize: 16, color: "var(--color-neutral-500)", lineHeight: 1.75 }}>
                GREENIE's Edge AI at Transfer Stations sorts every batch, assigns a grade, and lists it on this
                marketplace within hours — so you get exactly what you pay for, with a digital paper trail.
              </p>
            </div>

            {/* Price reference card */}
            <div style={{
              background: "var(--color-neutral-100)",
              border: "1.5px solid var(--color-neutral-200)",
              borderRadius: "var(--radius-xl)",
              padding: 32
            }}>
              <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 20 }}>Market Price Reference</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "🪨", label: "Concrete Rubble", value: "₹150–400/T" },
                  { icon: "⚙️", label: "Steel Rebar", value: "₹18,000–28,000/T" },
                  { icon: "🪵", label: "Structural Timber", value: "₹50–500/piece" },
                  { icon: "♻️", label: "HDPE Plastic", value: "₹8–25/kg" },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--color-neutral-200)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-neutral-700)" }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "var(--color-primary-700)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSFER STATIONS ── */}
      <section style={{ padding: "80px 0", background: "var(--color-neutral-100)" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 12 }}>4 Locations</p>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-neutral-900)" }}>Our Transfer Stations</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { zone: "North", desc: "Serves industrial north belt, high concrete throughput" },
              { zone: "South", desc: "Residential demolition focus, timber & glass dominant" },
              { zone: "East", desc: "Commercial C&D, steel rebar specialist station" },
              { zone: "West", desc: "Mixed waste, plastics processing & HDPE sorting" },
            ].map(({ zone, desc }) => (
              <div key={zone} className="card" style={{ padding: "28px 24px", textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "var(--radius-lg)",
                  background: "var(--color-primary-50)",
                  border: "1.5px solid var(--color-primary-500)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: 24
                }}>
                  <MapPin style={{ width: 24, height: 24, color: "var(--color-primary-700)" }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 6 }}>{zone} Station</h3>
                <p style={{ fontSize: 12, color: "var(--color-neutral-500)", lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                <Link href={`/catalog?zone=${zone}`} style={{
                  fontSize: 12, fontWeight: 700, color: "var(--color-primary-700)",
                  textDecoration: "none", display: "block"
                }}>Browse stock →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST FEATURES ── */}
      <section style={{ padding: "64px 0", background: "var(--color-primary-900)" }}>
        <div className="container-page">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { icon: <Cpu style={{ width: 28, height: 28 }} />, title: "Edge AI Sorted", desc: "Every batch is graded by GREENIE's AI vision system at the Transfer Station conveyor before listing." },
              { icon: <FlaskConical style={{ width: 28, height: 28 }} />, title: "Lab Certified Options", desc: "Select materials include CPWD-format lab certificates downloadable from the product page." },
              { icon: <Clock style={{ width: 28, height: 28 }} />, title: "Live Stock Sync", desc: "Inventory updates in <30 seconds from Transfer Station to your screen. No stale listings." },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, flexShrink: 0,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-accent-amber)"
                }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "80px 0", background: "var(--color-white)" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <p className="text-overline" style={{ color: "var(--color-primary-700)", marginBottom: 12 }}>Impact</p>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 48 }}>By the Numbers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { value: "4", label: "Transfer Stations", emoji: "📍" },
              { value: "5", label: "Material Categories", emoji: "📦" },
              { value: "<30s", label: "Stock Sync Lag", emoji: "⚡" },
              { value: "55%", label: "Gross Margin / Tonne", emoji: "📈" },
            ].map(({ value, label, emoji }) => (
              <div key={label} style={{
                background: "var(--color-primary-50)",
                border: "1.5px solid var(--color-primary-500)",
                borderRadius: "var(--radius-xl)", padding: "32px 24px"
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
                <p style={{ fontSize: 40, fontWeight: 900, color: "var(--color-primary-700)", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginTop: 8, fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
