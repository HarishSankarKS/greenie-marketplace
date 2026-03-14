import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";

export default function ConfirmationPage() {
  const orderId = "ORD-20260314-004";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-1 text-sm">Your order has been confirmed.</p>
        <p className="font-mono text-sm text-green-700 font-semibold mb-8">{orderId}</p>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-left mb-6 space-y-3">
          {[
            { icon: "📱", text: "SMS confirmation sent to your phone" },
            { icon: "📧", text: "GST invoice will be emailed once payment clears" },
            { icon: "🚛", text: "Live GPS tracking link will be sent when dispatched" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
              <span>{icon}</span> {text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/portal/orders" className="flex items-center justify-center gap-2 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-colors">
            <Package className="w-4 h-4" /> Track Your Order
          </Link>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Download GST Invoice
          </button>
          <Link href="/catalog" className="text-sm text-gray-400 hover:text-green-700 transition-colors py-2">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}
