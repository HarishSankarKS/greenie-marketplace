import { orders } from "@/lib/mock/orders";
import ReviewClient from "./ReviewClient";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReviewClient id={id} />;
}
