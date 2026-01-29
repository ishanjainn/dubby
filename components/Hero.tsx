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
  // Add padding around hero as it shrinks to reveal section behind (smaller on mobile)
  const padding = useTransform(scrollYProgress, [0, 0.4, 1], [0, 40, 40]);
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
    
    // Create a new brush mark - responsive size (smaller on mobile)
    const isMobile = window.innerWidth < 768;
    const baseSize = isMobile ? 120 : 240;
    const randomSize = isMobile ? 90 : 180;
    const newMark: BrushMark = {
      id: markIdRef.current++,
      x,
      y,
      size: baseSize + Math.random() * randomSize,
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
          className="absolute top-[15%] md:top-[20%] left-0 right-0 z-[2] flex items-center justify-center pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] text-cream/70 uppercase">Message from Smrity</span>
        </motion.div>

        {/* Scrolling Marquee Text - on dark wrapper, behind hero card */}
        <motion.div 
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          {/* Top row - scrolling left - lime yellow */}
          <div className="absolute top-[36%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-left">
            <span className="text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">DREAMS COME TRUE</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">DREAMS COME TRUE</span>
          </div>
          {/* Bottom row - scrolling right - cream/off-white */}
          <div className="absolute top-[52%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-right">
            <span className="text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
          </div>
        </motion.div>

        <motion.section
          className="relative w-full h-full overflow-hidden z-[5]"
          style={{ scale, borderRadius, backgroundColor: heroBackground }}
        >
      {/* Background lines - rendered inside hero so they show above background color */}
      <motion.svg 
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none" 
        viewBox="0 0 1000 1000" 
        fill="none" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top horizontal flowing lines */}
        <motion.path 
          d="M-100 50 Q 200 -10, 500 80 Q 800 170, 1100 60" 
          stroke="rgba(160, 155, 120, 0.35)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 50 Q 200 -10, 500 80 Q 800 170, 1100 60",
            "M-100 90 Q 200 150, 500 40 Q 800 -50, 1100 100",
            "M-100 30 Q 200 -70, 500 120 Q 800 230, 1100 20",
            "M-100 50 Q 200 -10, 500 80 Q 800 170, 1100 60",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M-100 120 Q 250 60, 500 150 Q 750 240, 1100 130" 
          stroke="rgba(160, 155, 120, 0.3)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 120 Q 250 60, 500 150 Q 750 240, 1100 130",
            "M-100 160 Q 250 220, 500 110 Q 750 0, 1100 170",
            "M-100 80 Q 250 -20, 500 190 Q 750 300, 1100 90",
            "M-100 120 Q 250 60, 500 150 Q 750 240, 1100 130",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M-100 200 Q 300 120, 600 220 Q 900 320, 1100 200" 
          stroke="rgba(160, 155, 120, 0.28)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 200 Q 300 120, 600 220 Q 900 320, 1100 200",
            "M-100 240 Q 300 300, 600 160 Q 900 70, 1100 240",
            "M-100 160 Q 300 60, 600 280 Q 900 400, 1100 160",
            "M-100 200 Q 300 120, 600 220 Q 900 320, 1100 200",
          ]}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Left side vertical curves */}
        <motion.path 
          d="M-50 -50 Q 80 150, 30 350 Q -20 550, 100 750 Q 220 950, 120 1100" 
          stroke="rgba(160, 155, 120, 0.32)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-50 -50 Q 80 150, 30 350 Q -20 550, 100 750 Q 220 950, 120 1100",
            "M-50 0 Q 130 100, 80 330 Q 30 520, 150 730 Q 270 920, 170 1100",
            "M-50 -100 Q 30 200, -20 370 Q -70 580, 50 770 Q 170 980, 70 1100",
            "M-50 -50 Q 80 150, 30 350 Q -20 550, 100 750 Q 220 950, 120 1100",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M50 -100 Q 180 100, 130 300 Q 80 500, 200 700 Q 320 900, 220 1100" 
          stroke="rgba(160, 155, 120, 0.25)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M50 -100 Q 180 100, 130 300 Q 80 500, 200 700 Q 320 900, 220 1100",
            "M50 -50 Q 230 50, 180 280 Q 130 480, 250 680 Q 370 880, 270 1100",
            "M50 -150 Q 130 150, 80 320 Q 30 520, 150 720 Q 270 920, 170 1100",
            "M50 -100 Q 180 100, 130 300 Q 80 500, 200 700 Q 320 900, 220 1100",
          ]}}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Right side vertical curves */}
        <motion.path 
          d="M1050 -50 Q 920 150, 970 350 Q 1020 550, 900 750 Q 780 950, 880 1100" 
          stroke="rgba(160, 155, 120, 0.32)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M1050 -50 Q 920 150, 970 350 Q 1020 550, 900 750 Q 780 950, 880 1100",
            "M1050 0 Q 870 100, 920 330 Q 970 520, 850 730 Q 730 920, 830 1100",
            "M1050 -100 Q 970 200, 1020 370 Q 1070 580, 950 770 Q 830 980, 930 1100",
            "M1050 -50 Q 920 150, 970 350 Q 1020 550, 900 750 Q 780 950, 880 1100",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path 
          d="M950 -100 Q 820 100, 870 300 Q 920 500, 800 700 Q 680 900, 780 1100" 
          stroke="rgba(160, 155, 120, 0.25)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M950 -100 Q 820 100, 870 300 Q 920 500, 800 700 Q 680 900, 780 1100",
            "M950 -50 Q 770 50, 820 280 Q 870 480, 750 680 Q 630 880, 730 1100",
            "M950 -150 Q 870 150, 920 320 Q 970 520, 850 720 Q 730 920, 830 1100",
            "M950 -100 Q 820 100, 870 300 Q 920 500, 800 700 Q 680 900, 780 1100",
          ]}}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Middle horizontal waves */}
        <motion.path 
          d="M-100 450 Q 250 380, 500 470 Q 750 560, 1100 450" 
          stroke="rgba(160, 155, 120, 0.22)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 450 Q 250 380, 500 470 Q 750 560, 1100 450",
            "M-100 430 Q 250 500, 500 410 Q 750 320, 1100 470",
            "M-100 470 Q 250 340, 500 530 Q 750 620, 1100 430",
            "M-100 450 Q 250 380, 500 470 Q 750 560, 1100 450",
          ]}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M-100 550 Q 300 480, 550 570 Q 800 660, 1100 550" 
          stroke="rgba(160, 155, 120, 0.2)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 550 Q 300 480, 550 570 Q 800 660, 1100 550",
            "M-100 530 Q 300 600, 550 510 Q 800 420, 1100 570",
            "M-100 570 Q 300 440, 550 630 Q 800 720, 1100 530",
            "M-100 550 Q 300 480, 550 570 Q 800 660, 1100 550",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Bottom curves */}
        <motion.path 
          d="M-100 750 Q 200 830, 500 720 Q 800 610, 1100 750" 
          stroke="rgba(160, 155, 120, 0.28)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 750 Q 200 830, 500 720 Q 800 610, 1100 750",
            "M-100 780 Q 200 700, 500 780 Q 800 860, 1100 720",
            "M-100 720 Q 200 860, 500 660 Q 800 560, 1100 780",
            "M-100 750 Q 200 830, 500 720 Q 800 610, 1100 750",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M-100 850 Q 250 930, 500 820 Q 750 710, 1100 850" 
          stroke="rgba(160, 155, 120, 0.25)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 850 Q 250 930, 500 820 Q 750 710, 1100 850",
            "M-100 880 Q 250 800, 500 880 Q 750 960, 1100 820",
            "M-100 820 Q 250 960, 500 760 Q 750 660, 1100 880",
            "M-100 850 Q 250 930, 500 820 Q 750 710, 1100 850",
          ]}}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.path 
          d="M-100 950 Q 300 1030, 550 920 Q 800 810, 1100 950" 
          stroke="rgba(160, 155, 120, 0.22)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 950 Q 300 1030, 550 920 Q 800 810, 1100 950",
            "M-100 980 Q 300 900, 550 980 Q 800 1060, 1100 920",
            "M-100 920 Q 300 1060, 550 860 Q 800 760, 1100 980",
            "M-100 950 Q 300 1030, 550 920 Q 800 810, 1100 950",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Diagonal crossing lines */}
        <motion.path 
          d="M-100 -100 Q 300 200, 550 450 Q 800 700, 1100 1100" 
          stroke="rgba(160, 155, 120, 0.18)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M-100 -100 Q 300 200, 550 450 Q 800 700, 1100 1100",
            "M-100 -50 Q 350 150, 600 430 Q 850 680, 1100 1050",
            "M-100 -150 Q 250 250, 500 470 Q 750 720, 1100 1150",
            "M-100 -100 Q 300 200, 550 450 Q 800 700, 1100 1100",
          ]}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M1100 -100 Q 700 200, 450 450 Q 200 700, -100 1100" 
          stroke="rgba(160, 155, 120, 0.18)" strokeWidth="1" fill="none"
          animate={{ d: [
            "M1100 -100 Q 700 200, 450 450 Q 200 700, -100 1100",
            "M1100 -50 Q 650 150, 400 430 Q 150 680, -100 1050",
            "M1100 -150 Q 750 250, 500 470 Q 250 720, -100 1150",
            "M1100 -100 Q 700 200, 450 450 Q 200 700, -100 1100",
          ]}}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>

      {/* Mobile Centered Title - Only visible on very small mobile */}
      <motion.div 
        className="absolute top-[10%] left-0 right-0 z-20 flex flex-col items-center min-[400px]:hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col items-center leading-[0.95]">
          <span 
            className="text-[22px] tracking-[0.06em] uppercase text-dark-text"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300 }}
          >
            Max
          </span>
          <span 
            className="text-[22px] tracking-[0.06em] uppercase text-dark-text"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900 }}
          >
            Verstappen
          </span>
        </div>
      </motion.div>

      {/* Hero Portrait Image - Bottom aligned with reveal effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-x-0 top-[12%] sm:top-[15%] md:top-[12%] lg:top-[10%] bottom-0 z-10"
      >
        <div 
          ref={imageRef}
          className="absolute inset-0 cursor-pointer"
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
              className="object-contain object-bottom scale-[1.8] min-[480px]:scale-[1.5] sm:scale-[1.2] min-[700px]:scale-[1.05] md:scale-100 lg:scale-100 origin-bottom"
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

        {/* National Race Widget - Bottom Left - Hidden on mobile for clean hero */}
        <motion.div 
          className="hidden md:block absolute bottom-6 left-6 z-20"
          style={{ opacity: widgetOpacity }}
        >
          <NationalRaceWidget />
        </motion.div>
        </motion.section>

        {/* Animated Signature - Positioned over hero but extends beyond */}
        <motion.svg
          className="absolute z-40 pointer-events-none w-[100vw] md:w-[120vw] h-[80vh] md:h-[100vh]"
          style={{ 
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
