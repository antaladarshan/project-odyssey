"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoPlaceholder from "./LogoPlaceholder";
import { labels } from "@/config/labels";
import { buildWhatsAppLink } from "@/lib/requestToBook";

const navLinks = [
  { label: "Properties", href: "/properties/" },
  { label: "The Stay", href: "/property/project-odyssey-ahmedabad/" },
  { label: "Story", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / outside click
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const bookHref = buildWhatsAppLink({});

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-abyss/95 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" aria-label="Project Odyssey home" onClick={() => setOpen(false)}>
            <LogoPlaceholder size="sm" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-sky-tint/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-odyssey-blue hover:text-opacity-100 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/account" className="text-sm text-sky-tint hover:text-odyssey-blue transition-colors px-3 py-1.5">
              {labels.nav.account}
            </Link>
            <Link
              href="/property/project-odyssey-ahmedabad/"
              className="bg-odyssey-blue hover:bg-azure-deep text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              {labels.nav.book}
            </Link>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-2 text-sky-tint hover:text-odyssey-blue transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden bg-ink/98 backdrop-blur-md border-t border-white/8 px-5 py-5 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sky-tint hover:text-odyssey-blue text-base font-medium transition-colors py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="text-sky-tint hover:text-odyssey-blue text-base font-medium transition-colors py-1"
            >
              {labels.nav.account}
            </Link>
            <Link
              href="/property/project-odyssey-ahmedabad/"
              className="mt-2 bg-odyssey-blue hover:bg-azure-deep text-white text-center font-semibold py-3.5 rounded-2xl transition-colors text-base block"
              onClick={() => setOpen(false)}
            >
              {labels.nav.book}
            </Link>
          </div>
        )}
      </header>

      {/* Mobile sticky bottom Book bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-abyss/95 backdrop-blur-md border-t border-white/8 safe-area-inset-bottom">
        <Link
          href="/property/project-odyssey-ahmedabad/"
          className="flex items-center justify-center gap-2 w-full bg-odyssey-blue hover:bg-azure-deep text-white text-center font-semibold py-3.5 rounded-2xl transition-colors text-[15px] tracking-wide"
        >
          {labels.hero.cta}
        </Link>
      </div>
    </>
  );
}
