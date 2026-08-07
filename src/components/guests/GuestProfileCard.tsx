import { MessageCircle } from "lucide-react";

export interface GuestProfileCardProps {
  name: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
}

export function GuestProfileCard({ name, phone, email, notes }: GuestProfileCardProps) {
  const whatsappHref = phone ? `https://wa.me/${phone.replace(/[^\d]/g, "")}` : null;

  return (
    <div className="rounded-2xl border border-ink-navy/10 bg-surface-white p-5 shadow-card">
      <h1 className="font-serif text-3xl tracking-tight text-ink-navy">{name}</h1>
      <div className="mt-2 flex flex-col gap-1 font-mono text-sm text-charcoal/70">
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}
      </div>
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-olive/15 px-3 py-2 text-sm font-medium text-olive shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
        >
          <MessageCircle size={16} />
          Message on WhatsApp
        </a>
      )}
      {notes && <p className="mt-3 text-sm text-charcoal/70">{notes}</p>}
    </div>
  );
}
