import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind Project Odyssey — a backpacker stay rooted in the spirit of the journey.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">Our Story</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-ice leading-tight">
          The Odyssey is the journey,{" "}
          <span className="gradient-text">not the destination.</span>
        </h1>
        <div className="flex flex-col gap-4 text-sky-tint leading-relaxed">
          <p>
            Project Odyssey started as a flat and became a philosophy. We believe that where you stay
            shapes how you travel. A clean bed, a real kitchen, a door that opens onto the city — that's
            the base you deserve.
          </p>
          <p>
            Named after Homer's greatest epic, Project Odyssey is a reminder that the journey home is
            always worth it. Whether you're here for a week or a night, you're part of this story.
          </p>
          <p className="text-sky-tint/50 text-sm italic">
            Full story coming soon — real copy to be added by Darshan.
          </p>
        </div>
        <Link href="/" className="text-odyssey-blue hover:text-mascot-glow font-medium transition-colors text-sm">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
