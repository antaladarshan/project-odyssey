import Link from "next/link";
import Image from "next/image";
import { Share2, Mail, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { landingPages } from "@/config/landing";
import { buildWhatsAppLink } from "@/lib/requestToBook";

const linkCls = "text-sm text-white/80 hover:text-po-yellow transition-colors";
const headCls = "text-xs font-bold tracking-widest uppercase text-po-yellow";
const iconBtn =
  "p-2.5 rounded-full bg-white/10 hover:bg-po-yellow hover:text-po-ink text-white transition-colors";

export default function Footer() {
  const bookHref = buildWhatsAppLink({});

  return (
    <footer className="bg-po-indigo text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand + follow */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/brand/mascot.png" alt="Project Odyssey" width={38} height={38} className="object-contain" />
            <span className="font-display font-extrabold text-lg tracking-tight">Project Odyssey</span>
          </div>
          <p className="text-sm leading-relaxed text-white/75">{siteConfig.description}</p>
          <h4 className={`${headCls} mt-2`}>Follow us</h4>
          <div className="flex gap-3">
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconBtn}>
              <Share2 size={16} />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email" className={iconBtn}>
              <Mail size={16} />
            </a>
            <a href={bookHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconBtn}>
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Important links */}
        <div className="flex flex-col gap-3">
          <h4 className={headCls}>Important links</h4>
          {[
            { label: "Properties", href: "/properties/" },
            { label: "The Stay", href: "/property/project-odyssey-ahmedabad/" },
            { label: "Our Story", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Host an Event", href: "/host-an-event/" },
            { label: "Partner with us", href: "/partner-with-us/" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Local SEO links */}
        <div className="flex flex-col gap-3">
          <h4 className={headCls}>PG &amp; Hostel in Ahmedabad</h4>
          {landingPages.map((p) => (
            <Link key={p.slug} href={`/pg/${p.slug}/`} className={linkCls}>
              {p.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className={headCls}>Contact</h4>
          <p className="text-sm text-white/80 flex gap-2">
            <MapPin size={16} className="shrink-0 mt-0.5 text-po-yellow" />
            <span>
              {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.pincode}
            </span>
          </p>
          <a href={`mailto:${siteConfig.email}`} className={linkCls}>
            {siteConfig.email}
          </a>
          <Link
            href="/property/project-odyssey-ahmedabad/"
            className="mt-2 inline-flex items-center justify-center bg-po-pink hover:bg-po-pink-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors w-fit"
          >
            Book your bed →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="px-4 sm:px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Project Odyssey. All rights reserved.</span>
          <span>Made with care in Ahmedabad, India.</span>
        </div>
      </div>
    </footer>
  );
}
