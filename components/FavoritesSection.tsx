"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface FavoriteItem {
  name: string;
  category: 'shows' | 'music' | 'food' | 'travel' | 'hobbies' | 'books';
  image?: string;
}

const categoryLabels: Record<FavoriteItem['category'], string> = {
  shows: 'Shows',
  music: 'Music',
  food: 'Food',
  travel: 'Travel',
  hobbies: 'Hobbies',
  books: 'Books',
};

const categoryColors: Record<FavoriteItem['category'], string> = {
  shows: 'from-purple-500/30 to-pink-500/30',
  music: 'from-lime/30 to-emerald-500/30',
  food: 'from-orange-500/30 to-red-500/30',
  travel: 'from-blue-500/30 to-cyan-500/30',
  hobbies: 'from-yellow-500/30 to-amber-500/30',
  books: 'from-indigo-500/30 to-violet-500/30',
};

// Sample favorites data - replace with actual data
const favorites: FavoriteItem[] = [
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
  { name: "Photography", category: "hobbies" },
  { name: "Yoga", category: "hobbies" },
  { name: "Atomic Habits", category: "books" },
  { name: "The Alchemist", category: "books" },
];

// Card path with diagonal cut at bottom-right (rotated 180° from NationalRaceWidget style)
// Creates a rectangle with rounded corners and a diagonal notch at bottom-right
const cornerRadius = 8;
const stepHeight = 24; // Height of the step from bottom
const diagonalStartX = 100; // X position where diagonal starts (from right)
const diagonalEndX = 80; // X position where diagonal meets bottom edge

const cardPath = `
  M 0.5 ${cornerRadius + 0.5}
  Q 0.5 0.5, ${cornerRadius + 0.5} 0.5
  L ${200 - cornerRadius - 0.5} 0.5
  Q 199.5 0.5, 199.5 ${cornerRadius + 0.5}
  L 199.5 ${200 - stepHeight - cornerRadius}
  Q 199.5 ${200 - stepHeight}, ${200 - cornerRadius - 0.5} ${200 - stepHeight}
  L ${diagonalStartX} ${200 - stepHeight}
  L ${diagonalEndX} 199.5
  L ${cornerRadius + 0.5} 199.5
  Q 0.5 199.5, 0.5 ${200 - cornerRadius - 0.5}
  Z
`;

// CSS clip-path polygon approximating the SVG path (percentage-based)
// Note: polygon can't do curves, so corners are simplified
const cardClipPath = `polygon(
  0% 0%,
  100% 0%,
  100% ${(200 - stepHeight - cornerRadius) / 2}%,
  ${diagonalStartX / 2}% ${(200 - stepHeight) / 2}%,
  ${diagonalEndX / 2}% 100%,
  0% 100%
)`;

function FavoriteCard({ item, index }: { item: FavoriteItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with diagonal cut at top-left */}
      <div className="relative aspect-square">
        {/* SVG for card shape with diagonal notch */}
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200" 
          preserveAspectRatio="none"
        >
          <path
            d={cardPath}
            fill="#2a2a2a"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Content Container with matching clip-path */}
        <div 
          className="absolute inset-[2px] overflow-hidden"
          style={{ clipPath: cardClipPath }}
        >
          {/* Gradient Background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${categoryColors[item.category]}`}
            animate={{ opacity: isHovered ? 0.6 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Image or Placeholder */}
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-6"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className={`w-1/2 h-1/2 rounded-full bg-gradient-to-br ${categoryColors[item.category]} opacity-60`}
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-lime/5"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Label positioned in the bottom strip after the diagonal cut */}
        <div className="absolute -bottom-0.5 right-1.5 text-right">
          <h3 className="text-[10px] md:text-xs font-display font-semibold text-white">
            {item.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function FavoritesSection() {
  return (
    <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[70vh] mb-16 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* Placeholder gradient - replace with actual hero image */}
          <div className="absolute inset-0 bg-gradient-to-b from-lime/10 via-[#1a1a1a]/50 to-[#1a1a1a]" />
          <div className="absolute inset-0 bg-[url('/assets/offtrack.png')] bg-cover bg-center opacity-30" />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-display leading-none">
              <span className="font-light text-white">Things I</span>
            </h2>
            <h2 className="text-5xl md:text-7xl font-display leading-none">
              <span className="font-bold text-white">Love</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-white/70 max-w-xl"
          >
            A personal collection of favorite shows, music, food, places, 
            hobbies, and books that bring joy to life off the track.
          </motion.p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {favorites.map((item, index) => (
            <FavoriteCard key={`${item.name}-${item.category}`} item={item} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            These are just a few of my favorite things
          </p>
        </motion.div>
      </div>
    </section>
  );
}
