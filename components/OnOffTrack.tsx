"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OnOffTrack() {
  const [hoveredSide, setHoveredSide] = useState<"on" | "off" | null>(null);

  return (
    <section className="relative min-h-screen w-full bg-cream">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* ON TRACK Side */}
        <Link
          href="/on-track"
          className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden group"
          onMouseEnter={() => setHoveredSide("on")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image - Helmet */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: hoveredSide === "on" ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/assets/lando-helmet.jpg"
              alt="Lando with helmet"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime/30 to-dark-green/60" />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-dark-green/40"
            animate={{
              opacity: hoveredSide === "on" ? 0.2 : 0.4,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start h-full p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-8xl font-display font-light text-cream leading-none">
                ON
              </h2>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-cream leading-none">
                TRACK
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-cream/80 max-w-sm"
            >
              Most recent <span className="font-bold text-cream">results</span>, career
              stats and photos from trackside.
            </motion.p>

            {/* Arrow */}
            <motion.div
              className="mt-8"
              animate={{
                x: hoveredSide === "on" ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="stroke-cream fill-none"
                strokeWidth="1.5"
              >
                <circle cx="20" cy="20" r="19" />
                <path d="M15 20h10M21 16l4 4-4 4" />
              </svg>
            </motion.div>
          </div>
        </Link>

        {/* OFF TRACK Side */}
        <Link
          href="/off-track"
          className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden group"
          onMouseEnter={() => setHoveredSide("off")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image - Portrait */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: hoveredSide === "off" ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/assets/lando-casual.jpg"
              alt="Lando casual"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cream/30 to-dark-text/60" />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-dark-text/40"
            animate={{
              opacity: hoveredSide === "off" ? 0.2 : 0.4,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-end h-full p-8 md:p-16 text-right">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-8xl font-display font-light text-cream leading-none">
                OFF
              </h2>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-cream leading-none">
                TRACK
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-cream/80 max-w-sm"
            >
              <span className="font-bold text-cream">Campaigns</span>, shoots and other
              such promotional materials for fans
            </motion.p>

            {/* Arrow */}
            <motion.div
              className="mt-8"
              animate={{
                x: hoveredSide === "off" ? -10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="stroke-cream fill-none"
                strokeWidth="1.5"
              >
                <circle cx="20" cy="20" r="19" />
                <path d="M15 20h10M21 16l4 4-4 4" />
              </svg>
            </motion.div>
          </div>
        </Link>
      </div>
    </section>
  );
}
