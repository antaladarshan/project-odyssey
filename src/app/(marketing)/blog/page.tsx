import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/config/posts";

export const metadata: Metadata = {
  title: "PG & Hostel Guides for Ahmedabad",
  description:
    "Guides to finding a PG or hostel in Ahmedabad: best areas, safety checklists and tips for interns, students and new joiners.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">Guides</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ice">PG &amp; Hostel Guides for Ahmedabad</h1>
        </header>
        <ul className="flex flex-col gap-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}/`}
                className="block rounded-xl bg-ink border border-white/8 hover:border-odyssey-blue p-5 transition-colors"
              >
                <h2 className="font-display font-semibold text-xl text-ice">{p.title}</h2>
                <p className="mt-2 text-sm text-sky-tint">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
