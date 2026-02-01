"use client";

import GridSection, { GridItem } from "./GridSection";

const categoryColors: Record<string, string> = {
  win: 'from-lime/30 to-emerald-500/30',
  podium: 'from-orange-500/30 to-amber-500/30',
  pole: 'from-purple-500/30 to-pink-500/30',
  milestone: 'from-blue-500/30 to-cyan-500/30',
  championship: 'from-yellow-500/30 to-amber-500/30',
};

const careerItems: GridItem[] = [
  { name: "First Win", category: "win", image: "/assets/career/ch-1.jpg" },
  { name: "Miami GP", category: "win", image: "/assets/career/ch-2.jpg" },
  { name: "Dutch GP", category: "win", image: "/assets/career/ch-3.jpg" },
  { name: "Singapore GP", category: "win", image: "/assets/career/ch-4.jpg" },
  { name: "Monza Podium", category: "podium", image: "/assets/career/ch-5.jpg" },
  { name: "Silverstone P2", category: "podium", image: "/assets/career/ch-6.jpg" },
  { name: "Brazil Pole", category: "pole", image: "/assets/career/ch-7.jpg" },
  { name: "100th Race", category: "milestone", image: "/assets/career/ch-8.jpg" },
  { name: "Monaco Podium", category: "podium", image: "/assets/career/ch-9.jpg" },
  { name: "Imola P3", category: "podium", image: "/assets/career/ch-10.jpg" },
  { name: "F1 Debut", category: "milestone", image: "/assets/career/ch-11.jpg" },
  { name: "F2 Runner-Up", category: "championship", image: "/assets/career/ch-12.jpg" },
  { name: "Euro F3 Champ", category: "championship", image: "/assets/career/ch-13.jpg" },
  { name: "MSA Formula", category: "championship", image: "/assets/career/ch-14.jpg" },
  { name: "Ginetta Junior", category: "championship", image: "/assets/career/ch-15.jpg" },
  { name: "Karting World", category: "championship", image: "/assets/career/ch-16.jpg" },
];

export default function CareerSection() {
  return (
    <GridSection
      titleLine1="Career"
      titleLine2="Highlights"
      description="From karting champion to Formula 1 race winner, a journey of dedication, speed, and unforgettable moments."
      heroImage="/assets/ontrack.png"
      items={careerItems}
      categoryColors={categoryColors}
      backgroundColor="#1a1a1a"
    />
  );
}
