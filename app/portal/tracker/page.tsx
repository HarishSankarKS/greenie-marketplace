"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Truck, MapPin, Clock, Radio } from "lucide-react";
import { orders } from "@/lib/mock/orders";

// Dynamically import map — no SSR (Leaflet requires browser)
const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%)", borderRadius: "var(--radius-lg)"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
        <p style={{ fontSize: 13, color: "var(--color-neutral-500)" }}>Loading map…</p>
      </div>
    </div>
  ),
});

// Coimbatore Transfer Stations (lat/lng)
const STATIONS: Record<string, { lat: number; lng: number; label: string }> = {
  North: { lat: 11.0456, lng: 76.9976, label: "North Transfer Station" },
  South: { lat: 10.9674, lng: 76.9565, label: "South Transfer Station" },
  East:  { lat: 11.0051, lng: 77.0499, label: "East Transfer Station" },
  West:  { lat: 11.0012, lng: 76.9355, label: "West Transfer Station" },
};

// Mock delivery destination (Anna Nagar, Coimbatore)
const DELIVERY_DEST = { lat: 11.0163, lng: 76.9676, label: "Anna Nagar, Coimbatore – 641003" };

// Mock truck midpoint (en-route)
const TRUCK_POS = { lat: 11.0290, lng: 76.9820, label: "TN 37 AX 4421 – Live Position" };

export default function TrackerPage() {
  const activeOrder = orders.find((o) => o.status === "in_transit");
  const zone = activeOrder?.items?.[0]?.zone || "North";
  const origin = STATIONS[zone] || STATIONS.North;

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "var(--color-primary-900)",
        borderBottom: "3px solid var(--color-accent-amber)",
        padding: "28px 0"
      }}>
        <div className="container-page">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Link href="/portal/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>Live Tracker</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Live Logistics Tracker</h1>
            {activeOrder && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #4ade80", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#4ade80" }}>LIVE GPS ACTIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-page" style={{ paddingTop: 28, paddingBottom: 64 }}>
        {activeOrder ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Live Map */}
            <div style={{
              background: "var(--color-white)",
              border: "1.5px solid var(--color-neutral-200)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              height: 460,
              position: "relative"
            }}>
              {/* Map badge */}
              <div style={{
                position: "absolute", top: 12, right: 12, zIndex: 1000,
                background: "rgba(27,94,32,0.92)", backdropFilter: "blur(8px)",
                padding: "6px 14px", borderRadius: "var(--radius-full)",
                display: "flex", alignItems: "center", gap: 6
              }}>
                <Radio style={{ width: 12, height: 12, color: "#4ade80" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>OpenStreetMap · Live</span>
              </div>

              <LiveMap
                origin={origin}
                destination={DELIVERY_DEST}
                truck={TRUCK_POS}
              />
            </div>

            {/* Order Details Strip */}
            <div style={{
              background: "var(--color-white)",
              border: "1.5px solid var(--color-neutral-200)",
              borderRadius: "var(--radius-lg)", padding: "20px 24px",
              boxShadow: "var(--shadow-card)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-neutral-900)" }}>{activeOrder.id}</p>
                  <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 2 }}>
                    {activeOrder.items.map(i => i.materialName).join(", ")}
                  </p>
                </div>
                <Link href={`/portal/orders/${activeOrder.id}`} style={{
                  fontSize: 12, fontWeight: 600, color: "var(--color-primary-700)", textDecoration: "none"
                }}>
                  View Order →
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  {
                    icon: <Truck style={{ width: 16, height: 16, color: "#7C3AED" }} />,
                    label: "Driver",
                    value: activeOrder.driverName,
                    sub: activeOrder.vehicleNo,
                  },
                  {
                    icon: <MapPin style={{ width: 16, height: 16, color: "var(--color-primary-700)" }} />,
                    label: "Destination",
                    value: activeOrder.deliveryAddress,
                    sub: null,
                  },
                  {
                    icon: <Clock style={{ width: 16, height: 16, color: "var(--color-accent-amber)" }} />,
                    label: "Delivery Slot",
                    value: activeOrder.deliverySlot,
                    sub: null,
                  },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} style={{ padding: "14px 16px", background: "var(--color-neutral-100)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-neutral-200)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      {icon}
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-neutral-500)" }}>{label}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-neutral-900)", lineHeight: 1.4 }}>{value}</p>
                    {sub && <p style={{ fontSize: 11, color: "var(--color-neutral-500)", fontFamily: "monospace", marginTop: 2 }}>{sub}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Live GPS Info */}
            <div style={{
              background: "#F3E8FF",
              border: "1.5px solid #E9D5FF",
              borderRadius: "var(--radius-lg)", padding: "16px 20px",
              display: "flex", alignItems: "flex-start", gap: 14
            }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>🛰️</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", marginBottom: 4 }}>
                  Live GPS from GREENIE Fleet Intelligence
                </p>
                <p style={{ fontSize: 12, color: "#6D28D9", lineHeight: 1.6 }}>
                  Map powered by OpenStreetMap. Location updates every 30 seconds from truck telematics.
                  Driver can be contacted via Fleet Operations at <strong>+91 98765 43210</strong>.
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div style={{
            background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)",
            borderRadius: "var(--radius-lg)", padding: 64, textAlign: "center", boxShadow: "var(--shadow-card)"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚛</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 8 }}>
              No active deliveries in transit
            </p>
            <p style={{ fontSize: 13, color: "var(--color-neutral-500)", marginBottom: 24 }}>
              Live tracking will appear here when one of your orders is out for delivery.
            </p>
            <Link href="/portal/orders" className="btn-primary" style={{ display: "inline-flex" }}>View all orders</Link>
          </div>
        )}
      </div>
    </div>
  );
}
