"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Helmet {
  name: string;
  year: string;
  baseImage: string;
  hoverImage: string;
}

const helmets: Helmet[] = [
  { name: "Season", year: "2025", baseImage: "/assets/helmets/2025-season-base.jpg", hoverImage: "/assets/helmets/2025-season-hover.jpg" },
  { name: "Discoball", year: "2025", baseImage: "/assets/helmets/2025-discoball-base.jpg", hoverImage: "/assets/helmets/2025-discoball-hover.jpg" },
  { name: "Dark Glitter", year: "2025", baseImage: "/assets/helmets/2025-dark-glitter-base.jpg", hoverImage: "/assets/helmets/2025-dark-glitter-hover.jpg" },
  { name: "Season", year: "2024", baseImage: "/assets/helmets/2024-season-base.jpg", hoverImage: "/assets/helmets/2024-season-hover.jpg" },
  { name: "Porcelain", year: "2024", baseImage: "/assets/helmets/2024-porcelain-base.jpg", hoverImage: "/assets/helmets/2024-porcelain-hover.jpg" },
  { name: "Japan", year: "2024", baseImage: "/assets/helmets/2024-japan-base.jpg", hoverImage: "/assets/helmets/2024-japan-hover.jpg" },
  { name: "GIF", year: "2024", baseImage: "/assets/helmets/2024-gif-base.jpg", hoverImage: "/assets/helmets/2024-gif-hover.jpg" },
  { name: "Dark Mode", year: "2024", baseImage: "/assets/helmets/2024-dark-mode-base.jpg", hoverImage: "/assets/helmets/2024-dark-mode-hover.jpg" },
  { name: "Race 100", year: "2023", baseImage: "/assets/helmets/2023-race-base.jpg", hoverImage: "/assets/helmets/2023-race-hover.jpg" },
  { name: "Las Vegas", year: "2023", baseImage: "/assets/helmets/2023-vegas-base.jpg", hoverImage: "/assets/helmets/2023-vegas-hover.jpg" },
  { name: "Chrome", year: "2023", baseImage: "/assets/helmets/2023-chrome-base.jpg", hoverImage: "/assets/helmets/2023-chrome-hover.jpg" },
  { name: "Beachball", year: "2023", baseImage: "/assets/helmets/2023-beachball-base.jpg", hoverImage: "/assets/helmets/2023-beachball-hover.jpg" },
];

function HelmetCard({ helmet, index }: { helmet: Helmet; index: number }) {
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
      {/* Helmet Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-dark-text/5 to-dark-text/10">
        {/* Base Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={helmet.baseImage}
            alt={`${helmet.name} ${helmet.year} helmet`}
            fill
            className="object-contain p-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {/* Fallback - helmet silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-lime/20 to-dark-green/30" />
          </div>
        </motion.div>

        {/* Hover Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={helmet.hoverImage}
            alt={`${helmet.name} ${helmet.year} helmet alternate view`}
            fill
            className="object-contain p-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {/* Fallback - rotated helmet silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tl from-lime/30 to-dark-green/40 rotate-12" />
          </div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream via-cream/80 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-lime/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-display font-semibold text-dark-text">
          {helmet.name}
        </h3>
        <p className="text-sm text-dark-text/60">{helmet.year}</p>
      </div>
    </motion.div>
  );
}

export default function HelmetsSection() {
  return (
    <section className="relative py-24 bg-cream overflow-hidden">
      {/* Hero Helmet Image */}
      <div className="relative h-[50vh] md:h-[70vh] mb-16 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/lando-helmet-large.jpg"
            alt="Lando lifting helmet"
            fill
            className="object-cover object-top"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-lime/20 via-cream/30 to-cream" />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-display leading-none">
              <span className="font-light text-dark-text">Helmets</span>
            </h2>
            <h2 className="text-5xl md:text-7xl font-display leading-none">
              <span className="font-bold text-dark-text">Hall of Fame</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-dark-text/70 max-w-xl"
          >
            From his iconic blobs to innovative one-off designs, Lando has always been
            passionate about designing innovative and memorable helmets.
          </motion.p>
        </div>
      </div>

      {/* Helmet Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {helmets.map((helmet, index) => (
            <HelmetCard key={`${helmet.name}-${helmet.year}`} helmet={helmet} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-text/60 mb-4">
            See more helmets and highlights from Lando on the track
          </p>
          <Link
            href="/on-track"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-green text-cream rounded-full hover:bg-dark-text transition-colors"
          >
            View On Track
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
