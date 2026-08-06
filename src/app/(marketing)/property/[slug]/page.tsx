import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties } from "@/config/property";
import PropertyDetail from "@/components/booking/PropertyDetail";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prop = properties.find((p) => p.slug === slug);
  if (!prop) return {};
  return {
    title: `${prop.name} ${prop.city} — Book Direct`,
    description: prop.description,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const prop = properties.find((p) => p.slug === slug);
  if (!prop) notFound();

  return <PropertyDetail property={prop} />;
}
