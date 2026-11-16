"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const whatsappHref = buildWhatsAppLink({});

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : "border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" aria-label="Project Odyssey home" onClick={() => setOpen(false)}>
            <LogoPlaceholder size="sm" />
          </Link>

          <ul className="hidden md:flex items-center gap-7 text-sm font-semibold text-po-ink">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-po-pink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-po-ink border border-gray-200 hover:border-po-pink hover:text-po-pink px-4 py-2 rounded-full transition-colors"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
            <Link href="/account" className="text-sm font-semibold text-po-ink hover:text-po-pink transition-colors px-3 py-2">
              {labels.nav.account}
            </Link>
            <Link
              href="/property/project-odyssey-ahmedabad/"
              className="bg-po-pink hover:bg-po-pink-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors"
            >
              {labels.nav.book}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-2 text-po-ink hover:text-po-pink transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            className="md:hidden bg-white border-t border-gray-100 px-5 py-5 flex flex-col gap-3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-po-ink hover:text-po-pink text-base font-semibold transition-colors py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="text-po-ink hover:text-po-pink text-base font-semibold transition-colors py-1"
            >
              {labels.nav.account}
            </Link>
            <Link
              href="/property/project-odyssey-ahmedabad/"
              className="mt-2 bg-po-pink hover:bg-po-pink-dark text-white text-center font-bold py-3.5 rounded-2xl transition-colors text-base block"
              onClick={() => setOpen(false)}
            >
              {labels.nav.book}
            </Link>
          </div>
        )}
      </header>

      {/* Mobile sticky bottom Book bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 safe-area-inset-bottom">
        <Link
          href="/property/project-odyssey-ahmedabad/"
          className="flex items-center justify-center gap-2 w-full bg-po-pink hover:bg-po-pink-dark text-white text-center font-bold py-3.5 rounded-2xl transition-colors text-[15px] tracking-wide"
        >
          {labels.hero.cta}
        </Link>
      </div>
    </>
  );
}
