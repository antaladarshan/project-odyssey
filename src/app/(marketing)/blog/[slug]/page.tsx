import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/config/posts";
import { getLandingPage } from "@/config/landing";
import { siteConfig } from "@/config/site";
import { absoluteUrl, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    robots: post.published ? undefined : { index: false, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const landing = getLandingPage(post.landing);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` },
    ]),
  ];

  return (
    <article className="min-h-screen bg-abyss pt-24 pb-24 px-4 sm:px-6">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <Link href="/blog/" className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
            ← Guides
          </Link>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ice">{post.title}</h1>
          <p className="text-sky-tint text-lg leading-relaxed">{post.intro}</p>
        </header>

        {post.sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="font-display font-semibold text-2xl text-ice">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sky-tint leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}

        {landing && (
          <aside className="rounded-xl bg-ink border border-white/8 p-5">
            <p className="text-ice font-medium">Looking for a stay in Satellite, Ahmedabad?</p>
            <Link href={`/pg/${landing.slug}/`} className="mt-2 inline-block text-odyssey-blue hover:underline">
              {landing.label} →
            </Link>
          </aside>
        )}
      </div>
    </article>
  );
}
