"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { AnimatedNumber } from "./AnimatedNumber";
import { bounties, difficultyColors, categoryColors, currentUser } from "@/lib/mockData";
import {
  Target,
  Zap,
  Clock,
  Users,
  ChevronDown,
  Filter,
  Search,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  Lock,
} from "lucide-react";

type FilterType = "all" | "available" | "in_progress" | "completed";
type SortType = "xp" | "deadline" | "difficulty";
type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced" | "expert";

export function Bounties() {
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [sortBy, setSortBy] = useState<SortType>("xp");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBounties = bounties
    .filter((bounty) => {
      if (statusFilter !== "all" && bounty.status !== statusFilter) return false;
      if (difficultyFilter !== "all" && bounty.difficulty !== difficultyFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          bounty.title.toLowerCase().includes(query) ||
          bounty.description.toLowerCase().includes(query) ||
          bounty.skills.some((skill) => skill.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "xp") return b.xpReward - a.xpReward;
      if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
    });

  const stats = {
    total: bounties.length,
    available: bounties.filter((b) => b.status === "available").length,
    inProgress: bounties.filter((b) => b.status === "in_progress").length,
    completed: bounties.filter((b) => b.status === "completed").length,
  };

  const getDaysLeft = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-7 h-7 text-indigo-400" />
            Bounties
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Complete bounties to earn XP and unlock achievements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-indigo-500/20">
            <span className="text-xs text-zinc-400">Your completed:</span>
            <span className="text-sm font-bold text-white ml-1">{currentUser.completedBounties}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Bounties", value: stats.total, icon: Target, color: "text-indigo-400" },
          { label: "Available", value: stats.available, icon: Sparkles, color: "text-emerald-400" },
          { label: "In Progress", value: stats.inProgress, icon: PlayCircle, color: "text-amber-400" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-cyan-400" },
        ].map((stat, index) => (
          <GlassCard
            key={stat.label}
            className="p-4"
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-white/[0.05]", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  <AnimatedNumber value={stat.value} duration={600} delay={index * 100} />
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search bounties by name, description, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "text-white placeholder:text-zinc-500",
              "focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20",
              "transition-all duration-200"
            )}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl",
            "border transition-all duration-200",
            showFilters
              ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
              : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.15]"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              showFilters && "rotate-180"
            )}
          />
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className={cn(
              "px-3 py-2.5 rounded-xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "text-white text-sm",
              "focus:outline-none focus:border-indigo-500/50",
              "transition-all duration-200"
            )}
          >
            <option value="xp" className="bg-zinc-900">Highest XP</option>
            <option value="deadline" className="bg-zinc-900">Deadline</option>
            <option value="difficulty" className="bg-zinc-900">Difficulty</option>
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="animate-fade-in-down">
          <GlassCard className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "available", "in_progress", "completed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                        statusFilter === status
                          ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                          : "bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-white/[0.15] hover:text-white"
                      )}
                    >
                      {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "beginner", "intermediate", "advanced", "expert"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                        difficultyFilter === diff
                          ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                          : "bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-white/[0.15] hover:text-white"
                      )}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Bounties Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBounties.map((bounty, index) => {
          const daysLeft = getDaysLeft(bounty.deadline);
          const isUrgent = daysLeft <= 5 && bounty.status !== "completed";
          const progress = bounty.status === "completed" ? 100 : bounty.status === "in_progress" ? 45 : 0;

          return (
            <GlassCard
              key={bounty.id}
              className="p-5 hover:border-indigo-500/20"
              gradient="primary"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${categoryColors[bounty.category] || "#6366f1"}20`,
                        color: categoryColors[bounty.category] || "#6366f1",
                      }}
                    >
                      {bounty.category}
                    </span>
                    {bounty.maxCompletions && (
                      <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Limited
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {bounty.title}
                  </h3>
                </div>
                <div
                  className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{
                    backgroundColor: `${difficultyColors[bounty.difficulty]}20`,
                    color: difficultyColors[bounty.difficulty],
                  }}
                >
                  {bounty.difficulty.charAt(0).toUpperCase() + bounty.difficulty.slice(1)}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                {bounty.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {bounty.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-zinc-400 border border-white/[0.05]"
                  >
                    {skill}
                  </span>
                ))}
                {bounty.skills.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-zinc-500">
                    +{bounty.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Progress Bar (for in-progress bounties) */}
              {bounty.status === "in_progress" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-indigo-400 font-medium">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                <div className="flex items-center gap-3">
                  {/* XP Reward */}
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-white">{bounty.xpReward}</span>
                    <span className="text-xs text-zinc-500">XP</span>
                  </div>
                  {/* Completions */}
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-400">{bounty.completions}</span>
                  </div>
                </div>

                {/* Deadline */}
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-xs",
                    isUrgent ? "text-rose-400" : "text-zinc-400"
                  )}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {bounty.status === "completed"
                      ? "Completed"
                      : daysLeft < 0
                        ? "Expired"
                        : `${daysLeft}d left`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={cn(
                  "w-full mt-4 py-2.5 rounded-xl text-sm font-medium",
                  "transition-all duration-200 flex items-center justify-center gap-2",
                  bounty.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                    : bounty.status === "in_progress"
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:translate-y-[-1px]"
                )}
              >
                {bounty.status === "completed" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                  </>
                ) : bounty.status === "in_progress" ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    Continue
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    Start Bounty
                  </>
                )}
              </button>
            </GlassCard>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBounties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No bounties found</h3>
          <p className="text-sm text-zinc-400">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
