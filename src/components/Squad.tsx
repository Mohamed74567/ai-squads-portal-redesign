"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { squadMembers, currentUser } from "@/lib/mockData";
import { ProgressRing } from "./ProgressRing";
import {
  Users,
  Search,
  Crown,
  Medal,
  Zap,
  Award,
  MessageCircle,
  UserPlus,
  Filter,
  ChevronDown,
  Circle,
} from "lucide-react";

type StatusFilter = "all" | "online" | "away" | "offline";
type SortType = "rank" | "level" | "xp" | "badges";

export function Squad() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortType>("rank");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMembers = squadMembers
    .filter((member) => {
      if (statusFilter !== "all" && member.status !== statusFilter) return false;
      if (searchQuery) {
        return member.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "level") return b.level - a.level;
      if (sortBy === "xp") return b.xp - a.xp;
      if (sortBy === "badges") return b.badges - a.badges;
      return 0;
    });

  const stats = {
    total: squadMembers.length,
    online: squadMembers.filter((m) => m.status === "online").length,
    away: squadMembers.filter((m) => m.status === "away").length,
    offline: squadMembers.filter((m) => m.status === "offline").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "away":
        return "bg-amber-500";
      default:
        return "bg-zinc-500";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-cyan-400" />
            Squad Directory
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Connect with your fellow AI enthusiasts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
            <span className="text-sm text-cyan-400">{stats.online} online</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.total}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Members</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Circle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.online}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Online</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Circle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.away}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Away</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-500/20 text-zinc-400">
              <Circle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.offline}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Offline</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search members by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "text-white placeholder:text-zinc-500",
              "focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20",
              "transition-all duration-200"
            )}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl",
            "border transition-all duration-200",
            showFilters
              ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
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

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className={cn(
              "px-3 py-2.5 rounded-xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "text-white text-sm",
              "focus:outline-none focus:border-cyan-500/50",
              "transition-all duration-200"
            )}
          >
            <option value="rank" className="bg-zinc-900">Rank</option>
            <option value="level" className="bg-zinc-900">Level</option>
            <option value="xp" className="bg-zinc-900">XP</option>
            <option value="badges" className="bg-zinc-900">Badges</option>
          </select>
        </div>
      </div>

      {/* Status Filters */}
      {showFilters && (
        <div className="animate-fade-in-down">
          <GlassCard className="p-4">
            <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {(["all", "online", "away", "offline"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    statusFilter === status
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-white/[0.15] hover:text-white"
                  )}
                >
                  {status !== "all" && (
                    <Circle className={cn("w-2 h-2 fill-current", getStatusColor(status))} />
                  )}
                  {status === "all" ? "All" : getStatusLabel(status)}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMembers.map((member, index) => {
          const isCurrentUser = member.name === currentUser.name;
          return (
            <GlassCard
              key={member.id}
              className={cn(
                "p-5",
                isCurrentUser && "border-cyan-500/30 bg-cyan-500/5"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full ring-2 ring-white/[0.1]"
                    />
                    {/* Level Badge */}
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1",
                        "w-6 h-6 rounded-full",
                        "bg-gradient-to-r from-cyan-500 to-indigo-500",
                        "flex items-center justify-center",
                        "text-[10px] font-bold text-white",
                        "shadow-lg shadow-cyan-500/30"
                      )}
                    >
                      {member.level}
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0f]",
                      getStatusColor(member.status)
                    )}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-semibold text-white truncate">
                      {member.name}
                    </h3>
                    {member.role === "leader" && (
                      <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    )}
                    {isCurrentUser && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/30 text-cyan-400 font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">
                    Rank #{member.rank} • Level {member.level}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-indigo-400">
                      <Zap className="w-3 h-3" />
                      {member.xp.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-purple-400">
                      <Award className="w-3 h-3" />
                      {member.badges}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.05]">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-zinc-400 hover:text-white hover:border-white/[0.15] transition-all duration-200">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Message
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-all duration-200">
                  <UserPlus className="w-3.5 h-3.5" />
                  Connect
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No members found</h3>
          <p className="text-sm text-zinc-400">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
