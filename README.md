# AI Squads Student Portal - Premium Redesign 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> A complete redesign of the AI Squads Student Portal (portal.aisquads.org) - transforming a functional interface into a premium, gamified learning experience.

![AI Squads Portal](https://via.placeholder.com/1200x600/0a0a0f/6366f1?text=AI+Squads+Portal+Redesign)

## 🎯 Challenge Submission

This project is a submission for the **AI Squads Student Portal Redesign Challenge**. The goal was to redesign the portal with a fresh visual direction, improved UX, and premium features.

## ✨ Key Features

### 🎮 Gamification System
- **XP & Leveling** - Earn XP for completing bounties, submitting projects, and maintaining streaks
- **Badge System** - 4 rarity tiers (Common, Rare, Epic, Legendary) with distinct visual treatments
- **Streak Tracking** - Daily engagement tracking with fire animations
- **Leaderboards** - Real-time ranking with relative position visualization

### 🎨 Premium Design
- **Glassmorphism** - Frosted glass cards with backdrop blur effects
- **Gradient Accents** - Indigo-to-purple color scheme throughout
- **Micro-animations** - Fade-in, scale, and count-up animations
- **Dark Theme** - Eye-friendly dark palette optimized for extended use

### 📱 Responsive Design
- Collapsible sidebar that adapts to screen size
- Mobile-optimized header with quick navigation
- Touch-friendly interactive elements
- Fluid grid layouts for all breakpoints

### 🖥️ Pages

| Page | Description |
|------|-------------|
| **Dashboard** | Personalized hero section, weekly progress chart, upcoming deadlines, activity feed, leaderboard preview |
| **Bounties** | Filterable bounty cards with difficulty levels, XP rewards, deadline countdowns, and progress tracking |
| **Projects** | Portfolio showcase with featured projects, thumbnails, engagement metrics, and tag filtering |
| **Squad** | Member directory with online status, level badges, and quick action buttons |
| **Profile** | Achievement showcase, badge progress, activity history, and XP progression ring |

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS keyframes + transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-squads-portal-redesign.git

# Navigate to project directory
cd ai-squads-portal-redesign

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main portal page with navigation
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Design system & animations
├── components/
│   ├── Dashboard.tsx     # Dashboard with charts & activity feed
│   ├── Bounties.tsx      # Bounties section with filters
│   ├── Projects.tsx      # Projects showcase
│   ├── Squad.tsx         # Member directory
│   ├── Profile.tsx       # User profile page
│   ├── Sidebar.tsx       # Collapsible navigation sidebar
│   ├── GlassCard.tsx     # Premium glass card component
│   ├── ProgressRing.tsx  # Animated SVG progress rings
│   ├── AnimatedNumber.tsx# Counting animations
│   └── StatCard.tsx      # Stats display cards
└── lib/
    ├── mockData.ts       # Mock data for demonstration
    └── utils.ts          # Utility functions
```

## 🎨 Design Decisions

### Why Dark Theme?
Reduces eye strain during extended use, preferred by the target developer audience, and allows vibrant accent colors to stand out effectively.

### Why Glassmorphism?
Creates visual depth and hierarchy, adds a premium feel without overwhelming users, and separates content layers intuitively.

### Why XP & Leveling?
Provides clear progression metrics, motivates continued engagement, and creates tangible achievement milestones.

### Why Progress Rings?
Visually engaging representation of progress, more impactful than simple progress bars, and works well at various sizes from small indicators to hero elements.

## 🔧 Customization

### Colors
The design system uses CSS custom properties defined in `globals.css`:

```css
--accent-primary: #6366f1;    /* Indigo */
--accent-secondary: #8b5cf6;  /* Purple */
--accent-success: #10b981;    /* Emerald */
--accent-warning: #f59e0b;    /* Amber */
--accent-error: #f43f5e;      /* Rose */
```

### Adding New Pages
1. Create a new component in `src/components/`
2. Add navigation item in `src/lib/mockData.ts`
3. Add icon mapping in `src/components/Sidebar.tsx`
4. Add route handling in `src/app/page.tsx`

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/0a0a0f/6366f1?text=Dashboard)

### Bounties
![Bounties](https://via.placeholder.com/800x450/0a0a0f/8b5cf6?text=Bounties)

### Projects
![Projects](https://via.placeholder.com/800x450/0a0a0f/06b6d4?text=Projects)

### Squad Directory
![Squad](https://via.placeholder.com/800x450/0a0a0f/10b981?text=Squad)

### Profile
![Profile](https://via.placeholder.com/800x450/0a0a0f/f59e0b?text=Profile)

## 🤝 Contributing

This is a design challenge submission, but suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from [Linear](https://linear.app), [Vercel](https://vercel.com), and [Stripe](https://stripe.com)
- Gamification concepts from gaming platforms like Steam and Xbox
- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Lucide Icons](https://lucide.dev)

---

**Made with ❤️ for the AI Squads Design Challenge**
