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
  { name: "One Piece", category: "shows", image: "/assets/favorites/fh-1.jpg" },
  { name: "Dal Pitti", category: "shows", image: "/assets/favorites/fh-2.jpg" },
  { name: "Maxxxyyyy", category: "shows", image: "/assets/favorites/fh-3.jpg" },
  { name: "The Lumineers", category: "music", image: "/assets/favorites/fh-4.jpg" },
  { name: "Disneyland Paris", category: "travel", image: "/assets/favorites/fh-5.jpg" },
  { name: "Momos", category: "food", image: "/assets/favorites/fh-6.jpg" },
  { name: "Demon Slayer", category: "shows", image: "/assets/favorites/fh-7.jpg" },
  { name: "Anywhere in Japan", category: "travel", image: "/assets/favorites/fh-8.jpg" },
  { name: "Dooron Dooron", category: "shows", image: "/assets/favorites/fh-9.jpg" },
  { name: "Ramen", category: "food", image: "/assets/favorites/fh-10.jpg" },
  { name: "Gol Gappe in Sec-56", category: "food", image: "/assets/favorites/fh-11.jpg" },
  { name: "Radwimps - Nandemonaiya", category: "music", image: "/assets/favorites/fh-12.jpg" },
  { name: "Lemme Sleep", category: "hobbies", image: "/assets/favorites/fh-13.jpg" },
  { name: "Chhath Pooja", category: "hobbies", image: "/assets/favorites/fh-14.jpg" },
  { name: "Lilies or any cute flowers :)", category: "hobbies", image: "/assets/favorites/fh-15.jpg" },
  { name: "The Alchemist", category: "books", image: "/assets/favorites/fh-16.jpg" },
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
