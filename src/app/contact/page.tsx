import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/requestToBook";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Project Odyssey. Book via WhatsApp or email.",
};

export default function ContactPage() {
  const waHref = buildWhatsAppLink({});
  return (
    <div className="min-h-screen bg-abyss pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">Get in Touch</p>
        <h1 className="font-display font-bold text-4xl text-ice">Contact Us</h1>
        <div className="flex flex-col gap-4 text-sky-tint">
          <a href={waHref} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-ink border border-white/8 hover:border-odyssey-blue transition-colors">
            <span className="font-medium text-ice">WhatsApp</span>
            <span className="text-sm opacity-60">{siteConfig.whatsapp}</span>
          </a>
          <a href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 p-4 rounded-xl bg-ink border border-white/8 hover:border-odyssey-blue transition-colors">
            <span className="font-medium text-ice">Email</span>
            <span className="text-sm opacity-60">{siteConfig.email}</span>
          </a>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-ink border border-white/8">
            <span className="font-medium text-ice">Location</span>
            <span className="text-sm opacity-60">{siteConfig.address.city}, {siteConfig.address.state}, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
