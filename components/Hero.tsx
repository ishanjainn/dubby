"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import NationalRaceWidget from "./ui/NationalRaceWidget";

interface BrushMark {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [brushMarks, setBrushMarks] = useState<BrushMark[]>([]);
  const markIdRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Transform values for scroll-based shrinking effect
  // Shrinks in first 40% of scroll, then stays at final size (smaller to show more text)
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.4, 0.4]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 1], [0, 16, 16]);
  const widgetOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Add padding around hero as it shrinks to reveal section behind
  const padding = useTransform(scrollYProgress, [0, 0.4, 1], [0, 80, 80]);
  // Signature draw progress (draws during 40%-80% of scroll)
  const signatureProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  // Signature only visible when drawing starts
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.39, 0.4], [0, 0, 1]);
  // Hero background transitions from cream to gray (like Lando's message section card)
  const heroBackground = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4],
    ["#F5F5F0", "#5A5F54", "#4A4F44"]
  );
  // Flowing lines on cream section fade out
  // Marquee text opacity - visible immediately as dark edges appear
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  // Brush effect disabled when hero shrinks
  const brushEnabled = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Handle mouse move to create brush trail that reveals image below
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Disable brush when hero is shrunk
    if (!imageRef.current || brushEnabled.get() < 0.5) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create a new brush mark - 3x bigger size for reveal effect
    const newMark: BrushMark = {
      id: markIdRef.current++,
      x,
      y,
      size: 240 + Math.random() * 180,
      rotation: Math.random() * 360,
    };
    
    setBrushMarks(prev => [...prev, newMark]);
    
    // Remove the mark after a short delay
    setTimeout(() => {
      setBrushMarks(prev => prev.filter(mark => mark.id !== newMark.id));
    }, 600);
  }, [brushEnabled]);

  return (
    <div ref={wrapperRef} className="relative h-[180vh] bg-[#2A2F23]">
      {/* Background lines are now global - rendered in BackgroundLines component */}

      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center z-10"
        style={{ padding }}
      >
        {/* "Message from Smrity" title - centered above hero card */}
        <motion.div 
          className="absolute top-[20%] left-0 right-0 z-[2] flex items-center justify-center pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          <span className="text-[10px] tracking-[0.25em] text-cream/70 uppercase">Message from Smrity</span>
        </motion.div>

        {/* Scrolling Marquee Text - on dark wrapper, behind hero card */}
        <motion.div 
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          {/* Top row - scrolling left - lime yellow */}
          <div className="absolute top-[36%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-left">
            <span className="text-[6vw] font-black text-[#C4D468] mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[6vw] font-black text-[#C4D468] mx-6 italic tracking-tight">DREAMS COME TRUE</span>
            <span className="text-[6vw] font-black text-[#C4D468] mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[6vw] font-black text-[#C4D468] mx-6 italic tracking-tight">DREAMS COME TRUE</span>
          </div>
          {/* Bottom row - scrolling right - cream/off-white */}
          <div className="absolute top-[52%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-right">
            <span className="text-[6vw] font-black text-[#E8E4D9]/80 mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[6vw] font-black text-[#E8E4D9]/80 mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
            <span className="text-[6vw] font-black text-[#E8E4D9]/80 mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[6vw] font-black text-[#E8E4D9]/80 mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
          </div>
        </motion.div>

        <motion.section
          className="relative w-full h-full overflow-hidden z-[5]"
          style={{ scale, borderRadius, backgroundColor: heroBackground }}
        >
      {/* Background lines handled by global BackgroundLines component */}

      {/* Hero Portrait Image - Bottom aligned with reveal effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 z-10 flex items-end justify-center"
      >
        <div 
          ref={imageRef}
          className="relative w-[85%] h-[85%] max-w-4xl cursor-pointer"
          onMouseMove={handleMouseMove}
        >
          {/* Main Portrait - Always visible on top, becomes grayscale as shrinks */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              filter: useTransform(
                scrollYProgress,
                [0, 0.4],
                ["grayscale(0) brightness(1)", "grayscale(1) brightness(0.7)"]
              ),
            }}
          >
            <Image
              src="/hero.png"
              alt="Smrity Dubey"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>

          {/* Brush Reveal Marks - Show the reveal image only where brush strokes are */}
          <AnimatePresence>
            {brushMarks.map((mark) => (
              <motion.div
                key={mark.id}
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute pointer-events-none z-20 overflow-hidden"
                style={{
                  left: mark.x - mark.size / 2,
                  top: mark.y - mark.size / 2,
                  width: mark.size,
                  height: mark.size,
                  borderRadius: '50%',
                }}
              >
                {/* Reveal image clipped to brush shape */}
                <div 
                  className="absolute"
                  style={{
                    width: imageRef.current?.offsetWidth || 1000,
                    height: imageRef.current?.offsetHeight || 1000,
                    left: -(mark.x - mark.size / 2),
                    top: -(mark.y - mark.size / 2),
                  }}
                >
                  <Image
                    src="/hero-reveal.png"
                    alt="Reveal"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

        {/* National Race Widget - Bottom Left */}
        <motion.div 
          className="absolute bottom-6 left-6 z-20"
          style={{ opacity: widgetOpacity }}
        >
          <NationalRaceWidget />
        </motion.div>
        </motion.section>

        {/* Animated Signature - Positioned over hero but extends beyond */}
        <motion.svg
          className="absolute z-40 pointer-events-none"
          style={{ 
            width: '120vw',
            height: '100vh',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: signatureOpacity
          }}
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* First diagonal stroke - top right sweeping down */}
          <motion.path
            d="M900 80 Q 700 200, 500 450 Q 350 600, 200 720"
            stroke="#D4F51E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: signatureProgress }}
          />
          {/* Large looping curve around center */}
          <motion.path
            d="M800 150 Q 1000 280, 950 450 Q 900 620, 700 550 Q 500 480, 550 350 Q 600 220, 800 280"
            stroke="#D4F51E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: signatureProgress }}
          />
          {/* Wide sweeping underline extending left */}
          <motion.path
            d="M150 650 Q 400 720, 600 620 Q 800 520, 1050 600"
            stroke="#D4F51E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: signatureProgress }}
          />
          {/* Dramatic S curve on left side */}
          <motion.path
            d="M350 200 Q 200 350, 320 480 Q 440 610, 300 700"
            stroke="#D4F51E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: signatureProgress }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
