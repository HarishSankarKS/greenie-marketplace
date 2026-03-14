import { orders } from "@/lib/mock/orders";
import OrderDetailClient from "./OrderDetailClient";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailClient id={id} />;
}
