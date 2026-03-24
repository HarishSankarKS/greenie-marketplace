import Link from "next/link";
import { CheckCircle2, ChevronLeft, PackageCheck, DownloadCloud } from "lucide-react";

export default function ConfirmationPage() {
  const orderId = "ORD-20260314-004";

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      fontFamily: "'Inter', system-ui, sans-serif",
      paddingTop: "64px",
      paddingBottom: "96px",
      color: "#111827",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        padding: "0 24px",
      }}>

        {/* White Master Card */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}>

          {/* ── Success Header ── */}
          <div style={{
            padding: "40px 32px 32px",
            textAlign: "center",
            borderBottom: "1px solid #f3f4f6",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#1e2d40",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 4px 12px rgba(30,45,64,0.2)",
            }}>
              <CheckCircle2 size={28} color="#fff" strokeWidth={2.5} />
            </div>

            <h1 style={{
              fontSize: "22px",
              fontWeight: 900,
              color: "#111827",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}>
              Order Confirmed
            </h1>
            <p style={{
              fontSize: "13px",
              color: "#6b7280",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto 20px",
            }}>
              Your collection order has been placed. Our operations team will allocate a vehicle and send you tracking details.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              padding: "8px 16px",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Tracking ID
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                {orderId}
              </span>
            </div>
          </div>

          {/* ── Next Steps ── */}
          <div style={{ padding: "32px" }}>
            <h3 style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "24px",
            }}>
              What Happens Next
            </h3>

            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute",
                left: "19px",
                top: "24px",
                bottom: "24px",
                width: "1px",
                backgroundColor: "#e5e7eb",
              }} />

              {[
                {
                  step: "1",
                  title: "Dispatch Assignment",
                  desc: "Our system checks nearest active fleet unit and calculates ETA.",
                  active: true,
                },
                {
                  step: "2",
                  title: "Live GPS & SMS Alert",
                  desc: "Driver details and a live tracking link will be sent to your number.",
                  active: false,
                },
                {
                  step: "3",
                  title: "GST Invoice Generation",
                  desc: "A tax-compliant invoice will be emailed once payment clears.",
                  active: false,
                },
              ].map(({ step, title, desc, active }) => (
                <div key={step} style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "24px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: active ? "#1e2d40" : "#fff",
                    border: active ? "2px solid #1e2d40" : "2px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                    position: "relative",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: active ? "#fff" : "#9ca3af",
                  }}>
                    {step}
                  </div>

                  <div style={{ paddingTop: "6px" }}>
                    <h4 style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: active ? "#111827" : "#6b7280",
                      marginBottom: "3px",
                    }}>
                      {title}
                    </h4>
                    <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: "1.5" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Actions Footer ── */}
          <div style={{
            borderTop: "1px solid #f3f4f6",
            backgroundColor: "#fafafa",
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            <Link
              href="/portal/orders"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "11px 24px",
                backgroundColor: "#1e2d40",
                color: "#fff",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              <PackageCheck size={16} />
              Access Client Portal
            </Link>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 16px",
                backgroundColor: "#fff",
                color: "#374151",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}>
                <DownloadCloud size={14} color="#6b7280" />
                Download Receipt
              </button>

              <Link
                href="/catalog"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                <ChevronLeft size={14} color="#6b7280" />
                Back to Catalog
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
