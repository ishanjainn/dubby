"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const partners = [
  { name: "Ralph Lauren", logo: "RL" },
  { name: "Mind", logo: "MIND" },
  { name: "PlayStation", logo: "PS" },
  { name: "Quadrant", logo: "Q" },
  { name: "TUMI", logo: "TUMI" },
  { name: "Hilton", logo: "H" },
  { name: "Uber", logo: "UBER" },
  { name: "LN Kart", logo: "LNK" },
  { name: "Bell Helmets", logo: "BELL" },
  { name: "Pure Electric", logo: "PE" },
  { name: "Google", logo: "G" },
];

export default function PartnersSection() {
  return (
    <section className="relative py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-7xl font-display leading-none">
            <span className="font-light text-dark-text">Partners</span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-display leading-none">
            <span className="font-bold text-dark-text">&amp; Campaigns</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-dark-text/70 max-w-xl mb-12"
        >
          Lando is proud to collaborate with a range of partners, who share his passion
          for performance across a range of industries.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-green text-cream rounded-full hover:bg-dark-text transition-colors"
          >
            View Partnerships
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

        {/* Logo Carousel - Infinite scroll */}
        <div className="relative overflow-hidden py-8">
          {/* First row - scrolling left */}
          <motion.div
            className="flex gap-12 mb-8"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-dark-text/5 rounded-lg px-4 hover:bg-lime/20 transition-colors cursor-pointer"
              >
                <span className="text-lg font-bold text-dark-text/60 tracking-wider">
                  {partner.logo}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Second row - scrolling right */}
          <motion.div
            className="flex gap-12"
            animate={{ x: [-500, 500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-dark-text/5 rounded-lg px-4 hover:bg-lime/20 transition-colors cursor-pointer"
              >
                <span className="text-lg font-bold text-dark-text/60 tracking-wider">
                  {partner.logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Interactive element placeholder (Rive animation in original) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 relative h-64 bg-gradient-to-br from-dark-green/10 to-lime/10 rounded-3xl overflow-hidden flex items-center justify-center"
        >
          {/* Animated circles */}
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-lime/20"
            animate={{
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-dark-green/10"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [30, -30, 30],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-lime/30"
            animate={{
              scale: [1, 1.3, 1],
              x: [-40, 40, -40],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Center content */}
          <div className="relative z-10 text-center">
            <p className="text-dark-text/60 text-sm tracking-wider uppercase">
              Interactive partnerships showcase
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
