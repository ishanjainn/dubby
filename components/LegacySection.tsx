"use client";

import { motion } from "framer-motion";

export default function LegacySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#2A2F23] flex flex-col items-center justify-start px-6 pt-6 pb-4 md:pt-12 md:pb-24">
      {/* Background color matches Hero's dark wrapper */}
      {/* No lines - uses global fixed lines from Hero */}

      {/* Top Icon and Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-20 flex flex-col items-center mb-12"
      >
        {/* Helmet/Wreath Icon */}
        <div className="w-16 h-16 mb-3">
          <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
            {/* Wreath left */}
            <path d="M8 48 Q 4 36, 10 24 Q 16 12, 24 8" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            <path d="M12 46 Q 8 36, 14 26 Q 20 16, 26 12" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            {/* Wreath right */}
            <path d="M56 48 Q 60 36, 54 24 Q 48 12, 40 8" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            <path d="M52 46 Q 56 36, 50 26 Q 44 16, 38 12" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            {/* Helmet */}
            <ellipse cx="32" cy="32" rx="12" ry="14" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            <path d="M24 28 Q 32 24, 40 28" stroke="#C4D468" strokeWidth="1.5" fill="none"/>
            <line x1="32" y1="24" x2="32" y2="18" stroke="#C4D468" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="text-[10px] tracking-[0.25em] uppercase text-cream/60">
          KPMG Since 2024
        </span>
      </motion.div>

      {/* Main Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-20 text-center max-w-5xl"
      >
        <h2 className="text-[9vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw] xl:text-[3.5vw] font-display font-bold italic leading-[1.1] tracking-tight">
          <span className="block lg:inline"><span className="text-[#C4D468]">REDEFINING</span><span className="text-cream"> LIMITS,</span></span>
          <span className="block lg:inline"><span className="text-cream"> FIGHTING FOR </span><span className="text-[#C4D468]">WINS</span><span className="text-cream">,</span></span>
          <span className="block lg:inline"><span className="text-cream"> BRINGING IT ALL IN ALL WAYS.</span></span>
          <span className="block lg:inline"><span className="text-cream"> DEFINING A </span><span className="text-[#C4D468]">LEGACY</span><span className="text-cream"> IN FORMULA 1</span></span>
          <span className="block lg:inline"><span className="text-cream"> ON AND OFF THE TRACK.</span></span>
        </h2>
      </motion.div>
    </section>
  );
}
