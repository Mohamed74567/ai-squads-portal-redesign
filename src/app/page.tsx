"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { Bounties } from "@/components/Bounties";
import { Projects } from "@/components/Projects";
import { Squad } from "@/components/Squad";
import { Profile } from "@/components/Profile";
import { GlassCard } from "@/components/GlassCard";
import { currentUser } from "@/lib/mockData";
import {
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  Command,
} from "lucide-react";

// Custom hook for window width
function useWindowWidth() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth,
    () => 1024 // Server-side default
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  // Update sidebar when screen size changes
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "bounties":
        return <Bounties />;
      case "projects":
        return <Projects />;
      case "squad":
        return <Squad />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard";
      case "bounties":
        return "Bounties";
      case "projects":
        return "Projects";
      case "squad":
        return "Squad";
      case "profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "hidden md:block",
          sidebarCollapsed ? "md:w-20" : "md:w-72"
        )}
      >
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 md:hidden transition-transform duration-300",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          collapsed={false}
          onToggle={() => {}}
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "md:ml-20" : "md:ml-72"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
              >
                {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Page Title - Desktop */}
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
              </div>

              {/* Search - Desktop */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 text-sm hover:text-white hover:border-white/[0.15] transition-all duration-200"
                >
                  <Search className="w-4 h-4" />
                  <span>Search...</span>
                  <div className="flex items-center gap-0.5 ml-4 px-1.5 py-0.5 rounded bg-white/[0.05] text-[10px]">
                    <Command className="w-3 h-3" />
                    K
                  </div>
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Quick Stats - Desktop */}
              <div className="hidden lg:flex items-center gap-3 mr-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-amber-400 font-medium">{currentUser.streak} day streak</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-xs text-indigo-400 font-medium">{currentUser.xp.toLocaleString()} XP</span>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.15] transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              </button>

              {/* User Menu */}
              <button className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg"
                />
                <div className="hidden md:block text-left pr-1">
                  <div className="text-sm font-medium text-white truncate max-w-[120px]">
                    {currentUser.name.split(" ")[0]}
                  </div>
                </div>
                <ChevronDown className="hidden md:block w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.05] px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  AI Squads
                </span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Student Portal Redesign</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Cohort #3</span>
              <span>•</span>
              <span>© 2024 AI Squads</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Feedback Button */}
      <button className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 hover:translate-y-[-2px] group">
        <Sparkles className="w-4 h-4 group-hover:animate-spin" />
        <span className="hidden md:inline">Ideas & Feedback</span>
      </button>

      {/* Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSearch(false)}
        >
          <GlassCard
            className="w-full max-w-xl mx-4 p-4 animate-scale-in"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search bounties, projects, members..."
                className="flex-1 bg-transparent text-white text-lg placeholder:text-zinc-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="p-1.5 rounded-lg bg-white/[0.05] text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <p className="text-xs text-zinc-500 text-center">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.1] text-zinc-400">ESC</kbd> to close
              </p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Keyboard shortcut for search */}
      <KeyboardShortcuts onSearch={() => setShowSearch(true)} />
    </div>
  );
}

function KeyboardShortcuts({ onSearch }: { onSearch: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch]);

  return null;
}
