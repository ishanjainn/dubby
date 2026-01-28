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
      className={`flex flex-col leading-none select-none ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className={`text-[11px] tracking-[0.35em] font-light uppercase ${textColor}`}>
        Lando
      </span>
      <span className={`text-[11px] tracking-[0.35em] font-bold uppercase ${textColor}`}>
        Norris
      </span>
    </motion.div>
  );
}
