"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "On Track", href: "/on-track" },
  { name: "Off Track", href: "/off-track" },
  { name: "Partnerships", href: "/partnerships" },
  { name: "Calendar", href: "/calendar" },
];

const socialLinks = [
  { name: "TikTok", href: "https://www.tiktok.com/@landonorris" },
  { name: "Instagram", href: "https://www.instagram.com/lando" },
  { name: "YouTube", href: "https://www.youtube.com/landonorris04" },
  { name: "Twitch", href: "https://www.twitch.tv/landonorris" },
];

const menuImages = [
  "/assets/menu-1.jpg",
  "/assets/menu-2.jpg",
  "/assets/menu-3.jpg",
  "/assets/menu-4.jpg",
  "/assets/menu-5.jpg",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Change colors when scrolling past ~40% of viewport height (when hero starts shrinking)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = window.innerHeight * 0.4;
    setIsDarkSection(latest > threshold);
  });

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const imageVariants = {
    closed: { opacity: 0, scale: 0.9 },
    open: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 md:top-6 md:left-8 md:right-8 lg:top-8 lg:left-10 lg:right-10 z-50">
        <div className="flex items-center justify-between">
          {/* Left - Logo (hidden on very small mobile, shown on 400px+) */}
          <Link href="/" className="relative z-10 hidden min-[400px]:block">
            <Logo variant={isMenuOpen || isDarkSection ? "light" : "dark"} />
          </Link>
          {/* Spacer for very small mobile to keep menu button on right */}
          <div className="min-[400px]:hidden" />


          {/* Right - Menu Toggle */}
          <div className="flex items-center gap-3 relative z-10">
            {/* Menu Toggle Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl border-2 bg-transparent transition-colors ${
                isMenuOpen || isDarkSection
                  ? "border-cream/30"
                  : "border-dark-text"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col justify-center items-start w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 relative">
                <motion.span
                  className={`absolute top-0 h-[2px] w-4 sm:w-5 md:w-6 rounded-full ${
                    isMenuOpen || isDarkSection ? "bg-cream" : "bg-dark-text"
                  }`}
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                    x: isMenuOpen ? 0 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className={`absolute bottom-0 h-[2px] w-4 sm:w-5 md:w-6 rounded-full ${
                    isMenuOpen || isDarkSection ? "bg-cream" : "bg-dark-text"
                  }`}
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                    x: isMenuOpen ? 0 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-dark-green overflow-auto"
          >
            <div className="min-h-screen px-4 md:px-6 pt-20 md:pt-24 pb-8 md:pb-12">
              {/* Go to home link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-cream/60 hover:text-lime text-sm transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Go to home
                </Link>
              </motion.div>

              {/* Image Grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2 mb-8 md:mb-12 h-24 md:h-48 overflow-hidden">
                {menuImages.map((src, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={imageVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="relative overflow-hidden rounded-lg bg-dark-text/20"
                  >
                    <Image
                      src={src}
                      alt={`Menu image ${i + 1}`}
                      fill
                      className="object-cover opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    {/* Fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-lime/20 to-dark-text/40" />
                  </motion.div>
                ))}
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-start gap-2 md:gap-4 mb-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group"
                    >
                      <span className="text-4xl sm:text-5xl md:text-7xl font-display font-light text-cream hover:text-lime transition-colors duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-t border-cream/15 pt-8"
              >
                {/* Tagline */}
                <div className="text-cream/50 text-xs tracking-[0.2em] uppercase">
                  McLaren F1 Since 2019
                </div>

                {/* Business Enquiries */}
                <a
                  href="mailto:business@landonorris.com"
                  className="text-cream/50 hover:text-lime text-xs tracking-wide transition-colors"
                >
                  Business Enquiries
                </a>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/50 hover:text-lime text-xs lowercase transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
