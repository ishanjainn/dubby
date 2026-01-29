"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-dark-text";
  
  return (
    <motion.div 
      className={`flex flex-col leading-[0.95] select-none ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span 
        className={`text-[18px] sm:text-[22px] md:text-[32px] tracking-[0.06em] md:tracking-[0.08em] uppercase ${textColor}`}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300 }}
      >
        Max
      </span>
      <span 
        className={`text-[18px] sm:text-[22px] md:text-[32px] tracking-[0.06em] md:tracking-[0.08em] uppercase ${textColor}`}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900 }}
      >
        Verstappen
      </span>
    </motion.div>
  );
}
