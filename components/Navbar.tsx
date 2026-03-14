"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Concrete", "Steel", "Wood", "Plastic", "Glass"];
const ZONES = ["All Stations", "North", "South", "East", "West"];

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeZone, setActiveZone] = useState("All Stations");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <header className="topnav">
        {/* Main nav row */}
        <div className="container-page">
          <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "64px" }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, textDecoration: "none" }}>
              <div style={{
                width: 36, height: 36,
                background: "var(--color-primary-900)",
                borderRadius: "var(--radius-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18
              }}>♻️</div>
              <div>
                <span style={{ fontWeight: 800, fontSize: 16, color: "var(--color-primary-900)", letterSpacing: "-0.3px" }}>GREENIE</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-neutral-500)", display: "block", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: -2 }}>Marketplace</span>
              </div>
            </Link>

            {/* Category links — desktop */}
            <nav style={{ display: "flex", gap: "4px", flexShrink: 0 }} className="hidden-mobile">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/catalog?category=${cat}`}
                  style={{
                    fontSize: 13, fontWeight: 500, color: "var(--color-neutral-700)",
                    padding: "6px 10px", borderRadius: "var(--radius-sm)",
                    textDecoration: "none", whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--color-primary-700)"; (e.target as HTMLElement).style.background = "var(--color-primary-50)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--color-neutral-700)"; (e.target as HTMLElement).style.background = "transparent"; }}
                >
                  {cat}
                </Link>
              ))}
            </nav>

            {/* Search bar — 40% width */}
            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "480px" }}>
              <div className="search-bar">
                <Search style={{ width: 16, height: 16, color: "var(--color-neutral-500)", margin: "0 0 0 12px", flexShrink: 0 }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search concrete, steel, HDPE grade..."
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}
                    style={{ padding: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--color-neutral-500)", display: "flex" }}>
                    <X style={{ width: 14, height: 14 }} />
                  </button>
                )}
                <button type="submit"
                  style={{
                    background: "var(--color-primary-900)", color: "#fff",
                    border: "none", padding: "0 16px", height: "100%",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    borderLeft: "1px solid var(--color-neutral-200)"
                  }}>
                  Search
                </button>
              </div>
            </form>

            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                style={{
                  position: "relative", background: "none", border: "1.5px solid var(--color-neutral-200)",
                  borderRadius: "var(--radius-md)", padding: "8px 12px",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                  fontSize: 13, fontWeight: 600, color: "var(--color-neutral-700)", transition: "all 0.15s"
                }}
              >
                <ShoppingCart style={{ width: 18, height: 18 }} />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span style={{
                    position: "absolute", top: -6, right: -6,
                    background: "var(--color-accent-amber)", color: "var(--color-neutral-900)",
                    width: 18, height: 18, borderRadius: "var(--radius-full)",
                    fontSize: 10, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Login */}
              <Link href="/login" style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "var(--radius-md)",
                border: "1.5px solid var(--color-neutral-200)",
                fontSize: 13, fontWeight: 600, color: "var(--color-neutral-700)",
                textDecoration: "none", transition: "all 0.15s"
              }}>
                <User style={{ width: 16, height: 16 }} /> Login
              </Link>

              {/* Register CTA */}
              <Link href="/register" className="btn-primary" style={{ height: 38, padding: "0 18px", fontSize: 13 }}>
                Register Free
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
                className="show-mobile"
              >
                {menuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Zone filter strip */}
        <div style={{
          borderTop: "1px solid var(--color-neutral-200)",
          background: "var(--color-neutral-100)",
        }}>
          <div className="container-page" style={{ display: "flex", alignItems: "center", gap: "0", overflowX: "auto" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-neutral-500)", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 12, flexShrink: 0 }}>
              Zone:
            </span>
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => {
                  setActiveZone(z);
                  if (z === "All Stations") router.push("/catalog");
                  else router.push(`/catalog?zone=${z}`);
                }}
                style={{
                  padding: "7px 14px", fontSize: 12, fontWeight: 600,
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                  borderBottom: "2px solid",
                  borderBottomColor: activeZone === z ? "var(--color-primary-700)" : "transparent",
                  color: activeZone === z ? "var(--color-primary-900)" : "var(--color-neutral-500)",
                  background: "transparent", whiteSpace: "nowrap"
                }}
              >
                {z}
              </button>
            ))}
            <div style={{ marginLeft: "auto", padding: "6px 0", flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: "var(--color-neutral-500)" }}>
                🟢 <span style={{ color: "var(--color-success)", fontWeight: 600 }}>Live Inventory</span> — Updated 30s ago
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid var(--color-neutral-200)", background: "#fff", padding: "16px" }}>
            <form onSubmit={handleSearch} style={{ marginBottom: 12 }}>
              <div className="search-bar">
                <Search style={{ width: 16, height: 16, color: "var(--color-neutral-500)", margin: "0 0 0 12px" }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search materials..." />
              </div>
            </form>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/catalog?category=${cat}`}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 0", fontSize: 14, color: "var(--color-neutral-700)", textDecoration: "none", borderBottom: "1px solid var(--color-neutral-100)" }}>
                {cat}
              </Link>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Link href="/login" style={{ flex: 1, textAlign: "center", padding: "10px", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600, color: "var(--color-neutral-700)", textDecoration: "none" }}>Login</Link>
              <Link href="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center", height: 40 }}>Register</Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none; } }
        @media (max-width: 768px) { .show-mobile { display: flex !important; } }
      `}</style>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
