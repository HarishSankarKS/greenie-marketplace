export type Zone = "North" | "South" | "East" | "West";
export type Category = "Concrete" | "Steel" | "Wood" | "Plastic" | "Glass";

export interface Material {
  id: string;
  name: string;
  category: Category;
  grade: string;
  zone: Zone;
  pricePerUnit: number;
  unit: string;
  availableQty: number;
  minOrder: number;
  description: string;
  images: string[];
  labCertAvailable: boolean;
  tags: string[];
  createdAt: string;
}

export const materials: Material[] = [
  {
    id: "mat-001",
    name: "Crushed Concrete 20mm",
    category: "Concrete",
    grade: "Crushed 20mm",
    zone: "North",
    pricePerUnit: 280,
    unit: "tonne",
    availableQty: 420,
    minOrder: 5,
    description:
      "AI-sorted and graded 20mm crushed concrete aggregate from C&D waste. Ideal for road sub-base and fill applications. Verified by GREENIE Edge AI sorting system.",
    images: ["/images/concrete-1.jpg", "/images/concrete-2.jpg"],
    labCertAvailable: true,
    tags: ["road-base", "fill", "aggregate"],
    createdAt: "2026-03-10T08:00:00Z",
  },
  {
    id: "mat-002",
    name: "Reinforced Concrete Chunks",
    category: "Concrete",
    grade: "Reinforced / Chunked",
    zone: "South",
    pricePerUnit: 180,
    unit: "tonne",
    availableQty: 210,
    minOrder: 10,
    description:
      "Larger reinforced concrete pieces suitable for gabion walls, retaining structures and heavy fill. Steel rebar partially intact.",
    images: ["/images/concrete-chunk-1.jpg"],
    labCertAvailable: false,
    tags: ["fill", "gabion", "retaining"],
    createdAt: "2026-03-11T10:00:00Z",
  },
  {
    id: "mat-003",
    name: "Structural Steel Rebar – Grade A",
    category: "Steel",
    grade: "Structural Grade A",
    zone: "East",
    pricePerUnit: 25000,
    unit: "tonne",
    availableQty: 18,
    minOrder: 1,
    description:
      "Deformed steel rebar extracted and graded from demolition sites. Grade A verified by GREENIE AI vision system. Ready for reuse in structural applications.",
    images: ["/images/steel-rebar-1.jpg", "/images/steel-rebar-2.jpg"],
    labCertAvailable: true,
    tags: ["structural", "rebar", "demolition"],
    createdAt: "2026-03-09T09:00:00Z",
  },
  {
    id: "mat-004",
    name: "Steel Sheet Scrap",
    category: "Steel",
    grade: "Sheet / Scrap",
    zone: "West",
    pricePerUnit: 19500,
    unit: "tonne",
    availableQty: 32,
    minOrder: 1,
    description:
      "Mixed sheet steel and light structural scrap. Suitable for recycling plants and secondary fabrication. Clean, non-contaminated batch.",
    images: ["/images/steel-sheet-1.jpg"],
    labCertAvailable: false,
    tags: ["fabrication", "recycling", "sheet"],
    createdAt: "2026-03-12T11:00:00Z",
  },
  {
    id: "mat-005",
    name: "Structural Timber Beams",
    category: "Wood",
    grade: "Structural Timber",
    zone: "North",
    pricePerUnit: 300,
    unit: "piece",
    availableQty: 145,
    minOrder: 5,
    description:
      "Solid hardwood and softwood beams salvaged from building demolition. Suitable for temporary structures, scaffolding, or secondary construction.",
    images: ["/images/wood-beam-1.jpg", "/images/wood-beam-2.jpg"],
    labCertAvailable: false,
    tags: ["beams", "scaffolding", "salvaged"],
    createdAt: "2026-03-08T07:00:00Z",
  },
  {
    id: "mat-006",
    name: "Plywood Sheets",
    category: "Wood",
    grade: "Plywood",
    zone: "South",
    pricePerUnit: 120,
    unit: "piece",
    availableQty: 88,
    minOrder: 10,
    description:
      "Used plywood sheets in fair condition. Sizes vary (mostly 8×4 ft). Suitable for shuttering, temporary partition, or low-load flooring.",
    images: ["/images/plywood-1.jpg"],
    labCertAvailable: false,
    tags: ["shuttering", "partition", "plywood"],
    createdAt: "2026-03-13T06:00:00Z",
  },
  {
    id: "mat-007",
    name: "HDPE Plastic Pieces",
    category: "Plastic",
    grade: "HDPE",
    zone: "East",
    pricePerUnit: 22,
    unit: "kg",
    availableQty: 3200,
    minOrder: 50,
    description:
      "High-density polyethylene sorted from C&D waste streams. HDPE fraction is clean and suitable for plastic recycling plants producing pipes or containers.",
    images: ["/images/hdpe-1.jpg"],
    labCertAvailable: true,
    tags: ["recycling", "HDPE", "pipes"],
    createdAt: "2026-03-10T12:00:00Z",
  },
  {
    id: "mat-008",
    name: "Mixed PVC",
    category: "Plastic",
    grade: "PVC / Mixed",
    zone: "West",
    pricePerUnit: 10,
    unit: "kg",
    availableQty: 1800,
    minOrder: 100,
    description:
      "Mixed PVC fractions from conduit pipes, window frames, and fittings. Best suited for secondary plastic processing.",
    images: ["/images/pvc-1.jpg"],
    labCertAvailable: false,
    tags: ["PVC", "conduit", "mixed"],
    createdAt: "2026-03-11T14:00:00Z",
  },
  {
    id: "mat-009",
    name: "Float Glass Panels",
    category: "Glass",
    grade: "Float Glass",
    zone: "North",
    pricePerUnit: 15,
    unit: "kg",
    availableQty: 620,
    minOrder: 20,
    description:
      "Clear float glass recovered from window demolition. Variable sizes. Suitable for glaziers or glass recycling units.",
    images: ["/images/glass-float-1.jpg"],
    labCertAvailable: false,
    tags: ["float", "window", "clear"],
    createdAt: "2026-03-12T09:00:00Z",
  },
  {
    id: "mat-010",
    name: "Tempered Safety Glass",
    category: "Glass",
    grade: "Tempered",
    zone: "South",
    pricePerUnit: 18,
    unit: "kg",
    availableQty: 0,
    minOrder: 20,
    description:
      "Tempered safety glass panels from commercial building façades. Currently out of stock — new batch expected in 5–7 days.",
    images: ["/images/glass-tempered-1.jpg"],
    labCertAvailable: false,
    tags: ["tempered", "safety", "commercial"],
    createdAt: "2026-03-07T15:00:00Z",
  },
  {
    id: "mat-011",
    name: "Crushed Concrete – Road Grade",
    category: "Concrete",
    grade: "Crushed 20mm",
    zone: "East",
    pricePerUnit: 320,
    unit: "tonne",
    availableQty: 190,
    minOrder: 5,
    description:
      "Premium road-grade crushed concrete sourced from EAST Transfer Station. Lab tested for compressive strength. Pre-approved by CCMC for road sub-base use.",
    images: ["/images/concrete-road-1.jpg"],
    labCertAvailable: true,
    tags: ["road-base", "CCMC-approved", "premium"],
    createdAt: "2026-03-13T08:00:00Z",
  },
  {
    id: "mat-012",
    name: "Scrap Wood – Renovation",
    category: "Wood",
    grade: "Scrap",
    zone: "West",
    pricePerUnit: 50,
    unit: "piece",
    availableQty: 320,
    minOrder: 20,
    description:
      "Mixed wood scrap from renovation and interior demolition jobs. Includes door frames, skirting boards, and shelf boards. Sold by piece.",
    images: ["/images/wood-scrap-1.jpg"],
    labCertAvailable: false,
    tags: ["renovation", "scrap", "low-cost"],
    createdAt: "2026-03-14T07:00:00Z",
  },
];

export const categoryIcons: Record<Category, string> = {
  Concrete: "🪨",
  Steel: "⚙️",
  Wood: "🪵",
  Plastic: "♻️",
  Glass: "🔷",
};

export const zones: Zone[] = ["North", "South", "East", "West"];
export const categories: Category[] = ["Concrete", "Steel", "Wood", "Plastic", "Glass"];

export function getMaterialById(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

export function getMaterialsByCategory(category: Category): Material[] {
  return materials.filter((m) => m.category === category);
}

export function getMaterialsByZone(zone: Zone): Material[] {
  return materials.filter((m) => m.zone === zone);
}

export function getInventorySummary(): Record<Category, number> {
  return categories.reduce(
    (acc, cat) => ({
      ...acc,
      [cat]: materials
        .filter((m) => m.category === cat)
        .reduce((sum, m) => {
          if (m.unit === "tonne") return sum + m.availableQty;
          if (m.unit === "kg") return sum + m.availableQty / 1000;
          return sum + m.availableQty * 0.01; // pieces approximated
        }, 0),
    }),
    {} as Record<Category, number>
  );
}

export function getAllMaterialIds(): string[] {
  return materials.map((m) => m.id);
}

