"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { projects, currentUser } from "@/lib/mockData";
import {
  FolderKanban,
  Heart,
  Eye,
  ExternalLink,
  Search,
  Filter,
  ChevronDown,
  Star,
  Sparkles,
  Code,
  Rocket,
} from "lucide-react";

type SortType = "recent" | "popular" | "featured";
type TagFilter = "all" | string;

export function Projects() {
  const [sortBy, setSortBy] = useState<SortType>("featured");
  const [tagFilter, setTagFilter] = useState<TagFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags
  const allTags = [...new Set(projects.flatMap((p) => p.tags))];

  const filteredProjects = projects
    .filter((project) => {
      if (tagFilter !== "all" && !project.tags.includes(tagFilter)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "popular") {
        return b.views - a.views;
      }
      // Featured first, then by likes
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.likes - a.likes;
    });

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    totalViews: projects.reduce((acc, p) => acc + p.views, 0),
    totalLikes: projects.reduce((acc, p) => acc + p.likes, 0),
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-purple-400" />
            Projects
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Explore and showcase AI projects from the community
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 hover:translate-y-[-1px]">
          <Rocket className="w-4 h-4" />
          Submit Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.total}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.featured}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Featured</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{(stats.totalViews / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Views</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats.totalLikes}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Likes</div>
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
            placeholder="Search projects by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-xl",
              "bg-white/[0.03] border border-white/[0.08]",
              "text-white placeholder:text-zinc-500",
              "focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20",
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
              ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
              : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.15]"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Tags</span>
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
              "focus:outline-none focus:border-purple-500/50",
              "transition-all duration-200"
            )}
          >
            <option value="featured" className="bg-zinc-900">Featured</option>
            <option value="recent" className="bg-zinc-900">Recent</option>
            <option value="popular" className="bg-zinc-900">Popular</option>
          </select>
        </div>
      </div>

      {/* Tag Filters */}
      {showFilters && (
        <div className="animate-fade-in-down">
          <GlassCard className="p-4">
            <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
              Filter by Tag
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTagFilter("all")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  tagFilter === "all"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-white/[0.15] hover:text-white"
                )}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    tagFilter === tag
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-white/[0.03] text-zinc-400 border border-white/[0.05] hover:border-white/[0.15] hover:text-white"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <GlassCard
            key={project.id}
            className="overflow-hidden hover:border-purple-500/20"
            gradient="primary"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {project.featured && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-base font-semibold text-white mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <img
                    src={project.author.avatar}
                    alt={project.author.name}
                    className="w-6 h-6 rounded-full ring-2 ring-white/[0.1]"
                  />
                  <span className="text-xs text-zinc-400">{project.author.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {project.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {project.views}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
            <FolderKanban className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No projects found</h3>
          <p className="text-sm text-zinc-400">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
