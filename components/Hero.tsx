"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import NationalRaceWidget from "./ui/NationalRaceWidget";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for reveal effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle mouse move for reveal effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-cream"
    >
      {/* Background Flowing Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Line 1 - Large curve on right */}
        <motion.svg
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-0 right-0 w-[60%] h-full"
          viewBox="0 0 600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M600 0 C 400 150, 500 300, 450 450 C 400 600, 550 750, 600 900"
            stroke="rgba(42, 47, 35, 0.06)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M550 0 C 350 200, 450 350, 400 500 C 350 650, 500 800, 550 900"
            stroke="rgba(42, 47, 35, 0.04)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.2, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Line 2 - Curve on left */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-[10%] left-0 w-[50%] h-[80%]"
          viewBox="0 0 500 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 100 C 150 150, 200 300, 150 450 C 100 600, 200 700, 100 800"
            stroke="rgba(42, 47, 35, 0.05)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 200 C 100 250, 150 350, 100 500 C 50 650, 150 750, 50 850"
            stroke="rgba(42, 47, 35, 0.03)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Line 3 - Center curves around portrait */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-[5%] left-[20%] w-[60%] h-[90%]"
          viewBox="0 0 600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M100 0 C 50 200, 150 400, 100 500 C 50 600, 150 700, 200 900"
            stroke="rgba(42, 47, 35, 0.04)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M500 0 C 550 200, 450 400, 500 500 C 550 600, 450 700, 400 900"
            stroke="rgba(42, 47, 35, 0.04)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, delay: 1, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Subtle lime accent line */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-[20%] left-[30%] w-[40%] h-[60%]"
          viewBox="0 0 400 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M50 0 C 0 150, 100 300, 50 400 C 0 500, 100 550, 80 600"
            stroke="rgba(212, 245, 30, 0.08)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      {/* Main Content Container */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center h-full px-6 pt-16"
      >
        {/* LN Logo with wireframe helmet */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-2"
        >
          {/* Wireframe helmet above logo */}
          <svg
            viewBox="0 0 120 50"
            className="w-28 h-12 stroke-dark-text/15 fill-none absolute -top-10 left-1/2 -translate-x-1/2"
          >
            <ellipse cx="60" cy="42" rx="45" ry="12" strokeWidth="0.5" />
            <path d="M18 38 Q 60 -5, 102 38" strokeWidth="0.5" />
            <path d="M22 39 Q 60 5, 98 39" strokeWidth="0.5" />
            <path d="M26 40 Q 60 12, 94 40" strokeWidth="0.5" />
            {[35, 47, 60, 73, 85].map((x) => (
              <line key={x} x1={x} y1="8" x2={x} y2="42" strokeWidth="0.5" />
            ))}
          </svg>
          
          {/* LN Logo */}
          <svg viewBox="0 0 28 28" className="w-6 h-6 text-dark-text">
            <path
              d="M4 4 L4 20 L10 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 20 L14 8 L20 20 L20 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Portrait Container with Hover Reveal Effect - Takes up most of the screen */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-full max-w-2xl lg:max-w-3xl flex-1 cursor-pointer"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Bottom Layer - Reveal Image (One Piece character / Helmet with visor) */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/portrait-reveal.jpg"
              alt="Reveal image"
              fill
              className="object-cover object-top"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {/* Fallback - cool visor/anime style */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-dark-text/5 to-dark-text/20 flex items-start justify-center pt-[15%]">
              <div className="w-[70%] aspect-[3/4] relative">
                {/* Face silhouette */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-text/30 via-dark-text/10 to-transparent rounded-t-[45%]" />
                {/* Visor/sunglasses effect */}
                <div className="absolute top-[28%] left-[8%] right-[8%] h-[12%] bg-gradient-to-r from-lime/50 via-dark-text/70 to-lime/50 rounded-full transform -skew-y-1" 
                  style={{ boxShadow: '0 0 30px rgba(212, 245, 30, 0.3)' }}
                />
              </div>
            </div>
          </div>

          {/* Top Layer - Main Portrait with mask */}
          <div 
            className="absolute inset-0 overflow-hidden transition-all duration-75"
            style={{
              maskImage: isHovering 
                ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 50%, black 80%, black 100%)`
                : 'none',
              WebkitMaskImage: isHovering 
                ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 50%, black 80%, black 100%)`
                : 'none',
            }}
          >
            <Image
              src="/assets/portrait.jpg"
              alt="Portrait"
              fill
              className="object-cover object-top"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {/* Fallback portrait */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-dark-text/10 flex items-start justify-center pt-[15%]">
              <div className="w-[70%] aspect-[3/4] bg-gradient-to-t from-dark-text/20 via-dark-text/5 to-transparent rounded-t-[45%]" />
            </div>
          </div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream via-cream/80 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* National Race Widget - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20">
        <NationalRaceWidget />
      </div>
    </section>
  );
}
