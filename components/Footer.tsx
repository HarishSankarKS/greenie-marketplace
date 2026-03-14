"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-primary-900)",
      borderTop: "3px solid var(--color-accent-amber)",
      paddingTop: 48, paddingBottom: 32
    }}>
      <div className="container-page">
        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
              }}>♻️</div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>GREENIE Market</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Coimbatore</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>
              Coimbatore's first AI-powered C&D waste processing and resale marketplace. Turning urban debris into economic value since 2024.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["🤖 Edge AI Sorted", "✅ GREENIE Verified", "🧾 GST Invoiced"].map((b) => (
                <span key={b} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,0.15)" }}>{b}</span>
              ))}
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Live Inventory — Updated in real time</span>
            </div>
          </div>

          {/* Materials */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent-amber)", marginBottom: 16 }}>Materials</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "🪨 Concrete Aggregate", href: "/catalog?category=Concrete" },
                { label: "⚙️ Steel & Rebar", href: "/catalog?category=Steel" },
                { label: "🪵 Timber & Wood", href: "/catalog?category=Wood" },
                { label: "♻️ Plastic (HDPE/PVC)", href: "/catalog?category=Plastic" },
                { label: "🪟 Glass Panels", href: "/catalog?category=Glass" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent-amber)", marginBottom: 16 }}>Company</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "About GREENIE", href: "/about" },
                { label: "Sustainability Blog", href: "/blog" },
                { label: "Buyer Portal", href: "/portal/dashboard" },
                { label: "Register as Buyer", href: "/register" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stations */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent-amber)", marginBottom: 16 }}>Transfer Stations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["North", "South", "East", "West"].map((z) => (
                <Link key={z} href={`/catalog?zone=${z}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                  📍 {z} Transfer Station
                </Link>
              ))}
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>📞 +91 98765 43210</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>✉️ market@greenie.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            © 2026 GREENIE Market · Fleet Intelligence & Technology, Coimbatore · Team Swach, Sri Krishna College of Engineering
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use", "GST: 33AABCG1234N1ZP"].map((l) => (
              <span key={l} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
