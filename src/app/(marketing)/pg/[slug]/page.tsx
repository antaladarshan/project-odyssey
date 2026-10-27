import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { landingPages, getLandingPage } from "@/config/landing";
import { siteConfig } from "@/config/site";
import { property } from "@/config/property";
import { buildWhatsAppLink } from "@/lib/requestToBook";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: `/pg/${page.slug}/` },
    // Placeholder pages stay out of search until the owner confirms the details.
    robots: page.ready ? undefined : { index: false, follow: true },
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const whatsappHref = buildWhatsAppLink({ extraNote: `I'm interested in: ${page.label}` });
  const related = page.related
    .map((s) => getLandingPage(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.label, path: `/pg/${page.slug}/` },
    ]),
    faqSchema(page.faqs),
  ];

  return (
    <div className="min-h-screen bg-abyss pt-24 pb-24 px-4 sm:px-6">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">{page.eyebrow}</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ice">{page.h1}</h1>
          <p className="text-sky-tint text-lg leading-relaxed">{page.intro}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-odyssey-blue text-white text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Check availability on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.whatsapp}`}
              className="inline-flex items-center gap-2 border border-odyssey-blue/40 text-odyssey-blue text-sm font-semibold px-5 py-3 rounded-full hover:bg-odyssey-blue/10 transition-colors"
            >
              Call 85116 71066
            </a>
            <Link
              href="/book/"
              className="inline-flex items-center gap-2 border border-odyssey-blue/40 text-odyssey-blue text-sm font-semibold px-5 py-3 rounded-full hover:bg-odyssey-blue/10 transition-colors"
            >
              Book online
            </Link>
          </div>
        </header>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {page.highlights.map((h) => (
            <li key={h} className="rounded-xl bg-ink border border-white/8 px-4 py-3 text-sm text-ice">
              {h}
            </li>
          ))}
        </ul>

        {page.sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="font-display font-semibold text-2xl text-ice">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sky-tint leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="flex flex-col gap-3">
          <h2 className="font-display font-semibold text-2xl text-ice">Sharing options and rent</h2>
          {page.pricing.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-white/8">
              <table className="w-full text-sm text-left">
                <thead className="bg-ink text-ice">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Room type</th>
                    <th className="px-4 py-3 font-semibold">Rent</th>
                    <th className="px-4 py-3 font-semibold">Includes</th>
                  </tr>
                </thead>
                <tbody className="text-sky-tint">
                  {page.pricing.map((row) => (
                    <tr key={row.type} className="border-t border-white/8">
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.rent}</td>
                      <td className="px-4 py-3">{row.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <p className="text-sky-tint leading-relaxed">
            Rent is not a fixed monthly figure: the per-bed price drops automatically the longer you stay, and
            extra discounts can apply. Message or call us for the exact price for your dates.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display font-semibold text-2xl text-ice">Frequently asked questions</h2>
          <div className="flex flex-col gap-3">
            {page.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl bg-ink border border-white/8 px-4 py-3">
                <summary className="cursor-pointer text-ice font-medium">{f.q}</summary>
                <p className="pt-2 text-sky-tint leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display font-semibold text-2xl text-ice">Find us</h2>
          <p className="text-sky-tint">
            {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
            {siteConfig.address.pincode}
          </p>
          {property.mapsUrl && (
            <a
              href={property.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-odyssey-blue text-sm font-semibold hover:underline"
            >
              <MapPin size={16} /> Open in Google Maps
            </a>
          )}
        </section>

        {related.length > 0 && (
          <nav aria-label="Related pages" className="flex flex-col gap-3">
            <h2 className="font-display font-semibold text-xl text-ice">More stays in Ahmedabad</h2>
            <ul className="flex flex-col gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/pg/${r.slug}/`} className="text-odyssey-blue hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
