import { getAllMaterialIds } from "@/lib/mock/materials";
import MaterialDetailClient from "./MaterialDetailClient";

export function generateStaticParams() {
  return getAllMaterialIds().map((id) => ({ id }));
}

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MaterialDetailClient id={id} />;
}
