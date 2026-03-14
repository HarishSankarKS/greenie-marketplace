"use client";

import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { orders } from "@/lib/mock/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateInvoicePDF } from "@/lib/invoicePdf";

export default function PaymentsPage() {
  const paidOrders = orders.filter((o) => o.status !== "pending");
  const totalPaid = paidOrders.reduce((s, o) => s + o.total, 0);
  const totalGST = paidOrders.reduce((s, o) => s + o.gst, 0);

  return (
    <div style={{ background: "var(--color-neutral-100)", minHeight: "100vh" }}>

      {/* Header banner */}
      <div style={{
        background: "var(--color-primary-900)",
        borderBottom: "3px solid var(--color-accent-amber)",
        padding: "32px 0 48px"
      }}>
        <div className="container-page">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/portal/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>Payment History</span>
          </nav>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 20 }}>Payment History</h1>

          {/* Summary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 600 }}>
            {[
              { label: "Total Paid (All Time)", value: formatCurrency(totalPaid), emoji: "💰" },
              { label: "GST Paid", value: formatCurrency(totalGST), emoji: "🧾" },
              { label: "Transactions", value: `${paidOrders.length} orders`, emoji: "📊" },
            ].map(({ label, value, emoji }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.15)", padding: "14px 18px"
              }}>
                <p style={{ fontSize: 18, marginBottom: 4 }}>{emoji}</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{value}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page" style={{ marginTop: -24, paddingBottom: 64 }}>
        
        {/* Table card */}
        <div style={{
          background: "var(--color-white)",
          border: "1.5px solid var(--color-neutral-200)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-card)",
          overflow: "hidden"
        }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto auto auto",
            padding: "12px 24px",
            background: "var(--color-neutral-100)",
            borderBottom: "1px solid var(--color-neutral-200)",
            gap: 16
          }}>
            {["Order", "Amount", "GST Incl.", "Invoice"].map((h) => (
              <p key={h} style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-neutral-500)" }}>{h}</p>
            ))}
          </div>

          {paidOrders.map((order, idx) => (
            <div key={order.id} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto auto",
              padding: "18px 24px", gap: 16, alignItems: "center",
              borderBottom: idx < paidOrders.length - 1 ? "1px solid var(--color-neutral-100)" : "none"
            }}>
              {/* Order info */}
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  background: "var(--color-primary-50)", border: "1.5px solid var(--color-primary-500)",
                  borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                }}>💳</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-neutral-900)" }}>{order.id}</p>
                  <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginTop: 2 }}>{formatDate(order.createdAt)}</p>
                  <p style={{ fontSize: 12, color: "var(--color-neutral-500)", marginTop: 2 }}>
                    {order.items.map((i) => i.materialName).join(", ")}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <p style={{ fontSize: 16, fontWeight: 800, color: "var(--color-primary-700)", textAlign: "right", whiteSpace: "nowrap" }}>
                {formatCurrency(order.total)}
              </p>

              {/* GST */}
              <p style={{ fontSize: 13, color: "var(--color-neutral-500)", textAlign: "right", whiteSpace: "nowrap" }}>
                incl. {formatCurrency(order.gst)}
              </p>

              {/* Download button */}
              <button
                onClick={() => generateInvoicePDF(order)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", border: "1.5px solid var(--color-primary-500)",
                  borderRadius: "var(--radius-md)", background: "var(--color-primary-50)",
                  color: "var(--color-primary-700)", fontSize: 12, fontWeight: 700,
                  cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s"
                }}
                onMouseEnter={e => { (e.currentTarget).style.background = "var(--color-primary-700)"; (e.currentTarget).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget).style.background = "var(--color-primary-50)"; (e.currentTarget).style.color = "var(--color-primary-700)"; }}
              >
                <FileText style={{ width: 13, height: 13 }} /> Invoice PDF
              </button>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "var(--color-neutral-500)", marginTop: 12, textAlign: "center" }}>
          All invoices include CGST + SGST @ 9% each · GSTIN: 33AABCG1234A1Z5
        </p>
      </div>
    </div>
  );
}
