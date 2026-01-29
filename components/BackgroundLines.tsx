"use client";

import { motion } from "framer-motion";

export default function BackgroundLines() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      <motion.svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1000 1000" 
        fill="none" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Olive lines - visible on light and dark backgrounds */}
        <motion.path 
          d="M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100" 
          stroke="rgba(140, 135, 100, 0.3)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100",
            "M-100 120 Q 200 180, 500 80 Q 800 -20, 1100 140",
            "M-100 60 Q 200 -40, 500 160 Q 800 280, 1100 60",
            "M-100 80 Q 200 20, 500 120 Q 800 220, 1100 100",
          ]}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180" 
          stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180",
            "M-100 220 Q 300 280, 600 140 Q 900 50, 1100 220",
            "M-100 140 Q 300 40, 600 260 Q 900 380, 1100 140",
            "M-100 180 Q 300 100, 600 200 Q 900 300, 1100 180",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Side curves */}
        <motion.path 
          d="M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100" 
          stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100",
            "M-50 150 Q 150 300, 100 480 Q 50 620, 200 780 Q 350 920, 250 1100",
            "M-50 250 Q 50 400, 0 520 Q -50 680, 100 820 Q 250 980, 150 1100",
            "M-50 200 Q 100 350, 50 500 Q 0 650, 150 800 Q 300 950, 200 1100",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100" 
          stroke="rgba(140, 135, 100, 0.28)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100",
            "M1050 250 Q 850 380, 900 530 Q 950 680, 800 830 Q 650 980, 750 1100",
            "M1050 350 Q 950 420, 1000 570 Q 1050 720, 900 870 Q 750 1020, 850 1100",
            "M1050 300 Q 900 400, 950 550 Q 1000 700, 850 850 Q 700 1000, 800 1100",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Center crossing curves */}
        <motion.path 
          d="M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500" 
          stroke="rgba(140, 135, 100, 0.25)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500",
            "M-100 480 Q 300 550, 500 450 Q 700 350, 1100 520",
            "M-100 520 Q 300 350, 500 550 Q 700 650, 1100 480",
            "M-100 500 Q 300 400, 500 500 Q 700 600, 1100 500",
          ]}}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600" 
          stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600",
            "M-100 620 Q 250 500, 500 600 Q 750 700, 1100 580",
            "M-100 580 Q 250 750, 500 500 Q 750 350, 1100 620",
            "M-100 600 Q 250 700, 500 550 Q 750 400, 1100 600",
          ]}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Bottom curves */}
        <motion.path 
          d="M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850" 
          stroke="rgba(140, 135, 100, 0.27)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850",
            "M-100 850 Q 200 750, 500 880 Q 800 950, 1100 800",
            "M-100 750 Q 200 950, 500 760 Q 800 650, 1100 900",
            "M-100 800 Q 200 900, 500 820 Q 800 740, 1100 850",
          ]}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Diagonal curves */}
        <motion.path 
          d="M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050" 
          stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050",
            "M-100 0 Q 350 150, 650 380 Q 950 580, 1100 1000",
            "M-100 -100 Q 250 250, 550 420 Q 850 620, 1100 1100",
            "M-100 -50 Q 300 200, 600 400 Q 900 600, 1100 1050",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050" 
          stroke="rgba(140, 135, 100, 0.23)" strokeWidth="1.5" fill="none"
          animate={{ d: [
            "M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050",
            "M1100 0 Q 650 150, 350 380 Q 50 580, -100 1000",
            "M1100 -100 Q 750 250, 450 420 Q 150 620, -100 1100",
            "M1100 -50 Q 700 200, 400 400 Q 100 600, -100 1050",
          ]}}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>
    </div>
  );
}
