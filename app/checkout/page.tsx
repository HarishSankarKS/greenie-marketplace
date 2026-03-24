"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Box, Calendar, CreditCard, Receipt, PackageSearch } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const deliverySlots = [
  "Mon 16 Mar (8 AM - 12 PM)", "Mon 16 Mar (1 PM - 5 PM)",
  "Tue 17 Mar (8 AM - 12 PM)", "Tue 17 Mar (1 PM - 5 PM)",
  "Wed 18 Mar (8 AM - 12 PM)",
];

const paymentMethods = [
  { id: "upi",        label: "UPI (GPay, PhonePe, Paytm)" },
  { id: "netbanking", label: "Net Banking (All major banks)" },
  { id: "neft",       label: "NEFT / RTGS (Wire transfer)" },
  { id: "po",         label: "Purchase Order (Corporate)" },
];

/* ─── Pure CSS helpers to bypass Tailwind JIT conflict ─── */
const s = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    paddingBottom: "96px",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#111827",
  } as React.CSSProperties,
  wrap: {
    width: "100%",
    maxWidth: "960px",
    margin: "0 auto",
    padding: "48px 24px 0",
  } as React.CSSProperties,
  stepsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "28px",
  } as React.CSSProperties,
  stepActive: {
    flex: 1,
    padding: "12px 0",
    textAlign: "center" as const,
    borderRadius: "8px",
    backgroundColor: "#1e2d40",
    color: "#fff",
    fontWeight: 700,
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  stepInactive: {
    flex: 1,
    padding: "12px 0",
    textAlign: "center" as const,
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  contentRow: {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  } as React.CSSProperties,
  formCard: {
    flex: "1 1 0",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: "32px",
    minHeight: "480px",
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  quoteCard: {
    width: "300px",
    flexShrink: 0,
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: "24px",
    position: "sticky" as const,
    top: "88px",
  } as React.CSSProperties,
  fieldGroup: {
    marginBottom: "24px",
  } as React.CSSProperties,
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#374151",
    marginBottom: "8px",
  } as React.CSSProperties,
  select: {
    width: "100%",
    height: "40px",
    backgroundColor: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "0 36px 0 12px",
    fontSize: "13px",
    color: "#111827",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "16px",
    cursor: "pointer",
  } as React.CSSProperties,
  input: {
    width: "100%",
    height: "40px",
    backgroundColor: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "0 12px",
    fontSize: "13px",
    color: "#111827",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
  } as React.CSSProperties,
  btnPrimary: {
    padding: "8px 24px",
    backgroundColor: "#1e2d40",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,
  btnPrimaryDisabled: {
    padding: "8px 24px",
    backgroundColor: "#d1d5db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "not-allowed",
  } as React.CSSProperties,
  btnSecondary: {
    padding: "8px 24px",
    backgroundColor: "transparent",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,
  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
  } as React.CSSProperties,
  btnRowSplit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "32px",
  } as React.CSSProperties,
  note: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "48px",
    lineHeight: "1.5",
  } as React.CSSProperties,
  quoteTitle: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "15px",
    fontWeight: 800,
    color: "#111827",
    marginBottom: "2px",
  } as React.CSSProperties,
  quoteSubtitle: {
    fontSize: "11px",
    color: "#9ca3af",
    fontWeight: 500,
    marginBottom: "24px",
  } as React.CSSProperties,
  quoteRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "14px",
  } as React.CSSProperties,
  quoteTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "2px solid #111827",
  } as React.CSSProperties,
  reviewTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "13px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "32px",
  } as React.CSSProperties,
  reviewTdLabel: {
    padding: "12px 16px",
    color: "#6b7280",
    backgroundColor: "#f9fafb",
    width: "30%",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top" as const,
  } as React.CSSProperties,
  reviewTdValue: {
    padding: "12px 16px",
    color: "#111827",
    fontWeight: 500,
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top" as const,
  } as React.CSSProperties,
  radioGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  } as React.CSSProperties,
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#374151",
    fontWeight: 500,
  } as React.CSSProperties,
  radioLabelSelected: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    border: "1px solid #1e2d40",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#111827",
    fontWeight: 600,
    backgroundColor: "#f8fafc",
  } as React.CSSProperties,
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const logisticsFee   = deliveryMode === "delivery" ? 800 : 0;
  const pickupDiscount = deliveryMode === "pickup" ? Math.round(subtotal * 0.03) : 0;
  const taxableAmount  = subtotal - pickupDiscount + logisticsFee;
  const gst   = Math.round(taxableAmount * 0.18);
  const total = taxableAmount + gst;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <div style={{ backgroundColor: "#fff", padding: "48px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center", width: "400px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <PackageSearch size={40} color="#9ca3af" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Cart is empty</h2>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "32px" }}>Add materials from the catalog to proceed.</p>
          <Link href="/catalog" style={{ display: "block", padding: "10px 24px", backgroundColor: "#1e2d40", color: "#fff", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none", textAlign: "center" }}>
            Browse Materials
          </Link>
        </div>
      </div>
    );
  }

  const isStep1Valid = deliveryMode === "pickup" ? selectedSlot : (address && selectedSlot);

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        
        {/* Page Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#111827", letterSpacing: "-0.02em", marginBottom: "4px" }}>Checkout</h1>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>Complete your marketplace order</p>
        </div>

        {/* Step Indicators */}
        <div style={s.stepsRow}>
          <button onClick={() => setStep(1)} style={step >= 1 ? s.stepActive : s.stepInactive}>
            Step 1: Delivery Details
          </button>
          <button onClick={() => { if (isStep1Valid) setStep(2); }} style={step >= 2 ? s.stepActive : s.stepInactive}>
            Step 2: Payment
          </button>
          <button onClick={() => { if (selectedPayment && isStep1Valid) setStep(3); }} style={step === 3 ? s.stepActive : s.stepInactive}>
            Step 3: Review & Submit
          </button>
        </div>

        {/* Main Content Row */}
        <div style={s.contentRow}>

          {/* ── LEFT: Form Card ── */}
          <div style={s.formCard}>

            {/* Step 1 */}
            {step === 1 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>

                  {/* Delivery Mode */}
                  <div style={s.fieldGroup}>
                    <label style={s.label}>
                      <MapPin size={13} color="#6b7280" strokeWidth={2.5} />
                      Delivery Method
                    </label>
                    <select
                      value={deliveryMode}
                      onChange={(e) => setDeliveryMode(e.target.value as "delivery" | "pickup")}
                      style={s.select}
                    >
                      <option value="delivery">GREENIE Delivery (We bring it to you · ₹800 fee)</option>
                      <option value="pickup">Self Pickup (Collect from Transfer Station · -3% discount)</option>
                    </select>
                  </div>

                  {/* Address */}
                  {deliveryMode === "delivery" && (
                    <div style={s.fieldGroup}>
                      <label style={s.label}>
                        <MapPin size={13} color="#6b7280" strokeWidth={2.5} />
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 14, Anna Nagar, Coimbatore..."
                        style={s.input}
                      />
                    </div>
                  )}

                  {/* Pickup info */}
                  {deliveryMode === "pickup" && (
                    <div style={s.fieldGroup}>
                      <label style={s.label}>
                        <Box size={13} color="#6b7280" strokeWidth={2.5} />
                        Pickup Stations
                      </label>
                      <div style={{ ...s.input, height: "auto", padding: "12px", lineHeight: 1.6 }}>
                        <span style={{ display: "block", fontWeight: 600, marginBottom: "4px" }}>Items will be routed from:</span>
                        <ul style={{ paddingLeft: "16px", color: "#6b7280", fontSize: "13px" }}>
                          {items.map(item => (
                            <li key={item.material.id}>{item.material.name} – {item.material.zone}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Slot */}
                  <div style={s.fieldGroup}>
                    <label style={s.label}>
                      <Calendar size={13} color="#6b7280" strokeWidth={2.5} />
                      {deliveryMode === "delivery" ? "Delivery Slot" : "Pickup Slot"}
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      style={{ ...s.select, color: selectedSlot ? "#111827" : "#9ca3af" }}
                    >
                      <option value="" disabled>Select a preferred slot...</option>
                      {deliverySlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={s.btnRow}>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    style={isStep1Valid ? s.btnPrimary : s.btnPrimaryDisabled}
                  >
                    Next →
                  </button>
                </div>

                <p style={s.note}>
                  Note: Collection sites are pickup points only. Inventory & pricing are managed at Transfer Stations.
                </p>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>
                      <CreditCard size={13} color="#6b7280" strokeWidth={2.5} />
                      Payment Method
                    </label>
                    <div style={s.radioGroup}>
                      {paymentMethods.map(pm => (
                        <label
                          key={pm.id}
                          style={selectedPayment === pm.id ? s.radioLabelSelected : s.radioLabel}
                          onClick={() => setSelectedPayment(pm.id)}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={pm.id}
                            checked={selectedPayment === pm.id}
                            onChange={() => setSelectedPayment(pm.id)}
                            style={{ accentColor: "#1e2d40", width: "15px", height: "15px" }}
                          />
                          {pm.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={s.btnRowSplit}>
                  <button onClick={() => setStep(1)} style={s.btnSecondary}>← Back</button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedPayment}
                    style={selectedPayment ? s.btnPrimary : s.btnPrimaryDisabled}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <table style={s.reviewTable}>
                    <tbody>
                      <tr>
                        <td style={s.reviewTdLabel}>Service</td>
                        <td style={s.reviewTdValue}>{deliveryMode === "delivery" ? "GREENIE Delivery" : "Self Pickup"}</td>
                      </tr>
                      <tr>
                        <td style={s.reviewTdLabel}>Slot</td>
                        <td style={s.reviewTdValue}>{selectedSlot}</td>
                      </tr>
                      <tr>
                        <td style={s.reviewTdLabel}>Payment</td>
                        <td style={s.reviewTdValue}>{paymentMethods.find(p => p.id === selectedPayment)?.label}</td>
                      </tr>
                      <tr>
                        <td style={{ ...s.reviewTdLabel, borderBottom: "none" }}>Items</td>
                        <td style={{ ...s.reviewTdValue, borderBottom: "none" }}>
                          {items.map(item => (
                            <div key={item.material.id} style={{ marginBottom: "2px" }}>
                              {item.quantity} {item.material.unit}s × {item.material.name}
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={s.btnRowSplit}>
                  <button onClick={() => setStep(2)} style={s.btnSecondary}>← Back</button>
                  <button
                    onClick={async () => {
                      setPlacing(true);
                      const inserts = items.map((item) => ({
                        buyer_name:    "Portal Buyer",
                        material_name: item.material.name,
                        quantity:      item.quantity,
                        total_amount:  Math.round(item.material.pricePerUnit * item.quantity),
                        status:        "pending",
                      }));
                      const { error } = await supabase.from("marketplace_orders").insert(inserts);
                      if (error) { setPlacing(false); return; }
                      clearCart();
                      router.push("/checkout/confirmation");
                    }}
                    disabled={placing}
                    style={placing ? s.btnPrimaryDisabled : s.btnPrimary}
                  >
                    {placing ? "Processing..." : "Submit Order"}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: Quote Card ── */}
          <div style={s.quoteCard}>
            <div style={s.quoteTitle}>
              <Receipt size={16} color="#111827" strokeWidth={2.5} />
              Upfront Price Quote
            </div>
            <p style={s.quoteSubtitle}>Binding quote · GST included</p>

            <div style={s.quoteRow}>
              <span style={{ color: "#6b7280" }}>Material Subtotal</span>
              <span style={{ fontWeight: 700 }}>{formatCurrency(subtotal)}</span>
            </div>
            {pickupDiscount > 0 && (
              <div style={s.quoteRow}>
                <span style={{ color: "#6b7280" }}>Pickup Discount</span>
                <span style={{ fontWeight: 700, color: "#16a34a" }}>− {formatCurrency(pickupDiscount)}</span>
              </div>
            )}
            <div style={s.quoteRow}>
              <span style={{ color: "#6b7280" }}>Logistics Fee</span>
              <span style={{ fontWeight: 700 }}>{logisticsFee > 0 ? formatCurrency(logisticsFee) : "—"}</span>
            </div>
            <div style={s.quoteRow}>
              <span style={{ color: "#6b7280" }}>GST @ 18%</span>
              <span style={{ fontWeight: 700 }}>{formatCurrency(gst)}</span>
            </div>

            <div style={s.quoteTotalRow}>
              <span style={{ fontSize: "15px", fontWeight: 900, color: "#111827" }}>Total</span>
              <span style={{ fontSize: "15px", fontWeight: 900, color: "#111827" }}>{formatCurrency(total)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
