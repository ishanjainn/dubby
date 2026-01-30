"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const pageLinks = [
  { name: "HOME", href: "/" },
  { name: "ON TRACK", href: "/on-track" },
  { name: "OFF TRACK", href: "/off-track" },
  { name: "CALENDAR", href: "/calendar" },
];

const socialLinks = [
  { name: "TIKTOK", href: "https://www.tiktok.com/@landonorris" },
  { name: "INSTAGRAM", href: "https://www.instagram.com/lando" },
  { name: "YOUTUBE", href: "https://www.youtube.com/@LandoNorris" },
  { name: "TWITCH", href: "https://www.twitch.tv/landonorris" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-cream py-6 md:py-8">
      {/* Lime gradient glow - covers full footer height, fades from top to bright at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(212,245,30,0.03) 15%, rgba(212,245,30,0.08) 30%, rgba(212,245,30,0.18) 45%, rgba(212,245,30,0.35) 60%, rgba(212,245,30,0.55) 75%, rgba(212,245,30,0.8) 88%, rgba(225,250,50,1) 100%)',
        }}
      />

      {/* Footer Box Container - with generous side padding */}
      <div className="relative px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* The Dark Box with SVG shape */}
        <svg 
          viewBox="0 0 1200 520" 
          preserveAspectRatio="none"
          className="w-full h-[400px] sm:h-[420px] md:h-[470px] lg:h-[500px]"
        >
          <defs>
            <clipPath id="footerBoxClip">
              <path
                d="M30,70
                   Q30,40 60,40
                   L400,40
                   C430,40 460,10 520,10
                   L680,10
                   C740,10 770,40 800,40
                   L1140,40
                   Q1170,40 1170,70
                   L1170,440
                   Q1170,470 1140,470
                   L1000,470
                   C970,470 940,500 880,500
                   L320,500
                   C260,500 230,470 200,470
                   L60,470
                   Q30,470 30,440
                   Z"
              />
            </clipPath>
          </defs>
          
          {/* Box shape fill */}
          <path
            d="M30,70
               Q30,40 60,40
               L400,40
               C430,40 460,10 520,10
               L680,10
               C740,10 770,40 800,40
               L1140,40
               Q1170,40 1170,70
               L1170,440
               Q1170,470 1140,470
               L1000,470
               C970,470 940,500 880,500
               L320,500
               C260,500 230,470 200,470
               L60,470
               Q30,470 30,440
               Z"
            fill="#2a2f23"
          />
          
          {/* Topographical contour lines inside the box */}
          <g clipPath="url(#footerBoxClip)" opacity="0.18" strokeWidth="1" fill="none" stroke="#8b9a6d">
            {/* Center contour group */}
            <ellipse cx="600" cy="350" rx="150" ry="80" />
            <ellipse cx="600" cy="350" rx="200" ry="110" />
            <ellipse cx="600" cy="350" rx="260" ry="145" />
            <ellipse cx="600" cy="350" rx="330" ry="185" />
            <ellipse cx="600" cy="350" rx="420" ry="230" />
            
            {/* Left side contours */}
            <path d="M30,150 Q80,200 60,280 Q40,360 80,420 Q100,460 30,520" />
            <path d="M30,120 Q120,180 100,280 Q80,380 130,450 Q160,500 100,560" />
            <path d="M30,90 Q160,160 140,280 Q120,400 180,480" />
            
            {/* Right side contours */}
            <path d="M1170,150 Q1120,200 1140,280 Q1160,360 1120,420 Q1100,460 1170,520" />
            <path d="M1170,120 Q1080,180 1100,280 Q1120,380 1070,450 Q1040,500 1100,560" />
            <path d="M1170,90 Q1040,160 1060,280 Q1080,400 1020,480" />
            
            {/* Top flowing lines */}
            <path d="M200,40 Q350,100 500,70 Q650,40 750,80" />
            <path d="M150,60 Q320,130 480,95 Q640,60 780,110" />
          </g>
        </svg>

        {/* Content Overlay - positioned absolutely over the SVG box */}
        <div className="absolute inset-0" style={{ padding: '12% 18%' }}>
          
          {/* Mobile Layout - flex column */}
          <div className="flex flex-col h-full sm:hidden" style={{ paddingTop: '8%' }}>
            {/* Navigation Columns */}
            <div className="flex-none flex justify-center gap-12">
              {/* Left Column - PAGES */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center z-10"
              >
                <h3 className="text-[7px] tracking-[0.15em] text-cream/40 uppercase mb-1">
                  Pages
                </h3>
                <div className="space-y-0">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-cream text-xs font-display font-semibold hover:text-lime transition-colors block leading-tight !min-h-0"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - FOLLOW ON */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center z-10"
              >
                <h3 className="text-[7px] tracking-[0.15em] text-cream/40 uppercase mb-1">
                  Follow On
                </h3>
                <div className="space-y-0">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream text-xs font-display font-semibold hover:text-lime transition-colors block leading-tight !min-h-0"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tagline */}
            <div className="flex-1 flex flex-col items-center justify-start z-10" style={{ marginTop: 'max(0px, calc(20px - 2vw))' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-0.5"
              >
                <span className="font-script text-lime text-xl">Lando</span>
                <span className="font-script text-lime text-sm align-super ml-0.5">4</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-sm font-display leading-[1.1] tracking-tight">
                  <span className="text-cream font-light">ALWAYS </span>
                  <span className="text-cream font-bold">BRINGING</span>
                </h2>
                <h2 className="text-sm font-display leading-[1.1] tracking-tight">
                  <span className="text-cream font-light">THE </span>
                  <span className="text-lime font-bold">FIGHT.</span>
                </h2>
              </motion.div>
            </div>

            {/* Helmet */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative w-[120px] h-[80px]"
              >
                <Image
                  src="/assets/helmet-footer.png"
                  alt="Lando Norris Helmet"
                  fill
                  className="object-contain object-bottom"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - relative positioning */}
          <div className="hidden sm:block relative h-full">
            {/* Left Column - PAGES - positioned middle left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute left-0 top-[50%] -translate-y-1/2 text-center z-10"
            >
              <h3 className="text-[8px] md:text-[9px] tracking-[0.15em] text-cream/40 uppercase mb-2">
                Pages
              </h3>
              <div className="space-y-2">
                {pageLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-cream text-[11px] md:text-xs lg:text-sm font-display font-semibold hover:text-lime transition-colors block leading-normal"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right Column - FOLLOW ON - positioned middle right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute right-0 top-[50%] -translate-y-1/2 text-center z-10"
            >
              <h3 className="text-[8px] md:text-[9px] tracking-[0.15em] text-cream/40 uppercase mb-2">
                Follow On
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream text-[11px] md:text-xs lg:text-sm font-display font-semibold hover:text-lime transition-colors block leading-normal"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Helmet - at bottom center */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative w-[160px] h-[110px] md:w-[200px] md:h-[140px] lg:w-[260px] lg:h-[180px]"
              >
                <Image
                  src="/assets/helmet-footer.png"
                  alt="Lando Norris Helmet"
                  fill
                  className="object-contain object-bottom"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </motion.div>
            </div>
          </div>

        </div>

        {/* Desktop Tagline - positioned relative to the box container */}
        <div className="hidden sm:flex absolute top-[8%] left-1/2 -translate-x-1/2 flex-col items-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-1"
          >
            <span className="font-script text-lime text-2xl md:text-3xl lg:text-4xl">Lando</span>
            <span className="font-script text-lime text-lg md:text-xl align-super ml-0.5">4</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-display leading-[1.1] tracking-tight">
              <span className="text-cream font-light">ALWAYS </span>
              <span className="text-cream font-bold">BRINGING</span>
            </h2>
            <h2 className="text-lg md:text-xl lg:text-2xl font-display leading-[1.1] tracking-tight">
              <span className="text-cream font-light">THE </span>
              <span className="text-lime font-bold">FIGHT.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative py-4 md:py-6 px-4 md:px-8 mt-4">
        <p className="text-dark-text/60 text-xs md:text-sm text-center">
          Made <span className="line-through">by</span> for ❤️
        </p>
      </div>
    </footer>
  );
}
