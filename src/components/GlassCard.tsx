"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: "primary" | "secondary" | "success" | "warning" | "error";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient,
  onClick,
}: GlassCardProps) {
  const gradientStyles = {
    primary: "hover:border-indigo-500/30 hover:shadow-indigo-500/20",
    secondary: "hover:border-cyan-500/30 hover:shadow-cyan-500/20",
    success: "hover:border-emerald-500/30 hover:shadow-emerald-500/20",
    warning: "hover:border-amber-500/30 hover:shadow-amber-500/20",
    error: "hover:border-rose-500/30 hover:shadow-rose-500/20",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl",
        "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
        "backdrop-blur-xl",
        "border border-white/[0.08]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 ease-out",
        hover && "hover:translate-y-[-2px] hover:border-white/[0.15] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
        glow && "shadow-[0_0_40px_rgba(99,102,241,0.15)]",
        gradient && gradientStyles[gradient],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
      {children}
    </div>
  );
}
