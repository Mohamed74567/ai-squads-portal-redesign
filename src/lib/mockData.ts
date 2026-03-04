// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: number;
  streak: number;
  totalBadges: number;
  completedBounties: number;
  projectsCompleted: number;
  squadId: string;
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "learning" | "achievement" | "special" | "milestone";
  rarity: "common" | "rare" | "epic" | "legendary";
  earnedAt?: string;
  progress?: number;
  totalRequired: number;
  xpReward: number;
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
  deadline: string;
  status: "available" | "in_progress" | "completed";
  completions: number;
  maxCompletions?: number;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  views: number;
  tags: string[];
  createdAt: string;
  featured: boolean;
}

export interface SquadMember {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  rank: number;
  badges: number;
  status: "online" | "away" | "offline";
  role: "leader" | "member";
}

export interface Activity {
  id: string;
  type: "badge_earned" | "bounty_completed" | "level_up" | "project_submitted" | "streak_milestone";
  title: string;
  description: string;
  timestamp: string;
  xp?: number;
  icon: string;
}

export interface Deadline {
  id: string;
  title: string;
  type: "bounty" | "project" | "event";
  deadline: string;
  priority: "low" | "medium" | "high";
}

// Current User
export const currentUser: User = {
  id: "user-001",
  name: "Alex Chen",
  email: "alex.chen@aisquads.org",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1",
  level: 24,
  xp: 8450,
  xpToNextLevel: 10000,
  rank: 12,
  streak: 15,
  totalBadges: 18,
  completedBounties: 32,
  projectsCompleted: 8,
  squadId: "squad-alpha",
  joinedAt: "2024-01-15",
};

// Badges
export const badges: Badge[] = [
  {
    id: "badge-001",
    name: "First Steps",
    description: "Complete your first bounty",
    icon: "🎯",
    category: "milestone",
    rarity: "common",
    earnedAt: "2024-01-16",
    totalRequired: 1,
    xpReward: 100,
  },
  {
    id: "badge-002",
    name: "Quick Learner",
    description: "Complete 10 learning modules",
    icon: "📚",
    category: "learning",
    rarity: "common",
    earnedAt: "2024-02-01",
    totalRequired: 10,
    xpReward: 200,
  },
  {
    id: "badge-003",
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    category: "achievement",
    rarity: "rare",
    earnedAt: "2024-02-10",
    totalRequired: 7,
    xpReward: 300,
  },
  {
    id: "badge-004",
    name: "Code Ninja",
    description: "Complete 5 advanced bounties",
    icon: "⚔️",
    category: "achievement",
    rarity: "epic",
    earnedAt: "2024-03-05",
    totalRequired: 5,
    xpReward: 500,
  },
  {
    id: "badge-005",
    name: "Team Player",
    description: "Collaborate on 3 squad projects",
    icon: "🤝",
    category: "achievement",
    rarity: "rare",
    earnedAt: "2024-03-20",
    totalRequired: 3,
    xpReward: 350,
  },
  {
    id: "badge-006",
    name: "AI Pioneer",
    description: "Submit your first AI model",
    icon: "🤖",
    category: "special",
    rarity: "legendary",
    earnedAt: "2024-04-01",
    totalRequired: 1,
    xpReward: 1000,
  },
  {
    id: "badge-007",
    name: "Bug Hunter",
    description: "Find and report 10 bugs",
    icon: "🐛",
    category: "achievement",
    rarity: "rare",
    progress: 7,
    totalRequired: 10,
    xpReward: 400,
  },
  {
    id: "badge-008",
    name: "Night Owl",
    description: "Complete bounties after midnight 5 times",
    icon: "🦉",
    category: "special",
    rarity: "epic",
    progress: 3,
    totalRequired: 5,
    xpReward: 450,
  },
  {
    id: "badge-009",
    name: "Perfectionist",
    description: "Get 100% on 5 quizzes",
    icon: "✨",
    category: "learning",
    rarity: "epic",
    earnedAt: "2024-04-15",
    totalRequired: 5,
    xpReward: 600,
  },
  {
    id: "badge-010",
    name: "Legend",
    description: "Reach level 50",
    icon: "👑",
    category: "milestone",
    rarity: "legendary",
    progress: 24,
    totalRequired: 50,
    xpReward: 5000,
  },
];

