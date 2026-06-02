import Link from "next/link";
import { Share2, Mail, MessageCircle } from "lucide-react";
import LogoPlaceholder from "./LogoPlaceholder";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/requestToBook";

export default function Footer() {
  const bookHref = buildWhatsAppLink({});

  return (
    <footer className="bg-ink border-t border-white/5 text-sky-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <LogoPlaceholder size="md" />
          <p className="text-sm leading-relaxed max-w-xs opacity-80">
            {siteConfig.description}
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full border border-white/10 hover:border-odyssey-blue hover:text-odyssey-blue transition-colors"
            >
              <Share2 size={16} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="p-2 rounded-full border border-white/10 hover:border-odyssey-blue hover:text-odyssey-blue transition-colors"
            >
              <Mail size={16} />
            </a>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-full border border-white/10 hover:border-odyssey-blue hover:text-odyssey-blue transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-odyssey-blue">
            Explore
          </h4>
          {[
            { label: "The Stay", href: "/#rooms" },
            { label: "Amenities", href: "/#amenities" },
            { label: "Gallery", href: "/#gallery" },
            { label: "Our Story", href: "/about" },
            { label: "FAQ", href: "/faq" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm hover:text-odyssey-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Contact + Book */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-odyssey-blue">
            Book Direct
          </h4>
          <p className="text-sm opacity-80">
            {siteConfig.address.city}, {siteConfig.address.state}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm hover:text-odyssey-blue transition-colors"
          >
            {siteConfig.email}
          </a>
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 bg-odyssey-blue/20 hover:bg-odyssey-blue text-odyssey-blue hover:text-white border border-odyssey-blue/40 text-sm font-semibold px-4 py-2.5 rounded-full transition-all"
          >
            Set Sail on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 sm:px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-50">
        <span>© {new Date().getFullYear()} Project Odyssey. All rights reserved.</span>
        <span>Made with care in Pune, India.</span>
      </div>
    </footer>
  );
}
