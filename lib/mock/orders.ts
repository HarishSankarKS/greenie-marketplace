export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "loaded"
  | "in_transit"
  | "ready_for_pickup"
  | "delivered"
  | "reviewed";

export type DeliveryMode = "delivery" | "self_pickup";

export interface OrderItem {
  materialId: string;
  materialName: string;
  grade: string;
  zone: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  buyerName: string;
  status: OrderStatus;
  deliveryMode: DeliveryMode;
  items: OrderItem[];
  subtotal: number;
  logisticsFee: number;
  gst: number;
  total: number;
  deliveryAddress?: string;
  deliverySlot?: string;
  trackingUrl?: string;
  driverName?: string;
  vehicleNo?: string;
  podPhotoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  {
    id: "ORD-20260314-001",
    buyerName: "Rajesh Kumar",
    status: "in_transit",
    deliveryMode: "delivery",
    items: [
      {
        materialId: "mat-001",
        materialName: "Crushed Concrete 20mm",
        grade: "Crushed 20mm",
        zone: "North",
        quantity: 20,
        unit: "tonne",
        unitPrice: 280,
        subtotal: 5600,
      },
    ],
    subtotal: 5600,
    logisticsFee: 800,
    gst: 1152,
    total: 7552,
    deliveryAddress: "14, Anna Nagar, Coimbatore – 641003",
    deliverySlot: "2026-03-15 10:00–14:00",
    trackingUrl: "https://maps.greenie.in/track/ORD-001",
    driverName: "Murugan S.",
    vehicleNo: "TN 37 AX 4421",
    createdAt: "2026-03-13T09:00:00Z",
    updatedAt: "2026-03-14T11:30:00Z",
  },
  {
    id: "ORD-20260310-002",
    buyerName: "Rajesh Kumar",
    status: "delivered",
    deliveryMode: "self_pickup",
    items: [
      {
        materialId: "mat-003",
        materialName: "Structural Steel Rebar – Grade A",
        grade: "Structural Grade A",
        zone: "East",
        quantity: 3,
        unit: "tonne",
        unitPrice: 25000,
        subtotal: 75000,
      },
    ],
    subtotal: 75000,
    logisticsFee: 0,
    gst: 13500,
    total: 88500,
    podPhotoUrl: "/images/pod-sample.jpg",
    createdAt: "2026-03-08T14:00:00Z",
    updatedAt: "2026-03-10T16:00:00Z",
  },
  {
    id: "ORD-20260301-003",
    buyerName: "Rajesh Kumar",
    status: "confirmed",
    deliveryMode: "delivery",
    items: [
      {
        materialId: "mat-007",
        materialName: "HDPE Plastic Pieces",
        grade: "HDPE",
        zone: "East",
        quantity: 500,
        unit: "kg",
        unitPrice: 22,
        subtotal: 11000,
      },
      {
        materialId: "mat-008",
        materialName: "Mixed PVC",
        grade: "PVC / Mixed",
        zone: "West",
        quantity: 200,
        unit: "kg",
        unitPrice: 10,
        subtotal: 2000,
      },
    ],
    subtotal: 13000,
    logisticsFee: 600,
    gst: 2448,
    total: 16048,
    deliveryAddress: "14, Anna Nagar, Coimbatore – 641003",
    deliverySlot: "2026-03-16 08:00–12:00",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:05:00Z",
  },
];

export const statusSteps: { key: OrderStatus; label: string }[] = [
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing at Station" },
  { key: "loaded", label: "Loaded" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

export function getStatusIndex(status: OrderStatus): number {
  const idx = statusSteps.findIndex((s) => s.key === status);
  if (status === "ready_for_pickup") return 3; // same as in_transit stage
  if (status === "reviewed") return 5;
  return idx === -1 ? 0 : idx;
}
