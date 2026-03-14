"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { orders } from "@/lib/mock/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import OrderStatusStepper from "@/components/OrderStatusStepper";
import { Download, MapPin, Truck, Check, Star, FileText } from "lucide-react";
import { generateInvoicePDF } from "@/lib/invoicePdf";

const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  pending:          { label: "Pending",          color: "#6B7280", bg: "#F9FAFB" },
  confirmed:        { label: "Confirmed",        color: "#1D4ED8", bg: "#DBEAFE" },
  preparing:        { label: "Preparing",        color: "#B45309", bg: "#FEF3C7" },
  loaded:           { label: "Loaded",           color: "#C2410C", bg: "#FFEDD5" },
  in_transit:       { label: "In Transit",       color: "#7C3AED", bg: "#F3E8FF" },
  ready_for_pickup: { label: "Ready for Pickup", color: "#0F766E", bg: "#CCFBF1" },
  delivered:        { label: "Delivered",        color: "#15803D", bg: "#DCFCE7" },
  reviewed:         { label: "Reviewed",         color: "#15803D", bg: "#DCFCE7" },
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  const [confirmed, setConfirmed] = useState(false);

  const isDelivered = ["delivered", "reviewed"].includes(order.status);
  const isInTransit = order.status === "in_transit";
  const meta = statusMeta[order.status] || statusMeta.pending;

  const handleDownloadInvoice = () => {
    generateInvoicePDF(order);
  };

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>
      {/* Header banner */}
      <div style={{
        background: "var(--color-primary-900)",
        borderBottom: "3px solid var(--color-accent-amber)",
        padding: "28px 0"
      }}>
        <div className="container-page" style={{ maxWidth: 800 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/portal/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <Link href="/portal/orders" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Orders</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{order.id}</span>
          </nav>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Order Details</h1>
            <span style={{
              fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: "var(--radius-full)",
              background: meta.bg, color: meta.color
            }}>{meta.label}</span>
          </div>
        </div>
      </div>

      <div className="container-page" style={{ maxWidth: 800, paddingTop: 28, paddingBottom: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Status Stepper */}
          <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-neutral-900)" }}>{order.id}</p>
                <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 3 }}>Placed {formatDate(order.createdAt)}</p>
              </div>
              <button onClick={handleDownloadInvoice} style={{
                display: "flex", alignItems: "center", gap: 7, padding: "8px 16px",
                background: "var(--color-accent-amber)", border: "none", borderRadius: "var(--radius-md)",
                fontSize: 12, fontWeight: 700, cursor: "pointer", color: "var(--color-neutral-900)"
              }}>
                <FileText style={{ width: 14, height: 14 }} /> Download Invoice
              </button>
            </div>
            <OrderStatusStepper status={order.status} createdAt={order.createdAt} deliveryMode={order.deliveryMode} />
          </div>

          {/* Items */}
          <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-card)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 20 }}>Order Items</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {order.items.map((item) => (
                <div key={item.materialId} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, paddingBottom: 16, borderBottom: "1px solid var(--color-neutral-100)" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 6 }}>{item.materialName}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", background: "var(--color-neutral-100)", color: "var(--color-neutral-500)", borderRadius: "var(--radius-full)", border: "1px solid var(--color-neutral-200)" }}>{item.grade}</span>
                      <span style={{ fontSize: 11, color: "var(--color-neutral-500)", display: "flex", alignItems: "center", gap: 3 }}>
                        <MapPin style={{ width: 10, height: 10 }} />{item.zone} Station
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--color-neutral-900)" }}>{formatCurrency(item.subtotal)}</p>
                    <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginTop: 2 }}>{item.quantity} {item.unit}s × {formatCurrency(item.unitPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Totals */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--color-neutral-200)", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-neutral-500)" }}>
                <span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.logisticsFee > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-neutral-500)" }}>
                  <span>Logistics</span><span>{formatCurrency(order.logisticsFee)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-neutral-500)" }}>
                <span>CGST (9%)</span><span>{formatCurrency(order.gst / 2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-neutral-500)" }}>
                <span>SGST (9%)</span><span>{formatCurrency(order.gst / 2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, color: "var(--color-neutral-900)", paddingTop: 10, borderTop: "1.5px solid var(--color-neutral-200)", marginTop: 4 }}>
                <span>Grand Total</span>
                <span style={{ color: "var(--color-primary-700)" }}>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          {order.deliveryMode === "delivery" && (
            <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-card)" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Truck style={{ width: 16, height: 16, color: "var(--color-primary-700)" }} /> Delivery Details
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Address", value: order.deliveryAddress },
                  { label: "Delivery Slot", value: order.deliverySlot },
                  { label: "Driver", value: order.driverName },
                  { label: "Vehicle", value: order.vehicleNo },
                ].filter(f => f.value).map(({ label, value }) => (
                  <div key={label} style={{ padding: "12px 16px", background: "var(--color-neutral-100)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-neutral-200)" }}>
                    <p style={{ fontSize: 11, color: "var(--color-neutral-500)", fontWeight: 600, marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-neutral-900)", fontFamily: label === "Vehicle" ? "monospace" : "inherit" }}>{value}</p>
                  </div>
                ))}
              </div>
              {isInTransit && (
                <Link href="/portal/tracker" style={{
                  marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px", background: "#7C3AED", borderRadius: "var(--radius-md)",
                  fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none"
                }}>
                  <Truck style={{ width: 16, height: 16 }} /> Track Live on Map
                </Link>
              )}
            </div>
          )}

          {/* Delivery Confirmation */}
          {isDelivered && (
            <div style={{ background: "var(--color-white)", border: "1.5px solid var(--color-neutral-200)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-card)" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-neutral-900)", marginBottom: 16 }}>Delivery Confirmation</h2>
              {!confirmed ? (
                <button onClick={() => setConfirmed(true)} className="btn-secondary" style={{ width: "100%", justifyContent: "center", height: 46, display: "flex" }}>
                  Confirm Receipt
                </button>
              ) : (
                <div style={{ padding: 20, background: "var(--color-primary-50)", border: "1.5px solid var(--color-primary-500)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                  <p style={{ fontSize: 20, marginBottom: 6 }}>✅</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary-700)", marginBottom: 8 }}>Receipt Confirmed</p>
                  <Link href={`/portal/orders/${order.id}/review`} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 13, fontWeight: 600, color: "var(--color-primary-700)", textDecoration: "none"
                  }}>
                    <Star style={{ width: 13, height: 13 }} /> Leave a review
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
