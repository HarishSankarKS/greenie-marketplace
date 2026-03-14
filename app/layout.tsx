import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "GREENIE Marketplace — Buy Recycled C&D Materials",
  description:
    "Purchase AI-sorted, grade-verified construction & demolition materials directly from GREENIE's Transfer Stations in Coimbatore. Concrete, Steel, Wood, Plastic, Glass.",
  keywords: "recycled materials, C&D waste, concrete aggregate, recycled steel, Coimbatore, GREENIE",
  openGraph: {
    title: "GREENIE Marketplace",
    description: "Buy verified recycled C&D materials from Coimbatore's Transfer Stations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