// Bounties
export const bounties: Bounty[] = [
  {
    id: "bounty-001",
    title: "Build a Sentiment Analyzer",
    description: "Create a sentiment analysis tool using NLP techniques that can classify text as positive, negative, or neutral.",
    xpReward: 500,
    difficulty: "intermediate",
    category: "NLP",
    deadline: "2024-12-20",
    status: "available",
    completions: 23,
    skills: ["Python", "NLP", "Machine Learning"],
  },
  {
    id: "bounty-002",
    title: "Image Classification Pipeline",
    description: "Build an end-to-end image classification pipeline using convolutional neural networks.",
    xpReward: 750,
    difficulty: "advanced",
    category: "Computer Vision",
    deadline: "2024-12-18",
    status: "in_progress",
    completions: 8,
    skills: ["Python", "TensorFlow", "CNN"],
  },
  {
    id: "bounty-003",
    title: "Chatbot Integration",
    description: "Integrate a conversational AI chatbot into a web application using modern frameworks.",
    xpReward: 400,
    difficulty: "intermediate",
    category: "Conversational AI",
    deadline: "2024-12-25",
    status: "available",
    completions: 15,
    skills: ["Python", "React", "API Integration"],
  },
  {
    id: "bounty-004",
    title: "Data Visualization Dashboard",
    description: "Create an interactive dashboard for visualizing machine learning model performance metrics.",
    xpReward: 350,
    difficulty: "beginner",
    category: "Data Science",
    deadline: "2024-12-15",
    status: "completed",
    completions: 45,
    skills: ["JavaScript", "D3.js", "Data Analysis"],
  },
  {
    id: "bounty-005",
    title: "Autonomous Agent Framework",
    description: "Design and implement a framework for building autonomous AI agents that can complete complex tasks.",
    xpReward: 1200,
    difficulty: "expert",
    category: "AI Agents",
    deadline: "2024-12-30",
    status: "available",
    completions: 3,
    maxCompletions: 10,
    skills: ["Python", "LangChain", "Agent Design"],
  },
  {
    id: "bounty-006",
    title: "Voice Recognition System",
    description: "Build a voice recognition system that can identify speakers and transcribe speech to text.",
    xpReward: 600,
    difficulty: "advanced",
    category: "Speech AI",
    deadline: "2024-12-22",
    status: "available",
    completions: 12,
    skills: ["Python", "Audio Processing", "Deep Learning"],
  },
  {
    id: "bounty-007",
    title: "Recommendation Engine",
    description: "Create a recommendation engine using collaborative filtering and content-based approaches.",
    xpReward: 450,
    difficulty: "intermediate",
    category: "Machine Learning",
    deadline: "2024-12-28",
    status: "available",
    completions: 18,
    skills: ["Python", "Scikit-learn", "Data Mining"],
  },
  {
    id: "bounty-008",
    title: "GAN Image Generator",
    description: "Build a GAN model that can generate realistic images from random noise.",
    xpReward: 900,
    difficulty: "expert",
    category: "Generative AI",
    deadline: "2024-12-31",
    status: "available",
    completions: 5,
    skills: ["Python", "PyTorch", "GANs"],
  },
];

