import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Order } from "@/lib/mock/orders";

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

export function generateInvoicePDF(order: Order): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;

  // ── HEADER BAND ── deep green
  doc.setFillColor(27, 94, 32);
  doc.rect(0, 0, pageW, 40, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("GREENIE", margin, 17);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 230, 200);
  doc.text("Fleet & Waste Intelligence", margin, 24);

  // TAX INVOICE label (right side)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(249, 168, 37); // amber
  doc.text("TAX INVOICE", pageW - margin, 18, { align: "right" });

  // Invoice meta (right)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 230, 200);

  const invNo = `GRN-INV-${order.id.replace("ORD-", "")}`;
  const invoiceDate = order.createdAt.split("T")[0];
  const dueDate = new Date(new Date(order.createdAt).getTime() + 30 * 86400000).toISOString().split("T")[0];

  doc.text(`Invoice No: ${invNo}`, pageW - margin, 25, { align: "right" });
  doc.text(`Date: ${invoiceDate}`, pageW - margin, 30, { align: "right" });
  doc.text(`Due: ${dueDate}`, pageW - margin, 35, { align: "right" });

  // ── SELLER / BUYER SECTION ──
  const col1X = margin;
  const col2X = pageW / 2 + 4;
  let y = 52;

  // Labels
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(27, 94, 32);
  doc.text("SELLER", col1X, y);
  doc.text("BILL TO", col2X, y);
  y += 4;

  // Dividers
  doc.setDrawColor(27, 94, 32);
  doc.setLineWidth(0.4);
  doc.line(col1X, y, col1X + 75, y);
  doc.line(col2X, y, col2X + 75, y);
  y += 5;

  // Seller info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text("Greenie Fleet Intelligence Pvt Ltd", col1X, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text("No. 12, Avinashi Road, Peelamedu,", col1X, y + 5);
  doc.text("Coimbatore – 641 004, Tamil Nadu", col1X, y + 10);
  doc.text("GSTIN: 33AABCG1234A1Z5", col1X, y + 15);
  doc.text("Email: billing@greenie.ac.in", col1X, y + 20);

  // Buyer info
  const buyerName = "Rajesh Kumar"; // mock buyer
  const buyerZone = order.items[0]?.zone || "North";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text(buyerName, col2X, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`${buyerZone} Zone, Coimbatore, Tamil Nadu`, col2X, y + 5);
  if (order.deliveryAddress) {
    const addr = doc.splitTextToSize(order.deliveryAddress, 80);
    doc.text(addr, col2X, y + 10);
  }
  doc.text("GSTIN: As provided by buyer", col2X, y + 20);

  y += 32;

  // ── ORDER REF BAND ──
  doc.setFillColor(232, 245, 233);
  doc.rect(margin, y, pageW - margin * 2, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text(`Order Reference: ${order.id}  ·  Station: ${buyerZone} Transfer Station  ·  Delivery: ${order.deliveryMode === "delivery" ? "Home Delivery" : "Self Pickup"}`, margin + 3, y + 5.5);
  y += 14;

  // ── LINE ITEMS TABLE ──
  const hsnMap: Record<string, string> = {
    Concrete: "2517",
    Steel: "7204",
    Wood: "4401",
    Plastic: "3915",
    Glass: "7001",
  };

  const tableBody = order.items.map((item, idx) => [
    String(idx + 1).padStart(2, "0"),
    `${item.materialName}\n(Grade: ${item.grade})`,
    hsnMap[item.zone] || "9999",
    `${item.quantity} ${item.unit}`,
    `₹${formatINR(item.unitPrice)}`,
    `₹${formatINR(item.subtotal)}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["S.No", "Description of Goods", "HSN Code", "Qty", "Unit Rate (₹)", "Amount (₹)"]],
    body: tableBody,
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: {
      fillColor: [27, 94, 32],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 },
      1: { cellWidth: 70 },
      2: { halign: "center", cellWidth: 22 },
      3: { halign: "center", cellWidth: 22 },
      4: { halign: "right", cellWidth: 28 },
      5: { halign: "right", cellWidth: 28 },
    },
    alternateRowStyles: { fillColor: [248, 253, 248] },
    theme: "grid",
  });

  // @ts-ignore
  const afterTable = (doc as any).lastAutoTable.finalY + 6;

  // ── TOTALS BOX ──
  const totalsX = pageW - margin - 90;
  const totalsW = 90;
  let ty = afterTable;

  const drawRow = (label: string, value: string, bold = false, highlight = false) => {
    if (highlight) {
      doc.setFillColor(27, 94, 32);
      doc.rect(totalsX, ty - 4, totalsW, 9, "F");
      doc.setTextColor(255, 255, 255);
    } else {
      doc.setTextColor(80, 80, 80);
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(9);
    doc.text(label, totalsX + 3, ty + 1);
    doc.text(value, totalsX + totalsW - 3, ty + 1, { align: "right" });
    if (!highlight) {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(totalsX, ty + 3, totalsX + totalsW, ty + 3);
    }
    ty += 9;
  };

  drawRow("Sub-total", `₹${formatINR(order.subtotal)}`);
  if (order.logisticsFee > 0) drawRow("Logistics Fee", `₹${formatINR(order.logisticsFee)}`);
  drawRow("CGST @ 9%", `₹${formatINR(order.gst / 2)}`);
  drawRow("SGST @ 9%", `₹${formatINR(order.gst / 2)}`);
  drawRow("GRAND TOTAL", `₹${formatINR(order.total)}`, true, true);

  // ── TERMS ──
  ty = Math.max(ty + 8, afterTable + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(27, 94, 32);
  doc.text("Terms & Conditions", margin, ty);
  ty += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  const terms = [
    "1. Payment is due within 30 days of invoice date.",
    "2. Goods once sold are not returnable unless under dispute.",
    "3. Subject to Coimbatore jurisdiction.",
    "4. This is a computer-generated invoice and does not require a physical signature.",
  ];
  terms.forEach((t) => {
    doc.text(t, margin, ty);
    ty += 5;
  });

  // ── AUTHORISED SIGNATORY ──
  const sigX = pageW - margin - 60;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 30, 30);
  doc.text("Authorised Signatory", sigX, ty);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text("Greenie Fleet Intelligence Pvt Ltd", sigX, ty + 5);

  // ── FOOTER ──
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(27, 94, 32);
  doc.rect(0, pageH - 14, pageW, 14, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 220, 180);
  doc.text(
    "Greenie Fleet Intelligence Pvt Ltd  ·  billing@greenie.ac.in  ·  www.greenie.ac.in",
    pageW / 2,
    pageH - 6,
    { align: "center" }
  );

  // Save
  doc.save(`${invNo}.pdf`);
}
