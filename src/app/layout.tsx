import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Squads Student Portal | Premium Dashboard",
  description: "Premium student portal for AI Squads - Track your progress, earn badges, complete bounties, and collaborate with your squad. Experience gamified learning with XP, levels, and achievements.",
  keywords: ["AI Squads", "Student Portal", "Learning", "Gamification", "XP", "Badges", "Bounties", "Projects"],
  authors: [{ name: "AI Squads Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AI Squads Student Portal",
    description: "Premium gamified learning experience for AI students",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        <div className="dark">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