// Projects
export const projects: Project[] = [
  {
    id: "project-001",
    title: "Neural Style Transfer App",
    description: "A web application that applies artistic styles to images using neural networks. Users can upload photos and transform them with famous art styles.",
    thumbnail: "https://picsum.photos/seed/neural/400/300",
    author: { name: "Alex Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    likes: 128,
    views: 1540,
    tags: ["Deep Learning", "Computer Vision", "React"],
    createdAt: "2024-04-10",
    featured: true,
  },
  {
    id: "project-002",
    title: "Smart Document Summarizer",
    description: "An AI-powered tool that summarizes long documents into concise summaries while preserving key information.",
    thumbnail: "https://picsum.photos/seed/doc/400/300",
    author: { name: "Sarah Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    likes: 95,
    views: 890,
    tags: ["NLP", "Transformers", "Python"],
    createdAt: "2024-04-08",
    featured: true,
  },
  {
    id: "project-003",
    title: "Real-time Object Detection",
    description: "Live video object detection system using YOLO that can identify and track multiple objects in real-time.",
    thumbnail: "https://picsum.photos/seed/object/400/300",
    author: { name: "Marcus Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
    likes: 156,
    views: 2100,
    tags: ["Computer Vision", "YOLO", "Python"],
    createdAt: "2024-04-05",
    featured: true,
  },
  {
    id: "project-004",
    title: "Music Genre Classifier",
    description: "A machine learning model that classifies music into different genres based on audio features.",
    thumbnail: "https://picsum.photos/seed/music/400/300",
    author: { name: "Emily Wang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    likes: 72,
    views: 650,
    tags: ["Audio Processing", "ML", "Classification"],
    createdAt: "2024-04-02",
    featured: false,
  },
  {
    id: "project-005",
    title: "AI-Powered Code Reviewer",
    description: "An intelligent code review assistant that provides suggestions for code improvement and bug detection.",
    thumbnail: "https://picsum.photos/seed/code/400/300",
    author: { name: "David Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
    likes: 203,
    views: 2800,
    tags: ["LLM", "Code Analysis", "Python"],
    createdAt: "2024-03-28",
    featured: true,
  },
  {
    id: "project-006",
    title: "Predictive Maintenance Dashboard",
    description: "A dashboard for predicting equipment failures using sensor data and machine learning models.",
    thumbnail: "https://picsum.photos/seed/predict/400/300",
    author: { name: "Lisa Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
    likes: 88,
    views: 920,
    tags: ["IoT", "Predictive Analytics", "React"],
    createdAt: "2024-03-25",
    featured: false,
  },
];

// Squad Members
export const squadMembers: SquadMember[] = [
  {
    id: "member-001",
    name: "Alex Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1",
    level: 24,
    xp: 8450,
    rank: 12,
    badges: 18,
    status: "online",
    role: "leader",
  },
  {
    id: "member-002",
    name: "Sarah Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=8b5cf6",
    level: 22,
    xp: 7200,
    rank: 18,
    badges: 15,
    status: "online",
    role: "member",
  },
  {
    id: "member-003",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=06b6d4",
    level: 21,
    xp: 6800,
    rank: 22,
    badges: 14,
    status: "away",
    role: "member",
  },
  {
    id: "member-004",
    name: "Emily Wang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=10b981",
    level: 19,
    xp: 5500,
    rank: 35,
    badges: 12,
    status: "online",
    role: "member",
  },
  {
    id: "member-005",
    name: "David Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=f59e0b",
    level: 18,
    xp: 4800,
    rank: 42,
    badges: 10,
    status: "offline",
    role: "member",
  },
  {
    id: "member-006",
    name: "Lisa Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=f43f5e",
    level: 17,
    xp: 4200,
    rank: 48,
    badges: 9,
    status: "online",
    role: "member",
  },
  {
    id: "member-007",
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=6366f1",
    level: 16,
    xp: 3800,
    rank: 55,
    badges: 8,
    status: "away",
    role: "member",
  },
  {
    id: "member-008",
    name: "Nina Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina&backgroundColor=8b5cf6",
    level: 15,
    xp: 3200,
    rank: 62,
    badges: 7,
    status: "online",
    role: "member",
  },
];

// Activities
export const activities: Activity[] = [
  {
    id: "activity-001",
    type: "badge_earned",
    title: "Badge Earned: AI Pioneer",
    description: "You earned the legendary AI Pioneer badge for submitting your first AI model!",
    timestamp: "2 hours ago",
    xp: 1000,
    icon: "🤖",
  },
  {
    id: "activity-002",
    type: "bounty_completed",
    title: "Bounty Completed: Data Visualization Dashboard",
    description: "Successfully completed the intermediate bounty with excellent results.",
    timestamp: "5 hours ago",
    xp: 350,
    icon: "✅",
  },
  {
    id: "activity-003",
    type: "level_up",
    title: "Level Up! You're now Level 24",
    description: "Congratulations on reaching level 24! Keep up the great work.",
    timestamp: "1 day ago",
    icon: "⬆️",
  },
  {
    id: "activity-004",
    type: "streak_milestone",
    title: "15-Day Streak Achievement!",
    description: "You've maintained a 15-day learning streak. Amazing dedication!",
    timestamp: "2 days ago",
    xp: 150,
    icon: "🔥",
  },
  {
    id: "activity-005",
    type: "project_submitted",
    title: "Project Submitted: Neural Style Transfer App",
    description: "Your project has been submitted and is now featured on the showcase!",
    timestamp: "3 days ago",
    xp: 500,
    icon: "🚀",
  },
  {
    id: "activity-006",
    type: "badge_earned",
    title: "Badge Earned: Perfectionist",
    description: "Got 100% on your 5th quiz! You're a true perfectionist.",
    timestamp: "4 days ago",
    xp: 600,
    icon: "✨",
  },
];

// Deadlines
export const deadlines: Deadline[] = [
  {
    id: "deadline-001",
    title: "Data Visualization Dashboard",
    type: "bounty",
    deadline: "2024-12-15",
    priority: "high",
  },
  {
    id: "deadline-002",
    title: "Image Classification Pipeline",
    type: "bounty",
    deadline: "2024-12-18",
    priority: "high",
  },
  {
    id: "deadline-003",
    title: "Build a Sentiment Analyzer",
    type: "bounty",
    deadline: "2024-12-20",
    priority: "medium",
  },
  {
    id: "deadline-004",
    title: "Squad Project Review",
    type: "project",
    deadline: "2024-12-22",
    priority: "medium",
  },
  {
    id: "deadline-005",
    title: "AI Workshop Registration",
    type: "event",
    deadline: "2024-12-25",
    priority: "low",
  },
];

// Weekly Progress Data
export const weeklyProgress = [
  { day: "Mon", xp: 450, bounties: 2 },
  { day: "Tue", xp: 320, bounties: 1 },
  { day: "Wed", xp: 580, bounties: 3 },
  { day: "Thu", xp: 220, bounties: 1 },
  { day: "Fri", xp: 690, bounties: 2 },
  { day: "Sat", xp: 400, bounties: 1 },
  { day: "Sun", xp: 350, bounties: 2 },
];

// Leaderboard
export const leaderboard = [
  { rank: 1, name: "John Smith", xp: 15000, level: 32, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { rank: 2, name: "Jane Doe", xp: 14200, level: 30, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
  { rank: 3, name: "Mike Wilson", xp: 13100, level: 28, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { rank: 4, name: "Emily Brown", xp: 12500, level: 27, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily2" },
  { rank: 5, name: "Chris Lee", xp: 11800, level: 26, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" },
  { rank: 6, name: "Alex Chen", xp: 8450, level: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { rank: 7, name: "Sarah Kim", xp: 7200, level: 22, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { rank: 8, name: "David Park", xp: 4800, level: 18, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
];

// Navigation Items
export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "bounties", label: "Bounties", icon: "Target" },
  { id: "projects", label: "Projects", icon: "FolderKanban" },
  { id: "squad", label: "Squad", icon: "Users" },
  { id: "profile", label: "Profile", icon: "User" },
];

// Difficulty Colors
export const difficultyColors: Record<string, string> = {
  beginner: "#10b981",
  intermediate: "#f59e0b",
  advanced: "#f43f5e",
  expert: "#8b5cf6",
};

// Rarity Colors
export const rarityColors: Record<string, string> = {
  common: "#71717a",
  rare: "#3b82f6",
  epic: "#8b5cf6",
  legendary: "#f59e0b",
};

// Category Colors
export const categoryColors: Record<string, string> = {
  NLP: "#6366f1",
  "Computer Vision": "#f43f5e",
  "Conversational AI": "#10b981",
  "Data Science": "#f59e0b",
  "AI Agents": "#8b5cf6",
  "Speech AI": "#06b6d4",
  "Machine Learning": "#ec4899",
  "Generative AI": "#14b8a6",
};
