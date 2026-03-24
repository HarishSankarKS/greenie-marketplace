"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import { materials, categories, Category } from "@/lib/mock/materials";
import MaterialCard from "@/components/MaterialCard";

const ZONES = ["North", "South", "East", "West"] as const;
type Zone = typeof ZONES[number];

const GRADES = ["Crushed", "Chunked", "Reinforced", "Structural", "Sheet", "Scrap", "Salvaged", "Shredded", "Float", "Tempered"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Batch" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "stock-desc", label: "Most Stock" },
  { value: "reviewed", label: "Most Reviewed" },
];

function CatalogInner() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedCats, setSelectedCats] = useState<Category[]>(
    searchParams.get("category") ? [searchParams.get("category") as Category] : []
  );
  const [selectedZones, setSelectedZones] = useState<Zone[]>(
    searchParams.get("zone") ? [searchParams.get("zone") as Zone] : []
  );
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [certOnly, setCertOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCat = (c: Category) =>
    setSelectedCats((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
  const toggleZone = (z: Zone) =>
    setSelectedZones((p) => p.includes(z) ? p.filter((x) => x !== z) : [...p, z]);
  const toggleGrade = (g: string) =>
    setSelectedGrades((p) => p.includes(g) ? p.filter((x) => x !== g) : [...p, g]);

  const filtered = useMemo(() => {
    let list = [...materials];
    if (search) list = list.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.grade.toLowerCase().includes(search.toLowerCase()));
    if (selectedCats.length) list = list.filter((m) => selectedCats.includes(m.category));
    if (selectedZones.length) list = list.filter((m) => selectedZones.includes(m.zone as Zone));
    if (selectedGrades.length) list = list.filter((m) => selectedGrades.some((g) => m.grade.toLowerCase().includes(g.toLowerCase())));
    if (certOnly) list = list.filter((m) => m.labCertAvailable);
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.pricePerUnit - b.pricePerUnit); break;
      case "price-desc": list.sort((a, b) => b.pricePerUnit - a.pricePerUnit); break;
      case "stock-desc": list.sort((a, b) => b.availableQty - a.availableQty); break;
    }
    return list;
  }, [search, selectedCats, selectedZones, selectedGrades, certOnly, sortBy]);

  const inStock = filtered.filter((m) => m.availableQty > 0);
  const outOfStock = filtered.filter((m) => m.availableQty === 0);
  const activeFilters = selectedCats.length + selectedZones.length + selectedGrades.length + (certOnly ? 1 : 0);

  const clearAll = () => { setSelectedCats([]); setSelectedZones([]); setSelectedGrades([]); setCertOnly(false); setSearch(""); };

  const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: "1px solid var(--color-neutral-200)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-neutral-500)", marginBottom: 10 }}>
        {title}
      </p>
      {children}
    </div>
  );

  const sidebar = (
    <div>
      {/* Zone */}
      <SidebarSection title="Zone / Station">
        {ZONES.map((z) => {
          const count = materials.filter((m) => m.zone === z && m.availableQty > 0).length;
          const selected = selectedZones.includes(z);
          return (
            <label key={z} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, cursor: "pointer", padding: "6px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={selected} onChange={() => toggleZone(z)}
                  style={{ width: 14, height: 14, accentColor: "var(--color-primary-700)" }} />
                <span style={{ fontSize: 13, color: "var(--color-neutral-700)", fontWeight: selected ? 600 : 400 }}>{z} Station</span>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "1px 7px",
                background: selected ? "var(--color-accent-amber)" : "var(--color-neutral-100)",
                color: selected ? "var(--color-neutral-900)" : "var(--color-neutral-500)",
                borderRadius: "var(--radius-full)", border: `1px solid ${selected ? "transparent" : "var(--color-neutral-200)"}`
              }}>{count}</span>
            </label>
          );
        })}
      </SidebarSection>

      {/* Category */}
      <SidebarSection title="Material Type">
        {categories.map((cat) => {
          const count = materials.filter((m) => m.category === cat && m.availableQty > 0).length;
          const selected = selectedCats.includes(cat);
          const emoji: Record<string, string> = { Concrete: "🪨", Steel: "⚙️", Wood: "🪵", Plastic: "♻️", Glass: "🪟" };
          return (
            <label key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, cursor: "pointer", padding: "6px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={selected} onChange={() => toggleCat(cat)}
                  style={{ width: 14, height: 14, accentColor: "var(--color-primary-700)" }} />
                <span style={{ fontSize: 13, color: "var(--color-neutral-700)", fontWeight: selected ? 600 : 400 }}>
                  {emoji[cat]} {cat}
                </span>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "1px 7px",
                background: selected ? "var(--color-accent-amber)" : "var(--color-neutral-100)",
                color: selected ? "var(--color-neutral-900)" : "var(--color-neutral-500)",
                borderRadius: "var(--radius-full)", border: `1px solid ${selected ? "transparent" : "var(--color-neutral-200)"}`
              }}>{count}</span>
            </label>
          );
        })}
      </SidebarSection>

      {/* Lab Certified */}
      <SidebarSection title="Certifications">
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={certOnly} onChange={() => setCertOnly(!certOnly)}
            style={{ width: 14, height: 14, accentColor: "var(--color-primary-700)" }} />
          <span style={{ fontSize: 13, color: "var(--color-neutral-700)", fontWeight: certOnly ? 600 : 400 }}>
            🧪 Lab Certified only
          </span>
        </label>
      </SidebarSection>

      {activeFilters > 0 && (
        <button onClick={clearAll} style={{
          width: "100%", padding: "10px", border: "1.5px solid var(--color-neutral-200)",
          borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 600,
          color: "var(--color-neutral-700)", background: "transparent", cursor: "pointer",
          transition: "all 0.15s"
        }}>
          Clear All Filters ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>
      {/* Catalog hero banner */}
      <div style={{
        background: "var(--color-primary-900)", padding: "28px 0",
        borderBottom: "3px solid var(--color-accent-amber)"
      }}>
        <div className="container-page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p className="text-overline" style={{ color: "var(--color-accent-amber)", marginBottom: 4 }}>All Stations · Live Stock</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>Browse Materials</h1>
          </div>
          {/* Single search bar — hero version */}
          <div style={{ flex: 1, maxWidth: 440 }}>
            <div style={{
              display: "flex", alignItems: "center",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: "var(--radius-md)", overflow: "hidden",
              backdropFilter: "blur(4px)",
            }}>
              <Search style={{ width: 15, height: 15, color: "rgba(255,255,255,0.6)", margin: "0 0 0 12px", flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search concrete, steel, HDPE grade..."
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: 13, padding: "10px 12px", color: "#fff",
                }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ padding: "8px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex" }}>
                  <X style={{ width: 13, height: 13 }} />
                </button>
              )}
              <button style={{
                padding: "8px 18px", background: "var(--color-accent-amber)", border: "none",
                fontSize: 13, fontWeight: 700, cursor: "pointer", color: "var(--color-neutral-900)",
                whiteSpace: "nowrap",
              }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "start" }}>

          {/* ── LEFT SIDEBAR — 25% ── */}
          <aside style={{
            background: "var(--color-white)",
            border: "1.5px solid var(--color-neutral-200)",
            borderRadius: "var(--radius-lg)",
            padding: 20,
            boxShadow: "var(--shadow-card)",
            position: "sticky", top: 100
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid var(--color-neutral-200)" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-neutral-900)" }}>
                <SlidersHorizontal style={{ width: 14, height: 14, display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                Filters
              </span>
              {activeFilters > 0 && (
                <span className="chip-amber">{activeFilters} active</span>
              )}
            </div>
            {sidebar}
          </aside>

          {/* ── RIGHT GRID — 75% ── */}
          <div>
            {/* Sort bar */}
            <div style={{
              background: "var(--color-white)",
              border: "1.5px solid var(--color-neutral-200)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16, boxShadow: "var(--shadow-card)"
            }}>
              <span style={{ fontSize: 13, color: "var(--color-neutral-500)" }}>
                <strong style={{ color: "var(--color-neutral-900)" }}>{inStock.length}</strong> in stock
                {outOfStock.length > 0 && ` · ${outOfStock.length} out of stock`}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--color-neutral-500)", fontWeight: 500 }}>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    fontSize: 12, fontWeight: 600, border: "1.5px solid var(--color-neutral-200)",
                    borderRadius: "var(--radius-sm)", padding: "5px 10px",
                    background: "var(--color-neutral-100)", color: "var(--color-neutral-900)",
                    outline: "none", cursor: "pointer"
                  }}>
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilters > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {selectedCats.map((c) => (
                  <button key={c} onClick={() => toggleCat(c)} className="chip-green" style={{ cursor: "pointer", border: "none", gap: 5 }}>
                    {c} <X style={{ width: 10, height: 10 }} />
                  </button>
                ))}
                {selectedZones.map((z) => (
                  <button key={z} onClick={() => toggleZone(z)} className="chip-green" style={{ cursor: "pointer", border: "none", gap: 5 }}>
                    {z} Zone <X style={{ width: 10, height: 10 }} />
                  </button>
                ))}
                {certOnly && (
                  <button onClick={() => setCertOnly(false)} className="chip-green" style={{ cursor: "pointer", border: "none", gap: 5 }}>
                    Lab Certified <X style={{ width: 10, height: 10 }} />
                  </button>
                )}
              </div>
            )}

            {/* In-stock grid */}
            {inStock.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
                {inStock.map((m) => <MaterialCard key={m.id} material={m} />)}
              </div>
            ) : (
              <div style={{
                background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)",
                borderRadius: "var(--radius-lg)", padding: 48, textAlign: "center", marginBottom: 32
              }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
                <p style={{ fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 6 }}>No materials found</p>
                <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 20 }}>Try adjusting your filters or search term.</p>
                <button onClick={clearAll} className="btn-primary" style={{ height: 40, margin: "0 auto" }}>Clear Filters</button>
              </div>
            )}

            {/* Out-of-stock section */}
            {outOfStock.length > 0 && (
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-neutral-500)", marginBottom: 12 }}>
                  Out of Stock — Notify Me
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, opacity: 0.65 }}>
                  {outOfStock.map((m) => <MaterialCard key={m.id} material={m} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-neutral-500)" }}>Loading catalog…</p>
      </div>
    }>
      <CatalogInner />
    </Suspense>
  );
}
