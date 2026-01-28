"use client";

import { motion } from "framer-motion";

export default function NationalRaceWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
      className="relative flex flex-col items-start"
    >
      {/* Main card with SVG shape */}
      <div className="relative w-[95px] h-[190px]">
        {/* SVG background with diagonal cut at top-left */}
        <svg
          width="95"
          height="190"
          viewBox="0 0 95 190"
          className="absolute inset-0"
        >
          {/* Card shape with diagonal cut at top-left - animated draw */}
          <motion.path
            d="M 0.5 24
               Q 0.5 16.5, 8 16.5
               L 52 16.5
               L 62 0.5
               L 87 0.5
               Q 94.5 0.5, 94.5 8
               L 94.5 182
               Q 94.5 189.5, 87 189.5
               L 8 189.5
               Q 0.5 189.5, 0.5 182
               Z"
            fill="none"
            stroke="rgba(26, 26, 26, 0.8)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }}
          />
        </svg>

        {/* Content */}
        <div className="absolute top-[24px] left-0 right-0 flex flex-col items-center px-2.5 gap-2">
          {/* India Map Outline */}
          <div className="w-14 h-16 flex items-center justify-center">
            <img 
              src="/assets/india-map.png" 
              alt="India" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* "INDIAN" text */}
          <span className="text-[9px] font-bold tracking-wide text-dark-text uppercase">
            Indian
          </span>

          {/* Horizontal divider line - floating */}
          <div style={{ width: '60%', height: '1px', backgroundColor: 'rgba(26, 26, 26, 0.8)' }}></div>

          {/* KPMG Logo */}
          <div className="w-14 h-8 flex items-center justify-center">
            <img 
              src="/assets/kpmg-logo.png" 
              alt="KPMG" 
              className="w-full h-full object-contain"
              style={{ filter: 'grayscale(100%) brightness(0)' }}
            />
          </div>

          {/* "Current Team" text */}
          <span className="text-[9px] font-bold tracking-wide text-dark-text uppercase">
            Current Team
          </span>
        </div>
      </div>
    </motion.div>
  );
}
