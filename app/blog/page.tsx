"use client";

import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    id: 1, date: "Mar 12, 2026",
    title: "C&D Waste Rules 2025: What Bulk Generators Must Know Before April 1",
    category: "Regulation",
    excerpt: "The new rules mandate 25% EPR recycling targets for bulk waste generators starting FY2025–26. Here's what it means for construction firms and municipalities.",
    accent: { bg: "#FFFBEB", border: "#FDE68A", tag: "#B45309", tagBg: "#FEF3C7" },
  },
  {
    id: 2, date: "Mar 8, 2026",
    title: "How GREENIE's Edge AI Grades Concrete Aggregate — and Why It Matters",
    category: "Technology",
    excerpt: "Every piece of rubble that passes through a Transfer Station conveyor belt is scanned, classified, and graded by GREENIE's AI vision system before being listed for sale.",
    accent: { bg: "#EFF6FF", border: "#BFDBFE", tag: "#1D4ED8", tagBg: "#DBEAFE" },
  },
  {
    id: 3, date: "Feb 28, 2026",
    title: "Why Recycled Steel from GREENIE Costs Less — With No Compromise on Purity",
    category: "Materials",
    excerpt: "GREENIE's Grade A structural steel rebar averages ₹25,000/T — versus ₹28,000–32,000 for primary steel. Here's why the grade accuracy justifies the switch.",
    accent: { bg: "#F0FDF4", border: "#BBF7D0", tag: "#15803D", tagBg: "#DCFCE7" },
  },
  {
    id: 4, date: "Feb 15, 2026",
    title: "Informal Market vs GREENIE: A Price Reality Check for Road Contractors",
    category: "Industry",
    excerpt: "Contractors using informal concrete rubble suppliers face inconsistent sizing, no documentation, and legal risk under C&D rules. Here's the true cost comparison.",
    accent: { bg: "#FFF1F2", border: "#FECDD3", tag: "#BE123C", tagBg: "#FFE4E6" },
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <section style={{ background: "var(--color-primary-900)", padding: "72px 0 56px" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 16 }}>
            GREENIE Sustainability Blog
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            Insights on Recycling,<br />Regulation &amp; Materials
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto" }}>
            Stay current on C&amp;D waste management, market pricing, and GREENIE technology updates.
          </p>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <div className="container-page" style={{ padding: "56px 0 80px", maxWidth: 1100 }}>
        {/* Feature post — full width */}
        <article style={{
          background: posts[0].accent.bg,
          border: `1.5px solid ${posts[0].accent.border}`,
          borderRadius: "var(--radius-xl)",
          padding: "40px 48px",
          marginBottom: 24,
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 40
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: "var(--radius-full)",
                background: posts[0].accent.tagBg, color: posts[0].accent.tag
              }}>{posts[0].category}</span>
              <span style={{ fontSize: 12, color: "var(--color-neutral-500)", display: "flex", alignItems: "center", gap: 5 }}>
                <Calendar style={{ width: 12, height: 12 }} />{posts[0].date}
              </span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-neutral-900)", lineHeight: 1.3, marginBottom: 12 }}>
              {posts[0].title}
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-neutral-500)", lineHeight: 1.7, marginBottom: 20 }}>
              {posts[0].excerpt}
            </p>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 700, color: "var(--color-primary-700)",
              background: "none", border: "none", cursor: "pointer", padding: 0
            }}>
              Read full article <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
          <div style={{
            width: 180, height: 180, flexShrink: 0,
            background: `linear-gradient(135deg, ${posts[0].accent.border}, ${posts[0].accent.bg})`,
            borderRadius: "var(--radius-xl)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 64
          }}>📋</div>
        </article>

        {/* 3-column remaining posts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {posts.slice(1).map((post) => (
            <article key={post.id} style={{
              background: post.accent.bg,
              border: `1.5px solid ${post.accent.border}`,
              borderRadius: "var(--radius-lg)",
              padding: "28px 24px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: "var(--radius-full)",
                  background: post.accent.tagBg, color: post.accent.tag
                }}>{post.category}</span>
                <span style={{ fontSize: 11, color: "var(--color-neutral-500)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar style={{ width: 10, height: 10 }} />{post.date}
                </span>
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-neutral-900)", lineHeight: 1.4, marginBottom: 10 }}>
                {post.title}
              </h2>
              <p style={{ fontSize: 13, color: "var(--color-neutral-500)", lineHeight: 1.65, marginBottom: 16 }}>
                {post.excerpt}
              </p>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12, fontWeight: 700, color: "var(--color-primary-700)",
                background: "none", border: "none", cursor: "pointer", padding: 0
              }}>
                Read more <ArrowRight style={{ width: 12, height: 12 }} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
