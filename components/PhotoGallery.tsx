"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  location: string;
  date: string;
  width: number;
  height: number;
  top: string;
  left: string;
}

// Scattered layout - positions across entire viewport
const galleryImages: GalleryImage[] = [
  { src: "/assets/gallery-1.jpg", location: "Monaco", date: "2023", width: 220, height: 280, top: "5%", left: "12%" },
  { src: "/assets/gallery-2.jpg", location: "High Performance Gala", date: "2024", width: 180, height: 240, top: "12%", left: "55%" },
  { src: "/assets/gallery-3.jpg", location: "Miami GP", date: "2024", width: 90, height: 500, top: "35%", left: "3%" },
  { src: "/assets/gallery-4.jpg", location: "Britain", date: "2025", width: 280, height: 340, top: "42%", left: "22%" },
  { src: "/assets/gallery-5.jpg", location: "Battersea", date: "2024", width: 200, height: 280, top: "58%", left: "48%" },
  { src: "/assets/gallery-6.jpg", location: "Barcelona", date: "2024", width: 320, height: 520, top: "8%", left: "78%" },
];

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  
  // Background: dark green → cream
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#2A2F23", "#8A8A7A", "#F5F5F0"]
  );

  // Text color transition
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#E8E4D9", "#4A4A3A", "#2A2F23"]
  );

  const labelColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(232, 228, 217, 0.5)", "rgba(42, 47, 35, 0.4)", "rgba(42, 47, 35, 0.5)"]
  );

  return (
    <motion.section 
      ref={containerRef} 
      className="relative h-[200vh]"
      style={{ backgroundColor }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontally scrolling content */}
        <motion.div
          className="absolute inset-0"
          style={{ x }}
        >
          {/* Wide container for horizontal scroll */}
          <div className="relative h-full" style={{ width: "200vw" }}>
            
            {/* First Quote - top left area */}
            <motion.div
              className="absolute w-[280px]"
              style={{ color: textColor, top: "38%", left: "3%" }}
            >
              <p className="text-xl md:text-2xl font-display leading-[1.3] italic">
                It doesn&apos;t matter <span className="font-normal not-italic">where</span> you start,
                it&apos;s <span className="font-normal not-italic">how</span> you progress from there.
              </p>
              <motion.svg
                viewBox="0 0 200 80"
                className="w-24 h-8 mt-4 stroke-lime fill-none"
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
              </motion.svg>
            </motion.div>

            {/* Scattered Gallery Images */}
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{ 
                  width: image.width,
                  top: image.top,
                  left: image.left,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                {/* Label */}
                <motion.span 
                  className="block text-[9px] tracking-[0.15em] mb-2 uppercase"
                  style={{ color: labelColor }}
                >
                  {image.location}, {image.date}
                </motion.span>
                
                {/* Image */}
                <div 
                  className="relative overflow-hidden"
                  style={{ width: image.width, height: image.height }}
                >
                  <Image
                    src={image.src}
                    alt={`${image.location}, ${image.date}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-green/30 to-dark-text/50" />
                </div>
              </motion.div>
            ))}

            {/* Second Quote - right side */}
            <motion.div
              className="absolute w-[300px]"
              style={{ color: textColor, top: "65%", left: "75%" }}
            >
              <p className="text-lg md:text-xl font-display leading-[1.3] italic">
                Since I was 7 years old and had my first experience with kart racing, I&apos;ve
                worked tirelessly to make that dream come true.
              </p>
              <motion.svg
                viewBox="0 0 200 80"
                className="w-24 h-8 mt-4 stroke-current opacity-40 fill-none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 20 L20 60 L50 60 Q70 60, 80 45 Q90 30, 110 40 Q130 50, 150 35 Q170 20, 180 30" />
              </motion.svg>
            </motion.div>

            {/* Badge */}
            <motion.div 
              className="absolute"
              style={{ top: "75%", left: "25%" }}
            >
              <div className="flex items-center gap-2 px-3 py-2 border border-current/20">
                <motion.span 
                  className="text-xl font-display font-bold"
                  style={{ color: textColor }}
                >
                  1
                </motion.span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-lime">
                  <path d="M4 15l4-8l4 8M6 11h4M15 7v10M19 7l-4 5l4 5" />
                </svg>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
