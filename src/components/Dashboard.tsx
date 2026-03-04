"use client";

import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";
import { AnimatedNumber } from "./AnimatedNumber";
import { StatCard } from "./StatCard";
import { GlassCard } from "./GlassCard";
import {
  currentUser,
  weeklyProgress,
  activities,
  deadlines,
  badges,
  leaderboard,
} from "@/lib/mockData";
import {
  Zap,
  Flame,
  Award,
  Target,
  TrendingUp,
  Clock,
  ChevronRight,
  Play,
  Calendar,
  Trophy,
  Star,
  ArrowUpRight,
  Sparkles,
  Crown,
  Medal,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const earnedBadges = badges.filter((b) => b.earnedAt);
  const inProgressBadges = badges.filter((b) => b.progress && !b.earnedAt);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetings = {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    };
    return greetings[timeOfDay];
  };

  const calculateTimeLeft = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const maxXP = Math.max(...weeklyProgress.map((d) => d.xp));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border border-white/[0.08] p-6">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                Level {currentUser.level} Achiever
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {getGreeting()}, {currentUser.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-lg">
              You&apos;re making great progress! You&apos;ve earned{" "}
              <span className="text-indigo-400 font-semibold">
                {currentUser.xp.toLocaleString()} XP
              </span>{" "}
              and maintained a{" "}
              <span className="text-amber-400 font-semibold">
                {currentUser.streak}-day streak
              </span>
              .
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => onNavigate("bounties")}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:translate-y-[-1px]"
              >
                <Target className="w-4 h-4" />
                View Bounties
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-200"
              >
                <Play className="w-4 h-4" />
                Submit Project
              </button>
            </div>
          </div>

          {/* Level Progress Ring */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <ProgressRing
              progress={(currentUser.xp / currentUser.xpToNextLevel) * 100}
              size={140}
              strokeWidth={10}
              showValue={false}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {currentUser.level}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                  Level
                </div>
              </div>
            </ProgressRing>
            <div className="mt-3 text-center">
              <div className="text-sm font-medium text-white">
                <AnimatedNumber value={currentUser.xpToNextLevel - currentUser.xp} /> XP
              </div>
              <div className="text-xs text-zinc-500">to next level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total XP"
          value={currentUser.xp}
          icon={<Zap className="w-5 h-5" />}
          iconBgColor="bg-indigo-500/20"
          trend={12}
          trendLabel="this week"
        />
        <StatCard
          label="Day Streak"
          value={currentUser.streak}
          icon={<Flame className="w-5 h-5" />}
          iconBgColor="bg-amber-500/20"
          suffix=" days"
        />
        <StatCard
          label="Badges Earned"
          value={currentUser.totalBadges}
          icon={<Award className="w-5 h-5" />}
          iconBgColor="bg-purple-500/20"
        />
        <StatCard
          label="Bounties Done"
          value={currentUser.completedBounties}
          icon={<Target className="w-5 h-5" />}
          iconBgColor="bg-emerald-500/20"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Weekly Progress</h2>
                <p className="text-sm text-zinc-400">XP earned and bounties completed</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <span className="text-zinc-400">XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-zinc-400">Bounties</span>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-3 h-40">
              {weeklyProgress.map((day, index) => (
                <div
                  key={day.day}
                  className="flex-1 flex flex-col items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-full flex flex-col items-center gap-1">
                    {/* XP Bar */}
                    <div className="w-full h-32 flex items-end justify-center">
                      <div
                        className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500 relative group transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${(day.xp / maxXP) * 100}%`,
                          animationDelay: `${index * 100 + 200}ms`,
                        }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                          {day.xp} XP
                        </div>
                      </div>
                    </div>
                    {/* Bounties indicator */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.min(day.bounties, 4) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                        />
                      ))}
                      {day.bounties > 4 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Weekly Summary */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.05]">
              <div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedNumber value={weeklyProgress.reduce((acc, d) => acc + d.xp, 0)} />
                </div>
                <div className="text-xs text-zinc-500">Total XP this week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedNumber value={weeklyProgress.reduce((acc, d) => acc + d.bounties, 0)} />
                </div>
                <div className="text-xs text-zinc-500">Bounties completed</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +18%
                </div>
                <div className="text-xs text-zinc-500">vs last week</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Deadlines */}
        <div className="lg:col-span-1">
          <GlassCard className="p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Upcoming</h2>
              <Calendar className="w-5 h-5 text-zinc-400" />
            </div>

            <div className="space-y-3">
              {deadlines.slice(0, 4).map((deadline, index) => {
                const daysLeft = calculateTimeLeft(deadline.deadline);
                const isUrgent = daysLeft <= 3;
                return (
                  <div
                    key={deadline.id}
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-200 hover:border-white/[0.15]",
                      isUrgent
                        ? "bg-rose-500/10 border-rose-500/20"
                        : "bg-white/[0.02] border-white/[0.05]"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              "text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider",
                              deadline.type === "bounty"
                                ? "bg-indigo-500/20 text-indigo-400"
                                : deadline.type === "project"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-cyan-500/20 text-cyan-400"
                            )}
                          >
                            {deadline.type}
                          </span>
                          {isUrgent && (
                            <span className="text-[10px] text-rose-400 font-medium animate-pulse">
                              Urgent
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-white">
                          {deadline.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div
                          className={cn(
                            "text-lg font-bold",
                            isUrgent ? "text-rose-400" : "text-white"
                          )}
                        >
                          {daysLeft}
                        </div>
                        <div className="text-[10px] text-zinc-500">days left</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Activity Feed & Leaderboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0",
                    activity.type === "badge_earned"
                      ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10"
                      : activity.type === "bounty_completed"
                        ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10"
                        : activity.type === "level_up"
                          ? "bg-gradient-to-br from-indigo-500/20 to-indigo-600/10"
                          : "bg-gradient-to-br from-purple-500/20 to-purple-600/10"
                  )}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                    {activity.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-zinc-500">
                    {activity.timestamp}
                  </div>
                  {activity.xp && (
                    <div className="text-xs text-indigo-400 font-medium mt-0.5">
                      +{activity.xp} XP
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Leaderboard Preview */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Leaderboard</h2>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          <div className="space-y-2">
            {leaderboard.slice(0, 6).map((user, index) => {
              const isCurrentUser = user.name === currentUser.name;
              return (
                <div
                  key={user.rank}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                    isCurrentUser
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-indigo-500/20"
                      : "bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Rank */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                      user.rank === 1
                        ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                        : user.rank === 2
                          ? "bg-gradient-to-br from-zinc-300 to-zinc-500 text-white"
                          : user.rank === 3
                            ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                            : "bg-white/[0.05] text-zinc-400"
                    )}
                  >
                    {user.rank <= 3 ? (
                      user.rank === 1 ? (
                        <Crown className="w-4 h-4" />
                      ) : user.rank === 2 ? (
                        <Medal className="w-4 h-4" />
                      ) : (
                        <Medal className="w-4 h-4" />
                      )
                    ) : (
                      user.rank
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-white/[0.1]"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">
                        {user.name}
                      </span>
                      {isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-400 font-medium">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500">Level {user.level}</div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">
                      {user.xp.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-500">XP</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Badge Showcase */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Badge Showcase</h2>
            <p className="text-sm text-zinc-400">Your achievements in progress</p>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {earnedBadges.slice(0, 4).map((badge, index) => (
            <div
              key={badge.id}
              className="group p-3 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {badge.icon}
                </div>
                <div className="text-xs font-medium text-white truncate">
                  {badge.name}
                </div>
                <div
                  className={cn(
                    "text-[10px] mt-1 capitalize",
                    badge.rarity === "legendary"
                      ? "text-amber-400"
                      : badge.rarity === "epic"
                        ? "text-purple-400"
                        : badge.rarity === "rare"
                          ? "text-blue-400"
                          : "text-zinc-400"
                  )}
                >
                  {badge.rarity}
                </div>
              </div>
            </div>
          ))}
          {inProgressBadges.slice(0, 2).map((badge, index) => (
            <div
              key={badge.id}
              className="group p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-all duration-200 cursor-pointer"
              style={{ animationDelay: `${(index + 4) * 50}ms` }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2 opacity-60">
                  {badge.icon}
                </div>
                <div className="text-xs font-medium text-zinc-400 truncate">
                  {badge.name}
                </div>
                <div className="mt-1.5">
                  <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      style={{
                        width: `${((badge.progress || 0) / badge.totalRequired) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">
                    {badge.progress}/{badge.totalRequired}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
