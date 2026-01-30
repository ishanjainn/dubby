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
  { name: "First Win", category: "win" },
  { name: "Miami GP", category: "win" },
  { name: "Dutch GP", category: "win" },
  { name: "Singapore GP", category: "win" },
  { name: "Monza Podium", category: "podium" },
  { name: "Silverstone P2", category: "podium" },
  { name: "Brazil Pole", category: "pole" },
  { name: "100th Race", category: "milestone" },
  { name: "Monaco Podium", category: "podium" },
  { name: "Imola P3", category: "podium" },
  { name: "F1 Debut", category: "milestone" },
  { name: "F2 Runner-Up", category: "championship" },
  { name: "Euro F3 Champ", category: "championship" },
  { name: "MSA Formula", category: "championship" },
  { name: "Ginetta Junior", category: "championship" },
  { name: "Karting World", category: "championship" },
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
