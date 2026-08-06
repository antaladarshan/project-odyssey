import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className = "", ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-ink-navy/15 bg-surface-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-bronze focus:shadow-soft ${className}`}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <label htmlFor={id} className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-navy">{label}</span>
        {input}
      </label>
    );
  }
);
Input.displayName = "Input";
