import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "accent" | "danger" | "success";
}

export default function GlowingButton({
  children,
  variant = "primary",
  className,
  ...props
}: GlowingButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg group overflow-hidden";

  const variantClasses = {
    primary: "bg-primary/20 text-primary-foreground hover:bg-primary/40 border border-primary/50",
    accent: "bg-accent/20 text-accent-foreground hover:bg-accent/40 border border-accent/50",
    danger: "bg-danger/20 text-danger-foreground hover:bg-danger/40 border border-danger/50",
    success: "bg-success/20 text-success-foreground hover:bg-success/40 border border-success/50",
  };

  const glowClasses = {
    primary: "group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]",
    accent: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    danger: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    success: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  };

  return (
    <button
      className={twMerge(clsx(baseClasses, variantClasses[variant], glowClasses[variant]), className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
    </button>
  );
}
