"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Building2, Truck, HardHat, ArrowRight, ArrowLeft, Check } from "lucide-react";

type BuyerType = "Municipal Body" | "Recycling Plant" | "Contractor" | "Individual";

const buyerTypes: { type: BuyerType; emoji: string; desc: string; accent: string; textColor: string; bg: string }[] = [
  { type: "Municipal Body",  emoji: "🏛️", desc: "Bulk concrete, WTN docs, scheduled delivery",     accent: "#1D4ED8", textColor: "#1D4ED8", bg: "#DBEAFE" },
  { type: "Recycling Plant", emoji: "♻️", desc: "Steel, plastic, glass — grade guarantees at scale", accent: "#15803D", textColor: "#15803D", bg: "#DCFCE7" },
  { type: "Contractor",      emoji: "🚛", desc: "Aggregate, WBM — price-sensitive, zone-first",      accent: "#B45309", textColor: "#B45309", bg: "#FEF3C7" },
  { type: "Individual",      emoji: "🧰", desc: "Wood, brick, steel for repair or renovation",       accent: "#7C3AED", textColor: "#7C3AED", bg: "#F3E8FF" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px",
  fontSize: 14, border: "1.5px solid var(--color-neutral-200)",
  borderRadius: "var(--radius-md)", outline: "none",
  color: "var(--color-neutral-900)", background: "var(--color-neutral-100)",
  transition: "border-color 0.15s",
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", gst: "",
    address: "", buyerType: "" as BuyerType | "",
    otp: "", kycType: "gst",
  });
  const [otpSent, setOtpSent] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleSendOtp = () => setOtpSent(true);
  const handleNext = () => setStep((s) => s + 1);
  const handleRegister = () => router.push("/portal/dashboard");

  const STEPS = ["Details", "Buyer Type", "OTP", "KYC"];

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh", display: "flex" }}>

      {/* LEFT — decorative green panel */}
      <div style={{
        width: "42%", flexShrink: 0,
        background: "var(--color-primary-900)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px 56px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>♻️</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>GREENIE <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.6)" }}>Market</span></span>
        </div>

        <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 20 }}>Join the platform</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
          Buy Verified C&D Materials with Confidence
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 40 }}>
          Access AI-sorted concrete, steel, wood, plastic and glass — sourced directly from Coimbatore's Transfer Station network with WTN and grade certificates.
        </p>

        {/* Trust badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "🤖", text: "Edge AI Sorted — grade guaranteed" },
            { icon: "✅", text: "GREENIE Verified inventory" },
            { icon: "🧾", text: "GST invoice on every order" },
            { icon: "🚛", text: "Live GPS delivery tracking" },
          ].map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px 56px", overflowY: "auto"
      }}>
        <div style={{ maxWidth: 440, width: "100%" }}>

          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
            {STEPS.map((s, idx) => {
              const done = step > idx + 1;
              const active = step === idx + 1;
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: idx < STEPS.length - 1 ? 1 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "var(--radius-full)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800,
                      background: done ? "var(--color-success)" : active ? "var(--color-primary-900)" : "var(--color-neutral-200)",
                      color: done || active ? "#fff" : "var(--color-neutral-500)",
                      transition: "all 0.2s"
                    }}>
                      {done ? "✓" : idx + 1}
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 600, marginTop: 4, color: active ? "var(--color-primary-700)" : done ? "var(--color-success)" : "var(--color-neutral-500)" }}>{s}</p>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div style={{
                      flex: 1, height: 2, margin: "0 8px", marginBottom: 16,
                      background: done ? "var(--color-success)" : "var(--color-neutral-200)",
                      transition: "background 0.3s"
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div style={{
            background: "var(--color-white)",
            border: "1.5px solid var(--color-neutral-200)",
            borderRadius: "var(--radius-xl)",
            padding: 36,
            boxShadow: "var(--shadow-card)"
          }}>

            {/* STEP 1 — Details */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 4 }}>Create Your Account</h2>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 28 }}>Register to start purchasing recycled materials</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name *" style={inputStyle} />
                  <input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company Name (optional)" style={inputStyle} />
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number *" style={inputStyle} />
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email Address *" style={inputStyle} />
                  <input value={form.gst} onChange={(e) => update("gst", e.target.value)} placeholder="GST Number (for B2B buyers)" style={inputStyle} />
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Delivery Address *" style={inputStyle} />
                </div>
                <button onClick={handleNext} disabled={!form.name || !form.phone}
                  className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 24, height: 48, opacity: (!form.name || !form.phone) ? 0.5 : 1 }}>
                  Continue <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
                <p style={{ textAlign: "center", fontSize: 13, color: "var(--color-neutral-500)", marginTop: 16 }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{ color: "var(--color-primary-700)", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
                </p>
              </div>
            )}

            {/* STEP 2 — Buyer Type */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 4 }}>What type of buyer?</h2>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 24 }}>This helps us show you the right purchasing options</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {buyerTypes.map(({ type, emoji, desc, accent, textColor, bg }) => {
                    const selected = form.buyerType === type;
                    return (
                      <button key={type} onClick={() => update("buyerType", type)} style={{
                        padding: 16, textAlign: "left", cursor: "pointer", borderRadius: "var(--radius-md)",
                        border: `2px solid ${selected ? accent : "var(--color-neutral-200)"}`,
                        background: selected ? bg : "var(--color-neutral-100)",
                        transition: "all 0.15s"
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{emoji}</div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: selected ? textColor : "var(--color-neutral-900)", marginBottom: 4 }}>{type}</p>
                        <p style={{ fontSize: 11, color: "var(--color-neutral-500)", lineHeight: 1.5 }}>{desc}</p>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)} className="btn-ghost" style={{ height: 44, padding: "0 18px", fontSize: 13 }}>
                    <ArrowLeft style={{ width: 14, height: 14 }} /> Back
                  </button>
                  <button onClick={handleNext} disabled={!form.buyerType} className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", height: 44, opacity: !form.buyerType ? 0.5 : 1 }}>
                    Continue <ArrowRight style={{ width: 15, height: 15 }} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — OTP */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 4 }}>Verify your phone</h2>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 28 }}>
                  We'll send a 6-digit OTP to <strong>{form.phone || "+91 XXXXXXXXXX"}</strong>
                </p>
                {!otpSent ? (
                  <button onClick={handleSendOtp} className="btn-primary" style={{ width: "100%", justifyContent: "center", height: 48 }}>
                    Send OTP
                  </button>
                ) : (
                  <div>
                    <div style={{ padding: "12px 16px", background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: "var(--radius-md)", fontSize: 13, color: "#15803D", fontWeight: 600, marginBottom: 16 }}>
                      ✓ OTP sent to {form.phone}
                    </div>
                    <input type="text" maxLength={6} value={form.otp}
                      onChange={(e) => update("otp", e.target.value.replace(/\D/g, ""))}
                      placeholder="_ _ _ _ _ _"
                      style={{ ...inputStyle, textAlign: "center", fontSize: 28, fontWeight: 800, letterSpacing: "0.25em", marginBottom: 20 }}
                    />
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => setStep(2)} className="btn-ghost" style={{ height: 44, padding: "0 18px", fontSize: 13 }}>
                        <ArrowLeft style={{ width: 14, height: 14 }} /> Back
                      </button>
                      <button onClick={handleNext} disabled={form.otp.length !== 6} className="btn-primary"
                        style={{ flex: 1, justifyContent: "center", height: 44, opacity: form.otp.length !== 6 ? 0.5 : 1 }}>
                        Verify &amp; Continue <ArrowRight style={{ width: 15, height: 15 }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 — KYC */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 4 }}>Complete KYC</h2>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 24 }}>
                  {form.buyerType === "Individual" ? "Quick Aadhaar OTP — no doc upload needed." : "Upload your GST certificate for B2B purchasing."}
                </p>
                {form.buyerType === "Individual" ? (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ padding: "12px 16px", background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: "var(--radius-md)", fontSize: 13, color: "#1D4ED8", marginBottom: 16 }}>
                      Instant approval via Aadhaar OTP — no document upload needed
                    </div>
                    <input placeholder="Aadhaar last 4 digits" style={inputStyle} />
                  </div>
                ) : (
                  <div style={{
                    border: "2px dashed var(--color-neutral-200)", borderRadius: "var(--radius-lg)",
                    padding: 32, textAlign: "center", marginBottom: 24, cursor: "pointer",
                    transition: "border-color 0.15s",
                    background: "var(--color-neutral-100)"
                  }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>📄</div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-neutral-700)" }}>Upload GST Certificate</p>
                    <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 4 }}>PDF, JPG or PNG · Max 5MB</p>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(3)} className="btn-ghost" style={{ height: 44, padding: "0 18px", fontSize: 13 }}>
                    <ArrowLeft style={{ width: 14, height: 14 }} /> Back
                  </button>
                  <button onClick={handleRegister} className="btn-primary" style={{ flex: 1, justifyContent: "center", height: 44 }}>
                    Complete Registration ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
