"use client";

import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";
import { AnimatedNumber } from "./AnimatedNumber";
import { currentUser, navigationItems } from "@/lib/mockData";
import {
  LayoutDashboard,
  Target,
  FolderKanban,
  Users,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Flame,
  Award,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  FolderKanban: <FolderKanban className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
};

export function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: SidebarProps) {
  const xpProgress = (currentUser.xp / currentUser.xpToNextLevel) * 100;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40",
        "bg-[#0a0a0f] border-r border-white/[0.05]",
        "transition-all duration-300 ease-out",
        "flex flex-col",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-3 top-8 z-50",
          "w-6 h-6 rounded-full",
          "bg-gradient-to-r from-indigo-500 to-purple-500",
          "flex items-center justify-center",
          "shadow-lg shadow-indigo-500/30",
          "transition-transform duration-200 hover:scale-110",
          "text-white"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* User Profile Section */}
      <div
        className={cn(
          "p-4 border-b border-white/[0.05]",
          "transition-all duration-300"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          {/* Avatar with Level Badge */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-[#0a0a0f]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Level Badge */}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1",
                  "w-6 h-6 rounded-full",
                  "bg-gradient-to-r from-indigo-500 to-purple-500",
                  "flex items-center justify-center",
                  "text-[10px] font-bold text-white",
                  "shadow-lg shadow-indigo-500/30"
                )}
              >
                {currentUser.level}
              </div>
            </div>

            {/* Online Status */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0f]" />
          </div>

          {/* User Info */}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">
                {currentUser.name}
              </h3>
              <p className="text-xs text-zinc-400 truncate">
                Rank #{currentUser.rank}
              </p>
              {/* XP Progress */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    XP
                  </span>
                  <span>
                    {currentUser.xp.toLocaleString()} / {currentUser.xpToNextLevel.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="p-4 border-b border-white/[0.05]">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Flame className="w-3.5 h-3.5" />
                <AnimatedNumber value={currentUser.streak} className="text-sm font-bold" />
              </div>
              <p className="text-[10px] text-zinc-500">Streak</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <div className="flex items-center justify-center gap-1 text-indigo-400 mb-1">
                <Award className="w-3.5 h-3.5" />
                <AnimatedNumber value={currentUser.totalBadges} className="text-sm font-bold" />
              </div>
              <p className="text-[10px] text-zinc-500">Badges</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <Target className="w-3.5 h-3.5" />
                <AnimatedNumber value={currentUser.completedBounties} className="text-sm font-bold" />
              </div>
              <p className="text-[10px] text-zinc-500">Bounties</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item, index) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "text-sm font-medium transition-all duration-200",
                "relative group",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white border border-indigo-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full" />
              )}
              <span
                className={cn(
                  "transition-transform duration-200",
                  isActive ? "text-indigo-400" : "group-hover:scale-110"
                )}
              >
                {iconMap[item.icon]}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* XP Progress Ring (when collapsed) */}
      {collapsed && (
        <div className="flex justify-center p-3 border-t border-white/[0.05]">
          <ProgressRing
            progress={xpProgress}
            size={48}
            strokeWidth={4}
            showValue={false}
          >
            <Zap className="w-4 h-4 text-indigo-400" />
          </ProgressRing>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/[0.05] space-y-1">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
            "text-sm font-medium text-zinc-400",
            "hover:text-white hover:bg-white/[0.05]",
            "transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
            "text-sm font-medium text-zinc-400",
            "hover:text-white hover:bg-white/[0.05]",
            "transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

      {/* Branding */}
      {!collapsed && (
        <div className="p-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI Squads
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
