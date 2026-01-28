"use client";

import { motion } from "framer-motion";

interface BlobShapeProps {
  className?: string;
  color?: string;
  size?: number;
  animate?: boolean;
  delay?: number;
}

export default function BlobShape({
  className = "",
  color = "rgba(212, 245, 30, 0.1)",
  size = 400,
  animate = true,
  delay = 0,
}: BlobShapeProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${animate ? "blob-animate" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    />
  );
}
