"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background text
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#2A2F23]"
    >
      {/* Background color matches Hero's dark wrapper */}
      {/* No lines - uses global fixed lines from Hero */}

      {/* Large Background Scrolling Text */}
      <motion.div 
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
        style={{ x: textX }}
      >
        <div className="whitespace-nowrap">
          <span className="text-[18vw] md:text-[15vw] font-display font-bold text-lime/20 tracking-tight">
            HOME WEEKEND I WAS AT HOME REMEMBER HOME WEEKEND
          </span>
        </div>
      </motion.div>
      <motion.div 
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none mt-[18vw] md:mt-[15vw]"
        style={{ x: textX }}
      >
        <div className="whitespace-nowrap">
          <span className="text-[18vw] md:text-[15vw] font-display font-bold text-cream/10 tracking-tight">
            WEEKEND I REMEMBER IT AT HOME MEMBER WEEKEND I
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 md:px-6 md:py-24">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-6 md:mb-8"
        >
          {/* SD Logo */}
          <div className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <path
                d="M10 8 L20 8 L20 18 L30 18 L30 32 L20 32 L20 22 L10 22 Z"
                fill="none"
                stroke="#D4F51E"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase text-cream/60">
            Message from Smrity
          </span>
        </motion.div>

        {/* Portrait with Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full max-w-xs md:max-w-md aspect-[3/4]"
        >
          {/* Portrait Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/assets/portrait-bw.jpg"
              alt="Portrait"
              fill
              className="object-cover object-top grayscale"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {/* Fallback */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-text/40 via-dark-text/60 to-dark-text/80 flex items-start justify-center pt-[10%]">
              <div className="w-[75%] aspect-[3/4] bg-gradient-to-t from-dark-text/50 via-dark-text/30 to-transparent rounded-t-[45%]" />
            </div>
          </div>

          {/* Signature SVG Overlay */}
          <motion.svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            {/* Signature Path - Stylized "SD" autograph */}
            <motion.path
              d="M80 280 
                 Q 100 240, 140 260 
                 Q 180 280, 160 320 
                 Q 140 360, 100 340
                 Q 60 320, 80 280
                 M 100 340 L 180 420
                 M 160 320 Q 200 280, 240 300
                 Q 280 320, 260 360
                 Q 240 400, 200 380
                 L 320 280
                 M 320 280 Q 380 240, 360 320
                 Q 340 400, 280 420"
              stroke="#D4F51E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            {/* Additional flourish lines */}
            <motion.path
              d="M60 360 Q 120 380, 180 350 Q 240 320, 300 360 Q 360 400, 340 440"
              stroke="#D4F51E"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M100 400 L 320 400"
              stroke="#D4F51E"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
