"use client";

import GridSection, { GridItem } from "./GridSection";

const categoryColors: Record<string, string> = {
  shows: 'from-purple-500/30 to-pink-500/30',
  music: 'from-lime/30 to-emerald-500/30',
  food: 'from-orange-500/30 to-red-500/30',
  travel: 'from-blue-500/30 to-cyan-500/30',
  hobbies: 'from-yellow-500/30 to-amber-500/30',
  books: 'from-indigo-500/30 to-violet-500/30',
};

const favorites: GridItem[] = [
  { name: "Breaking Bad", category: "shows" },
  { name: "The Office", category: "shows" },
  { name: "Friends", category: "shows" },
  { name: "Taylor Swift", category: "music" },
  { name: "Ed Sheeran", category: "music" },
  { name: "Coldplay", category: "music" },
  { name: "Sushi", category: "food" },
  { name: "Pizza", category: "food" },
  { name: "Ice Cream", category: "food" },
  { name: "Paris", category: "travel" },
  { name: "Bali", category: "travel" },
  { name: "Tokyo", category: "travel" },
  { name: "Photography", category: "hobbies" },
  { name: "Yoga", category: "hobbies" },
  { name: "Atomic Habits", category: "books" },
  { name: "The Alchemist", category: "books" },
];

export default function FavoritesSection() {
  return (
    <GridSection
      titleLine1="Things I"
      titleLine2="Love"
      description="A personal collection of favorite shows, music, food, places, hobbies, and books that bring joy to life off the track."
      heroImage="/assets/offtrack.png"
      items={favorites}
      categoryColors={categoryColors}
      backgroundColor="#1a1a1a"
    />
  );
}
