/**
 * Shared Button component
 */
import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary:
        "bg-brand text-white hover:bg-brand-dark focus:ring-brand shadow-sm",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400",
      ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
