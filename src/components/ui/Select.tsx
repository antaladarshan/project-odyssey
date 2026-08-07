import { type SelectHTMLAttributes, forwardRef } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, className = "", children, ...props }, ref) => {
    const select = (
      <select
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-ink-navy/15 bg-surface-white px-3 py-2.5 text-sm text-charcoal transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-bronze focus:shadow-soft ${className}`}
        {...props}
      >
        {children}
      </select>
    );

    if (!label) return select;

    return (
      <label htmlFor={id} className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-navy">{label}</span>
        {select}
      </label>
    );
  }
);
Select.displayName = "Select";
