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

  // Card transforms - only the card shrinks, not the whole section
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.5, 0.5]);
  const cardBorderRadius = useTransform(scrollYProgress, [0, 0.4, 1], [0, 24, 24]);
  const cardBackground = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4],
    ["#F5F5F0", "#5A5F54", "#4A4F44"]
  );
  
  // Section background transitions to dark quickly
  const sectionBackground = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2],
    ["#F5F5F0", "#3A3F33", "#2A2F23"]
  );

  const widgetOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Signature draw progress (draws during 40%-80% of scroll)
  const signatureProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  // Signature only visible when drawing starts
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.39, 0.4], [0, 0, 1]);
  // Marquee text opacity - visible as dark edges appear
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
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
    <div ref={wrapperRef} className="relative h-[140vh] sm:h-[140vh] md:h-[150vh] bg-[#2A2F23]">
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center z-[5]"
        style={{ backgroundColor: sectionBackground }}
      >
        {/* Background lines for outer section */}
        <motion.svg 
          className="absolute inset-0 w-full h-full z-[0] pointer-events-none" 
          viewBox="0 0 1000 1000" 
          fill="none" 
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path d="M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100" stroke="rgba(140, 135, 100, 0.3)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100", "M-100 120 Q 200 180, 500 80 Q 800 -20, 1100 140", "M-100 60 Q 200 -40, 500 160 Q 800 280, 1100 60", "M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100"]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path d="M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180" stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180", "M-100 220 Q 300 280, 600 140 Q 900 50, 1100 220", "M-100 140 Q 300 40, 600 260 Q 900 380, 1100 140", "M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180"]}}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.path d="M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100" stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100", "M-50 150 Q 150 300, 100 480 Q 50 620, 200 780 Q 350 920, 250 1100", "M-50 250 Q 50 400, 0 520 Q -50 680, 100 820 Q 250 980, 150 1100", "M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100"]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path d="M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100" stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100", "M1050 250 Q 850 380, 900 530 Q 950 680, 800 830 Q 650 980, 750 1100", "M1050 350 Q 950 420, 1000 570 Q 1050 720, 900 870 Q 750 1020, 850 1100", "M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100"]}}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.path d="M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500" stroke="rgba(140, 135, 100, 0.25)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500", "M-100 480 Q 300 550, 500 450 Q 700 350, 1100 520", "M-100 520 Q 300 350, 500 550 Q 700 650, 1100 480", "M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500"]}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path d="M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600", "M-100 620 Q 250 500, 500 600 Q 750 700, 1100 580", "M-100 580 Q 250 750, 500 500 Q 750 350, 1100 620", "M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600"]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.path d="M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850" stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850", "M-100 850 Q 200 750, 500 880 Q 800 950, 1100 800", "M-100 750 Q 200 950, 500 760 Q 800 650, 1100 900", "M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850"]}}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path d="M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050", "M-100 0 Q 350 150, 650 380 Q 950 580, 1100 1000", "M-100 -100 Q 250 250, 550 420 Q 850 620, 1100 1100", "M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050"]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path d="M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
            animate={{ d: ["M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050", "M1100 0 Q 650 150, 350 380 Q 50 580, -100 1000", "M1100 -100 Q 750 250, 450 420 Q 150 620, -100 1100", "M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050"]}}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.svg>

        {/* "Message from Smrity" title - outside card, at top */}
        <motion.div 
          className="absolute top-[15%] sm:top-[18%] md:top-[20%] left-0 right-0 z-[2] flex items-center justify-center pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] text-cream/70 uppercase">Message from Smrity</span>
        </motion.div>

        {/* Scrolling Marquee Text - outside card, at bottom on mobile, behind card on desktop */}
        <motion.div 
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
          style={{ opacity: marqueeOpacity }}
        >
          {/* Top row - scrolling left - lime yellow */}
          <div className="absolute top-[78%] sm:top-[38%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-left">
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">DREAMS COME TRUE</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">WE DID IT AT HOME</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#C4D468] mx-3 md:mx-6 italic tracking-tight">DREAMS COME TRUE</span>
          </div>
          {/* Bottom row - scrolling right - cream/off-white */}
          <div className="absolute top-[84%] sm:top-[46%] left-0 w-[200%] flex whitespace-nowrap animate-marquee-right">
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">BRITISH GP WEEKEND</span>
            <span className="text-[5vw] sm:text-[8vw] md:text-[6vw] font-black text-[#E8E4D9]/80 mx-3 md:mx-6 italic tracking-tight">I WILL REMEMBER FOREVER</span>
          </div>
        </motion.div>

        {/* Hero Card - This is what shrinks on scroll */}
        <motion.div
          className="relative w-full h-full overflow-hidden z-[10]"
          style={{ 
            scale: cardScale, 
            borderRadius: cardBorderRadius, 
            backgroundColor: cardBackground 
          }}
        >
          {/* Background lines inside card */}
          <motion.svg 
            className="absolute inset-0 w-full h-full z-[1] pointer-events-none" 
            viewBox="0 0 1000 1000" 
            fill="none" 
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path d="M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100" stroke="rgba(140, 135, 100, 0.3)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100", "M-100 120 Q 200 180, 500 80 Q 800 -20, 1100 140", "M-100 60 Q 200 -40, 500 160 Q 800 280, 1100 60", "M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100"]}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180" stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180", "M-100 220 Q 300 280, 600 140 Q 900 50, 1100 220", "M-100 140 Q 300 40, 600 260 Q 900 380, 1100 140", "M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180"]}}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.path d="M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100" stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100", "M-50 150 Q 150 300, 100 480 Q 50 620, 200 780 Q 350 920, 250 1100", "M-50 250 Q 50 400, 0 520 Q -50 680, 100 820 Q 250 980, 150 1100", "M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100"]}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path d="M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100" stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100", "M1050 250 Q 850 380, 900 530 Q 950 680, 800 830 Q 650 980, 750 1100", "M1050 350 Q 950 420, 1000 570 Q 1050 720, 900 870 Q 750 1020, 850 1100", "M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100"]}}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.path d="M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500" stroke="rgba(140, 135, 100, 0.25)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500", "M-100 480 Q 300 550, 500 450 Q 700 350, 1100 520", "M-100 520 Q 300 350, 500 550 Q 700 650, 1100 480", "M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500"]}}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600", "M-100 620 Q 250 500, 500 600 Q 750 700, 1100 580", "M-100 580 Q 250 750, 500 500 Q 750 350, 1100 620", "M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600"]}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.path d="M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850" stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850", "M-100 850 Q 200 750, 500 880 Q 800 950, 1100 800", "M-100 750 Q 200 950, 500 760 Q 800 650, 1100 900", "M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850"]}}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path d="M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050", "M-100 0 Q 350 150, 650 380 Q 950 580, 1100 1000", "M-100 -100 Q 250 250, 550 420 Q 850 620, 1100 1100", "M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050"]}}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050" stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
              animate={{ d: ["M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050", "M1100 0 Q 650 150, 350 380 Q 50 580, -100 1000", "M1100 -100 Q 750 250, 450 420 Q 150 620, -100 1100", "M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050"]}}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.svg>

          {/* Mobile Centered Title - inside card, only on very small mobile */}
          <motion.div 
            className="absolute top-[8%] left-0 right-0 z-20 flex flex-col items-center min-[400px]:hidden"
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

          {/* Hero Portrait Image - inside card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-x-0 top-[3%] sm:top-[5%] md:top-[8%] lg:top-[5%] bottom-0 z-10"
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

          {/* National Race Widget - Bottom Left - Hidden on mobile */}
          <motion.div 
            className="hidden md:block absolute bottom-6 left-6 z-20"
            style={{ opacity: widgetOpacity }}
          >
            <NationalRaceWidget />
          </motion.div>
        </motion.div>

        {/* Animated Signature - Outside card, overlays when scrolled */}
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
