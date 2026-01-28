"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const storeImages = [
  "/assets/store/merch-1.jpg",
  "/assets/store/merch-2.jpg",
  "/assets/store/merch-3.jpg",
  "/assets/store/merch-4.jpg",
  "/assets/store/merch-5.jpg",
];

export default function StoreSection() {
  return (
    <section className="relative py-24 bg-dark-green overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(212, 245, 30, 0.1) 50px,
            rgba(212, 245, 30, 0.1) 100px
          )`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs tracking-[0.3em] text-lime uppercase">
            Lando Store
          </span>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-display text-cream leading-tight">
            World Drivers&apos;
            <br />
            <span className="font-bold">Champion</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-cream/70 max-w-xl mb-12"
        >
          Celebrate this incredible moment with a collection designed for the fans who
          never stopped believing. Wear it, frame it, treasure it forever.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <Link
            href="https://landonorris.store/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lime text-dark-green rounded-full font-semibold hover:bg-lime/90 transition-colors"
          >
            Visit the Store
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>

        {/* Product Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {storeImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Store merchandise ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime/30 to-dark-text/50" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-lime/0 group-hover:bg-lime/10 transition-colors duration-500" />

              {/* Gold shimmer effect for championship merch */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 text-[30rem] font-display font-bold text-lime leading-none pointer-events-none select-none"
        >
          1
        </motion.div>
      </div>
    </section>
  );
}
