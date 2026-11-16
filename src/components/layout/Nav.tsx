"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: labels.nav.account, href: "/account" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 60);
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

  // Home: transparent, floating over the hero photo (white text) until the hero is
  // scrolled past. Every other page has no photo behind the nav, so it is solid white.
  const overHero = isHome && !pastHero && !open;
  // Scrolled (or menu open): frosted glass instead of a flat white bar.
  const glass =
    "bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.06)]";
  const headerCls = isHome
    ? `fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        overHero ? "bg-transparent" : glass
      }`
    : `sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        pastHero || open ? glass : "bg-white border-b border-gray-100"
      }`;

  const linkCls = overHero
    ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] hover:text-po-yellow"
    : "text-po-ink hover:text-po-pink";

  return (
    <>
      <header className={headerCls}>
        <nav className="mx-auto h-16 lg:h-[72px] px-4 sm:px-6 lg:px-[3.6vw] flex items-center justify-between gap-4">
          <Link href="/" aria-label="Project Odyssey home" onClick={() => setOpen(false)} className="shrink-0">
            <LogoPlaceholder size="nav" />
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-[15px] font-semibold">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`transition-colors ${linkCls}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold transition-colors ${
                overHero
                  ? "bg-white text-po-ink hover:bg-po-yellow"
                  : "bg-white text-po-ink border border-gray-200 hover:border-po-pink hover:text-po-pink"
              }`}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
            <Link
              href="/property/project-odyssey-ahmedabad/"
              className="inline-flex items-center h-10 px-5 rounded-full bg-po-pink hover:bg-po-pink-dark text-white text-sm font-bold transition-colors"
            >
              {labels.nav.book}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`p-2 transition-colors ${overHero ? "text-white" : "text-po-ink"}`}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            className="lg:hidden border-t border-white/40 px-5 py-5 flex flex-col gap-3 shadow-lg"
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 safe-area-inset-bottom">
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
