"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import Image from "next/image";
import { useHeaderContext } from "./HeaderContext";

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

// Check if a color is "light" (should use dark text/icons)
function isLightColor(r: number, g: number, b: number): boolean {
  // Using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerColor, setHeaderColor] = useState({ r: 42, g: 47, b: 35 }); // dark text initially
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // Track if at top of page (hero visible)
  const rafRef = useRef<number>();
  const { forceLightHeader } = useHeaderContext();
  
  // Override colors when forceLightHeader is true
  const effectiveIsDarkBg = forceLightHeader || isDarkBg;
  const effectiveHeaderColor = forceLightHeader 
    ? { r: 232, g: 228, b: 217 } // light color for dark backgrounds
    : headerColor;
  
  // Detect background color at header position
  const detectBackgroundColor = useCallback(() => {
    // Check if at top of page (hero section visible)
    const scrollY = window.scrollY || window.pageYOffset;
    setIsAtTop(scrollY < 100); // Consider "at top" if scrolled less than 100px
    
    // Use elementsFromPoint to find all elements at the header position
    // Check at multiple points to be more reliable
    // Use responsive y position based on header location
    const isMobile = window.innerWidth < 768;
    const yPos = isMobile ? 30 : 60; // Lower y on mobile since header is at top-4 (16px)
    
    const checkPoints = [
      { x: window.innerWidth / 2, y: yPos },  // center
      { x: Math.min(60, window.innerWidth * 0.15), y: yPos },  // left (responsive)
      { x: Math.max(window.innerWidth - 60, window.innerWidth * 0.85), y: yPos }, // right (responsive)
    ];
    
    let currentBgColor = { r: 245, g: 245, b: 240 }; // default cream (light)
    
    for (const point of checkPoints) {
      const elements = document.elementsFromPoint(point.x, point.y);
      
      for (const element of elements) {
        // Skip the header itself and its children
        if (element.closest('header')) continue;
        // Skip SVG elements (background lines)
        if (element.tagName === 'svg' || element.tagName === 'path' || element.closest('svg')) continue;
        // Skip elements with pointer-events-none (decorative)
        const style = window.getComputedStyle(element);
        if (style.pointerEvents === 'none' && element.tagName !== 'SECTION' && element.tagName !== 'DIV') continue;
        
        const bgColor = style.backgroundColor;
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const a = match[4] ? parseFloat(match[4]) : 1;
          
          // Only use this color if it's not fully transparent
          if (a > 0.1 && !(r === 0 && g === 0 && b === 0 && a < 1)) {
            currentBgColor = { r, g, b };
            break;
          }
        }
      }
      
      // If we found a non-default color, use it
      if (currentBgColor.r !== 245 || currentBgColor.g !== 245 || currentBgColor.b !== 240) {
        break;
      }
    }
    
    const isLight = isLightColor(currentBgColor.r, currentBgColor.g, currentBgColor.b);
    setIsDarkBg(!isLight);
    
    // Set header element colors (inverse of background)
    if (isLight) {
      // Light background → dark text/icons
      setHeaderColor({ r: 42, g: 47, b: 35 });
    } else {
      // Dark background → light text/icons
      setHeaderColor({ r: 232, g: 228, b: 217 });
    }
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(detectBackgroundColor);
    };
    
    // Run detection immediately and also after a short delay to ensure DOM is ready
    detectBackgroundColor();
    const initialTimeout = setTimeout(detectBackgroundColor, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', detectBackgroundColor);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectBackgroundColor);
      clearTimeout(initialTimeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [detectBackgroundColor]);

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
          {/* Left - Logo (hidden on mobile when at hero section) */}
          <Link 
            href="/" 
            className={`relative z-10 ${isAtTop ? 'hidden md:block' : 'block'}`}
          >
            <Logo variant={isMenuOpen ? "light" : (effectiveIsDarkBg ? "light" : "dark")} />
          </Link>
          {/* Spacer when logo is hidden on mobile */}
          {isAtTop && <div className="md:hidden" />}


          {/* Right - Menu Toggle */}
          <div className="flex items-center gap-3 relative z-10">
            {/* Menu Toggle Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl border-2 bg-transparent transition-colors"
              style={{
                borderColor: isMenuOpen 
                  ? "rgba(232, 228, 217, 0.3)" 
                  : effectiveIsDarkBg 
                    ? "rgba(232, 228, 217, 0.3)"
                    : "rgb(42, 47, 35)" // Solid black on light backgrounds
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col justify-center items-start w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 relative">
                <motion.span
                  className="absolute top-0 h-[2px] w-4 sm:w-5 md:w-6 rounded-full"
                  style={{
                    backgroundColor: isMenuOpen 
                      ? "#E8E4D9" 
                      : effectiveIsDarkBg 
                        ? "#E8E4D9"
                        : "#2A2F23" // Solid black on light backgrounds
                  }}
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                    x: isMenuOpen ? 0 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute bottom-0 h-[2px] w-4 sm:w-5 md:w-6 rounded-full"
                  style={{
                    backgroundColor: isMenuOpen 
                      ? "#E8E4D9" 
                      : effectiveIsDarkBg 
                        ? "#E8E4D9"
                        : "#2A2F23" // Solid black on light backgrounds
                  }}
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
