"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Send, Check } from "lucide-react";

const ratingCategories = [
  { key: "materialQuality",    label: "Material Quality",    emoji: "🪨", desc: "Was the material as described and graded?" },
  { key: "gradeAccuracy",      label: "Grade Accuracy",      emoji: "✅", desc: "Did the grade match what GREENIE listed?" },
  { key: "deliveryPunctuality",label: "Delivery Punctuality",emoji: "🚛", desc: "Was delivery on time and handled well?" },
];

export default function ReviewClient({ id }: { id: string }) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState<Record<string, number>>({});

  const setRating = (key: string, val: number) => setRatings((r) => ({ ...r, [key]: val }));
  const allRated = ratingCategories.every((c) => ratings[c.key]);

  if (submitted) {
    return (
      <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "var(--color-primary-900)", borderBottom: "3px solid var(--color-accent-amber)", padding: "28px 0" }}>
          <div className="container-page"><h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Review Submitted</h1></div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div style={{ textAlign: "center", maxWidth: 360 }}>
            <div style={{ width: 80, height: 80, margin: "0 auto 24px", background: "var(--color-primary-50)", border: "2px solid var(--color-primary-500)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>⭐</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-neutral-900)", marginBottom: 8 }}>Thank you!</h2>
            <p style={{ fontSize: 14, color: "var(--color-neutral-500)", lineHeight: 1.7, marginBottom: 28 }}>Your review helps other buyers make better decisions.</p>
            <Link href="/portal/orders" className="btn-primary" style={{ display: "inline-flex" }}>Back to My Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>
      <div style={{ background: "var(--color-primary-900)", borderBottom: "3px solid var(--color-accent-amber)", padding: "28px 0" }}>
        <div className="container-page" style={{ maxWidth: 640 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Link href="/portal/orders" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Orders</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <Link href={`/portal/orders/${id}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{id}</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>Review</span>
          </nav>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Rate this Order</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Your feedback helps GREENIE improve quality and delivery.</p>
        </div>
      </div>

      <div className="container-page" style={{ maxWidth: 640, paddingTop: 28, paddingBottom: 64 }}>
        <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: "32px 36px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 32 }}>
            {ratingCategories.map(({ key, label, emoji, desc }) => (
              <div key={key} style={{ paddingBottom: 24, borderBottom: "1px solid var(--color-neutral-100)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-neutral-900)" }}><span>{emoji}</span> {label}</p>
                    <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 3 }}>{desc}</p>
                  </div>
                  {ratings[key] && <span style={{ fontSize: 12, fontWeight: 800, padding: "4px 12px", background: "var(--color-accent-amber)", borderRadius: "var(--radius-full)", color: "var(--color-neutral-900)" }}>{ratings[key]}/5</span>}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((v) => {
                    const filled = v <= (hovered[key] || ratings[key] || 0);
                    return (
                      <button key={v} onClick={() => setRating(key, v)}
                        onMouseEnter={() => setHovered(h => ({ ...h, [key]: v }))}
                        onMouseLeave={() => setHovered(h => ({ ...h, [key]: 0 }))}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, transform: filled ? "scale(1.1)" : "scale(1)", transition: "transform 0.1s" }}>
                        <Star style={{ width: 32, height: 32, fill: filled ? "#F59E0B" : "none", color: filled ? "#F59E0B" : "var(--color-neutral-200)", transition: "color 0.1s, fill 0.1s" }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--color-neutral-700)", display: "block", marginBottom: 10 }}>
              Comments <span style={{ fontWeight: 400, color: "var(--color-neutral-500)" }}>(optional)</span>
            </label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4}
              placeholder="How was the material quality? Any feedback on delivery or communication?"
              style={{ width: "100%", padding: "14px 16px", fontSize: 14, border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-md)", outline: "none", color: "var(--color-neutral-900)", resize: "none", background: "var(--color-neutral-100)", lineHeight: 1.6, fontFamily: "inherit" }} />
          </div>

          <button onClick={() => setSubmitted(true)} disabled={!allRated} className="btn-primary"
            style={{ width: "100%", justifyContent: "center", height: 50, fontSize: 15, opacity: allRated ? 1 : 0.5 }}>
            <Send style={{ width: 16, height: 16 }} /> Submit Review
          </button>
          {!allRated && <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-neutral-500)", marginTop: 10 }}>Please rate all three categories to submit</p>}
        </div>
      </div>
    </div>
  );
}
