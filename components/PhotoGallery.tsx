"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  location: string;
  date: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/assets/gallery-1.jpg", location: "Qatar", date: "2024" },
  { src: "/assets/gallery-2.jpg", location: "FIA Prize Giving", date: "2024" },
  { src: "/assets/gallery-3.jpg", location: "Miami GP", date: "2024" },
  { src: "/assets/gallery-4.jpg", location: "Monaco", date: "2023" },
  { src: "/assets/gallery-5.jpg", location: "Britain", date: "2025" },
  { src: "/assets/gallery-6.jpg", location: "Battersea", date: "2024" },
  { src: "/assets/gallery-7.jpg", location: "High Performance Gala", date: "2024" },
  { src: "/assets/gallery-8.jpg", location: "Barcelona", date: "2024" },
  { src: "/assets/gallery-9.jpg", location: "Austria", date: "2020" },
  { src: "/assets/gallery-10.jpg", location: "US", date: "2024" },
];

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="relative py-24 bg-cream overflow-hidden">
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 mb-16 text-center"
      >
        <p className="text-2xl md:text-4xl font-display text-dark-text leading-relaxed">
          It doesn&apos;t matter <span className="italic text-dark-text/60">where</span> you start,
          it&apos;s <span className="italic text-dark-text/60">how</span> you progress from there.
        </p>
        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <svg
            viewBox="0 0 200 80"
            className="w-40 h-16 mx-auto stroke-lime fill-none"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <motion.path
              d="M20 20 L20 60 L50 60 Q70 60, 80 45 Q90 30, 110 40 Q130 50, 150 35 Q170 20, 180 30"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Horizontal Scrolling Gallery */}
      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-6 px-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex-shrink-0 w-[300px] md:w-[400px] group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-dark-text/10">
                <Image
                  src={image.src}
                  alt={`${image.location}, ${image.date}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-green/20 to-dark-text/30" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-dark-green/0 group-hover:bg-dark-green/20 transition-colors duration-500" />
              </div>

              {/* Label */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm font-medium text-dark-text">
                  {image.location}
                </span>
                <span className="text-xs text-dark-text/50">{image.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 mt-24 text-center"
      >
        <p className="text-xl md:text-2xl text-dark-text/80 leading-relaxed">
          Since I was 7 years old and had my first experience with kart racing, I&apos;ve
          worked tirelessly to make that dream come true.
        </p>
        {/* Dark Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <svg
            viewBox="0 0 200 80"
            className="w-48 h-20 mx-auto stroke-dark-green fill-none"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M20 20 L20 60 L50 60 Q70 60, 80 45 Q90 30, 110 40 Q130 50, 150 35 Q170 20, 180 30" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 mt-16"
      >
        <div className="flex items-center gap-2 px-6 py-3 bg-dark-green rounded-full">
          <span className="text-4xl font-display font-bold text-lime">1</span>
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-cream"
          >
            <path d="M4 15l4-8l4 8M6 11h4M15 7v10M19 7l-4 5l4 5" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
