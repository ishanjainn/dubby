"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import BlobShape from "./ui/BlobShape";

export default function MessageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark-green py-24"
    >
      {/* Background Blob Shapes */}
      <BlobShape
        className="top-[5%] left-[10%] opacity-20"
        color="rgba(212, 245, 30, 0.1)"
        size={500}
        delay={0.2}
      />
      <BlobShape
        className="bottom-[10%] right-[5%] opacity-20"
        color="rgba(212, 245, 30, 0.08)"
        size={400}
        delay={0.4}
      />

      {/* MESSAGE FROM LANDO Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-2 mb-12"
      >
        {/* LN Logo */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-cream text-lg font-bold"
            >
              LN
            </text>
          </svg>
        </div>
        <span className="text-[10px] tracking-[0.3em] text-cream/60 uppercase">
          Message from Lando
        </span>
      </motion.div>

      {/* Main Content - Large Typography with Portrait */}
      <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
        {/* Row 1 - WE DID / [Image] / HOME */}
        <motion.div
          style={{ y: y1 }}
          className="flex items-center justify-center gap-4 md:gap-8 w-full"
        >
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(3rem,12vw,10rem)] font-display font-light text-lime leading-none"
          >
            WE DID
          </motion.span>

          {/* Center Portrait with Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-32 h-40 md:w-48 md:h-60 flex-shrink-0"
          >
            {/* Portrait Image */}
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src="/assets/lando-portrait-bw.jpg"
                alt="Lando Norris"
                fill
                className="object-cover grayscale"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-b from-cream/20 to-cream/40" />
            </div>

            {/* Signature Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 200 150"
                className="w-full h-full stroke-lime fill-none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stylized signature - L shape with flourish */}
                <motion.path
                  d="M40 30 L40 100 L80 100 Q100 100, 110 80 Q120 60, 140 70 Q160 80, 170 60"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
                <motion.path
                  d="M90 50 Q100 30, 130 40 Q150 50, 160 30"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(3rem,12vw,10rem)] font-display font-light text-cream/30 leading-none"
          >
            HOME
          </motion.span>
        </motion.div>

        {/* Row 2 - AND I WILL / REMEMBER */}
        <motion.div
          style={{ y: y2 }}
          className="flex items-center justify-center gap-4 md:gap-8 w-full -mt-4"
        >
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[clamp(3rem,12vw,10rem)] font-display font-light text-lime leading-none"
          >
            AND I WILL
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[clamp(3rem,12vw,10rem)] font-display font-light text-cream/30 leading-none"
          >
            REMEMBER
          </motion.span>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center text-xs tracking-[0.3em] text-cream/40 uppercase mt-16"
      >
        McLaren F1 Since 2019
      </motion.p>

      {/* Quote Section */}
      <motion.div
        style={{ opacity }}
        className="max-w-3xl mx-auto px-6 mt-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl text-cream/80 leading-relaxed"
        >
          <span className="font-bold text-lime">Redefining</span> limits, fighting for{" "}
          <span className="font-bold text-lime">wins</span>, bringing it all in all ways.
          Defining a <span className="font-bold text-lime">legacy</span> in Formula 1 on
          and off the track.
        </motion.p>
      </motion.div>
    </section>
  );
}
