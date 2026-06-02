"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoPlaceholder from "./LogoPlaceholder";
import ThemeToggle from "./ThemeToggle";
import { labels } from "@/config/labels";
import { buildWhatsAppLink } from "@/lib/requestToBook";

const navLinks = [
  { label: labels.nav.stay, href: "/#rooms" },
  { label: labels.nav.story, href: "/about" },
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

  const bookHref = buildWhatsAppLink({});

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-abyss/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label="Project Odyssey home">
            <LogoPlaceholder size="sm" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-sky-tint">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-odyssey-blue transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/account"
              className="text-sm text-sky-tint hover:text-odyssey-blue transition-colors px-3 py-1.5"
            >
              {labels.nav.account}
            </Link>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-odyssey-blue hover:bg-azure-deep text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              {labels.nav.book}
            </a>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 text-sky-tint"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden bg-ink/95 backdrop-blur-md border-t border-white/5 px-4 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sky-tint hover:text-odyssey-blue text-base font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="text-sky-tint hover:text-odyssey-blue text-base font-medium transition-colors"
            >
              {labels.nav.account}
            </Link>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-odyssey-blue hover:bg-azure-deep text-white text-center font-semibold py-3 rounded-full transition-colors"
            >
              {labels.nav.book}
            </a>
          </div>
        )}
      </header>

      {/* Mobile sticky bottom Book bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 bg-abyss/95 backdrop-blur-md border-t border-white/10">
        <a
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-odyssey-blue hover:bg-azure-deep text-white text-center font-semibold py-3.5 rounded-2xl transition-colors text-base"
        >
          {labels.hero.cta}
        </a>
      </div>
    </>
  );
}
