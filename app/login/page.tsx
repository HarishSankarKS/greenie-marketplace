"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Recycle } from "lucide-react";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px",
  fontSize: 14, border: "1.5px solid var(--color-neutral-200)",
  borderRadius: "var(--radius-md)", outline: "none",
  color: "var(--color-neutral-900)", background: "var(--color-white)",
  transition: "border-color 0.15s",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/portal/dashboard");
  };

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh", display: "flex" }}>

      {/* LEFT — decorative panel */}
      <div style={{
        width: "40%", flexShrink: 0,
        background: "var(--color-primary-900)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px 52px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 56 }}>
          <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>♻️</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>GREENIE <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.6)" }}>Market</span></span>
        </div>

        <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 16 }}>Buyer Portal</p>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
          Coimbatore's C&D Waste Marketplace
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 40 }}>
          Sign in to browse AI-verified recycled materials, track your orders live, and download GST invoices instantly.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { emoji: "🤖", text: "Edge AI graded at every Transfer Station" },
            { emoji: "🚛", text: "Live GPS delivery tracking" },
            { emoji: "🧾", text: "Instant GST-compliant PDF invoices" },
            { emoji: "✅", text: "GREENIE Verified stock only" },
          ].map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{b.emoji}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "64px 56px"
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: "var(--color-neutral-500)", marginBottom: 32 }}>Sign in to your buyer account</p>

          <form onSubmit={handleLogin}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-neutral-500)", display: "block", marginBottom: 8 }}>
                  Email or Phone
                </label>
                <input
                  type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                  required placeholder="you@company.com" style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--color-primary-700)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--color-neutral-200)"}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-neutral-500)" }}>
                    Password
                  </label>
                  <Link href="#" style={{ fontSize: 12, color: "var(--color-primary-700)", fontWeight: 600, textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required placeholder="••••••••" style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--color-primary-700)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--color-neutral-200)"}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", height: 50, fontSize: 15 }}>
              Sign In <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </form>

          <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--color-neutral-100)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-neutral-200)", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "var(--color-neutral-500)" }}>
              🔓 Demo: any email/password works. Click Sign In to enter the portal.
            </p>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--color-neutral-500)", marginTop: 24 }}>
            New buyer?{" "}
            <Link href="/register" style={{ color: "var(--color-primary-700)", fontWeight: 700, textDecoration: "none" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
