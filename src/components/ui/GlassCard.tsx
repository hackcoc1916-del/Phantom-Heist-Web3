import { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className, glow = false }: GlassCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "glass-panel rounded-xl p-6 relative overflow-hidden",
          glow && "animate-glow"
        ),
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none" />
      )}
    </div>
  );
}
