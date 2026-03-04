"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { ProgressRing } from "./ProgressRing";
import { AnimatedNumber } from "./AnimatedNumber";
import { currentUser, badges, activities } from "@/lib/mockData";
import {
  User,
  Zap,
  Flame,
  Award,
  Target,
  Calendar,
  Edit3,
  Share2,
  Settings,
  TrendingUp,
  Trophy,
  Star,
  Clock,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

type TabType = "overview" | "badges" | "activity";

export function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const earnedBadges = badges.filter((b) => b.earnedAt);
  const inProgressBadges = badges.filter((b) => b.progress && !b.earnedAt);
  const lockedBadges = badges.filter((b) => !b.earnedAt && !b.progress);

  const xpProgress = (currentUser.xp / currentUser.xpToNextLevel) * 100;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "epic":
        return "text-purple-400 border-purple-500/30 bg-purple-500/10";
      case "rare":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10";
      default:
        return "text-zinc-400 border-zinc-500/30 bg-zinc-500/10";
    }
  };

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "badges", label: "Badges", count: earnedBadges.length },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <GlassCard className="p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <ProgressRing
              progress={xpProgress}
              size={120}
              strokeWidth={4}
              showValue={false}
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-[#0a0a0f]"
                />
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1",
                    "w-8 h-8 rounded-full",
                    "bg-gradient-to-r from-indigo-500 to-purple-500",
                    "flex items-center justify-center",
                    "text-sm font-bold text-white",
                    "shadow-lg shadow-indigo-500/30",
                    "border-2 border-[#0a0a0f]"
                  )}
                >
                  {currentUser.level}
                </div>
              </div>
            </ProgressRing>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium border border-indigo-500/30">
                Level {currentUser.level}
              </span>
            </div>
            <p className="text-zinc-400 text-sm mb-4">{currentUser.email}</p>

            {/* XP Progress */}
            <div className="max-w-xs mx-auto md:mx-0 mb-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Experience Progress</span>
                <span>
                  {currentUser.xp.toLocaleString()} / {currentUser.xpToNextLevel.toLocaleString()} XP
                </span>
              </div>
              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                <AnimatedNumber value={currentUser.xpToNextLevel - currentUser.xp} /> XP to Level {currentUser.level + 1}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center md:justify-start gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <AnimatedNumber value={currentUser.xp} />
                </div>
                <div className="text-xs text-zinc-500">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-amber-400" />
                  {currentUser.streak}
                </div>
                <div className="text-xs text-zinc-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  #{currentUser.rank}
                </div>
                <div className="text-xs text-zinc-500">Rank</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:translate-y-[-1px]">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <div className="p-3 rounded-xl bg-amber-500/20 w-fit mx-auto mb-3">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{currentUser.streak}</div>
          <div className="text-xs text-zinc-500">Day Streak</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="p-3 rounded-xl bg-purple-500/20 w-fit mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{currentUser.totalBadges}</div>
          <div className="text-xs text-zinc-500">Badges Earned</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="p-3 rounded-xl bg-emerald-500/20 w-fit mx-auto mb-3">
            <Target className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{currentUser.completedBounties}</div>
          <div className="text-xs text-zinc-500">Bounties Done</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="p-3 rounded-xl bg-cyan-500/20 w-fit mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{currentUser.projectsCompleted}</div>
          <div className="text-xs text-zinc-500">Projects</div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white border border-indigo-500/20"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-md bg-white/[0.1] text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Recent Badges */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Badges</h2>
              <button
                onClick={() => setActiveTab("badges")}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {earnedBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    "p-3 rounded-xl text-center transition-all duration-200 hover:scale-105 cursor-pointer",
                    getRarityColor(badge.rarity),
                    "border"
                  )}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-[10px] font-medium truncate">{badge.name}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Activity Summary */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button
                onClick={() => setActiveTab("activity")}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {activities.slice(0, 4).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="text-xl">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {activity.title}
                    </div>
                    <div className="text-xs text-zinc-500">{activity.timestamp}</div>
                  </div>
                  {activity.xp && (
                    <div className="text-xs text-indigo-400 font-medium">+{activity.xp} XP</div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === "badges" && (
        <div className="space-y-6 animate-fade-in">
          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Earned ({earnedBadges.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {earnedBadges.map((badge) => (
                  <GlassCard
                    key={badge.id}
                    className={cn("p-4 text-center", getRarityColor(badge.riculty || badge.rarity), "border")}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h3 className="text-sm font-semibold text-white mb-1">{badge.name}</h3>
                    <p className="text-xs text-zinc-400 mb-2">{badge.description}</p>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-indigo-400">
                      <Zap className="w-3 h-3" />
                      {badge.xpReward} XP
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* In Progress */}
          {inProgressBadges.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-cyan-400" />
                In Progress ({inProgressBadges.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inProgressBadges.map((badge) => (
                  <GlassCard
                    key={badge.id}
                    className="p-4 text-center border border-cyan-500/20 bg-cyan-500/5"
                  >
                    <div className="text-3xl mb-2 opacity-70">{badge.icon}</div>
                    <h3 className="text-sm font-semibold text-white mb-1">{badge.name}</h3>
                    <p className="text-xs text-zinc-400 mb-2">{badge.description}</p>
                    <div className="mb-2">
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                          style={{ width: `${((badge.progress || 0) / badge.totalRequired) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        {badge.progress}/{badge.totalRequired}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-indigo-400">
                      <Zap className="w-3 h-3" />
                      {badge.xpReward} XP
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "activity" && (
        <GlassCard className="p-5 animate-fade-in">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200"
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white">{activity.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </div>
                </div>
                {activity.xp && (
                  <div className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-medium">
                    +{activity.xp} XP
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Member Since */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <div>
              <div className="text-sm font-medium text-white">Member since</div>
              <div className="text-xs text-zinc-500">{formatDate(currentUser.joinedAt)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white">
              {Math.floor((Date.now() - new Date(currentUser.joinedAt).getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
            <div className="text-xs text-zinc-500">of learning</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
