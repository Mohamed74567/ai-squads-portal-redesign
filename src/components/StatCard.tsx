"use client";

import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
  iconBgColor?: string;
  animated?: boolean;
}

export function StatCard({
  label,
  value,
  icon,
  suffix = "",
  prefix = "",
  trend,
  trendLabel,
  className,
  iconBgColor = "bg-indigo-500/20",
  animated = true,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative p-4 rounded-xl",
        "bg-gradient-to-br from-white/[0.06] to-white/[0.02]",
        "backdrop-blur-xl",
        "border border-white/[0.08]",
        "transition-all duration-300 ease-out",
        "hover:translate-y-[-2px] hover:border-white/[0.15]",
        "group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">
              {animated ? (
                <AnimatedNumber value={value} prefix={prefix} suffix={suffix} duration={800} />
              ) : (
                `${prefix}${value.toLocaleString()}${suffix}`
              )}
            </span>
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend >= 0 ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </span>
              {trendLabel && (
                <span className="text-xs text-zinc-500">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-2.5 rounded-lg transition-transform duration-300 group-hover:scale-110",
            iconBgColor
          )}
        >
          <div className="w-5 h-5 text-indigo-400">{icon}</div>
        </div>
      </div>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-transparent" />
    </div>
  );
}
