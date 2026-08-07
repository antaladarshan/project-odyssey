import { type TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, className = "", ...props }, ref) => {
    const textarea = (
      <textarea
        ref={ref}
        id={id}
        rows={3}
        className={`w-full rounded-lg border border-ink-navy/15 bg-surface-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-bronze focus:shadow-soft ${className}`}
        {...props}
      />
    );

    if (!label) return textarea;

    return (
      <label htmlFor={id} className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-navy">{label}</span>
        {textarea}
      </label>
    );
  }
);
Textarea.displayName = "Textarea";
