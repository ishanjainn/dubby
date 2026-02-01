"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Different images for career vs favorites sections
const careerImages = [
  "/assets/socials/career-1.jpg",
  "/assets/socials/career-2.jpg",
  "/assets/socials/career-3.jpg",
  "/assets/socials/career-4.jpg",
  "/assets/socials/career-5.jpg",
  "/assets/socials/career-6.jpg",
  "/assets/socials/career-7.jpg",
];

const favoritesImages = [
  "/assets/socials/favorites-1.jpg",
  "/assets/socials/favorites-2.jpg",
  "/assets/socials/favorites-3.jpg",
  "/assets/socials/favorites-4.jpg",
  "/assets/socials/favorites-5.jpg",
  "/assets/socials/favorites-6.jpg",
  "/assets/socials/favorites-7.jpg",
];

// Card rotations for the fan effect (index 3 is center)
const cardRotations = [-20, -13, -6, 0, 6, 13, 20];
// Outer cards much lower, center card at top - creates arc shape
const cardOffsetY = [100, 60, 25, 0, 25, 60, 100];
// Z-index: center card highest, outer cards behind
const cardZIndex = [1, 2, 3, 7, 3, 2, 1];

// Social icons with SVG paths - using brand colors
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-[#0A66C2] hover:opacity-80 transition-opacity">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#F77737" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="75%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

// Social links configuration per variant
const careerSocialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/smrity-dubey-a68110142/", icon: LinkedInIcon },
];

const favoritesSocialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/smrity-dubey-a68110142/", icon: LinkedInIcon },
  { name: "Instagram", href: "https://www.instagram.com/smrity_dubey/", icon: InstagramIcon },
];

interface SocialGridProps {
  variant?: 'career' | 'favorites';
}

function SocialCard({ 
  src, 
  index,
  rotation,
  offsetY,
  zIndex,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  totalCards,
  calculatedCardWidth
}: { 
  src: string; 
  index: number;
  rotation: number;
  offsetY: number;
  zIndex: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
  totalCards: number;
  calculatedCardWidth: number;
}) {
  // Smaller values for mobile
  const mobileRotation = rotation * 0.7;
  const mobileOffsetY = offsetY * 0.5;
  const actualRotation = isMobile ? mobileRotation : rotation;
  const actualOffsetY = isMobile ? mobileOffsetY : offsetY;
  
  // Use the calculated card width that matches the CSS clamp() value
  // Overlap is higher on mobile to keep cards from extending beyond viewport
  const overlap = isMobile ? calculatedCardWidth * 0.45 : calculatedCardWidth * 0.3;
  
  // Calculate position from center (index 3 is center for 7 cards)
  const centerIndex = Math.floor(totalCards / 2);
  const offsetFromCenter = index - centerIndex;
  
  // X position: each card is offset by (cardWidth - overlap) from center
  const xPosition = offsetFromCenter * (calculatedCardWidth - overlap);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: isMobile ? 'clamp(60px, 12vw, 90px)' : 'clamp(120px, 15vw, 180px)',
        height: isMobile ? 'clamp(85px, 17vw, 130px)' : 'clamp(170px, 22vw, 260px)',
        // Use left: 50% of container, transform handles the offset
        left: '50%',
        bottom: 0,
        zIndex: isHovered ? 10 : zIndex,
        transformOrigin: 'bottom center',
        // Use margin-left to offset by half the card width, then xPosition for fan spread
        marginLeft: -calculatedCardWidth / 2 + xPosition,
      }}
      initial={{ 
        rotate: actualRotation, 
        y: actualOffsetY,
      }}
      animate={{ 
        rotate: isHovered ? 0 : actualRotation,
        y: isHovered ? actualOffsetY - 20 : actualOffsetY,
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={onLeave}
    >
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={src}
          alt={`Social media content ${index + 1}`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SocialGrid({ variant = 'career' }: SocialGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(160);
  const images = variant === 'career' ? careerImages : favoritesImages;

  // Detect mobile and calculate responsive card width to match CSS clamp()
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const mobile = vw < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // Matches: clamp(60px, 12vw, 90px)
        const vwValue = vw * 0.12;
        setCardWidth(Math.min(90, Math.max(60, vwValue)));
      } else {
        // Matches: clamp(120px, 15vw, 180px)
        const vwValue = vw * 0.15;
        setCardWidth(Math.min(180, Math.max(120, vwValue)));
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Icon based on variant
  const Icon = variant === 'career' ? (
    // Racing flag icon for career
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 stroke-dark-text/50" fill="none" strokeWidth="1.5">
      <path d="M4 21V4m0 0c3 0 6-2 9 0s6 0 9 0v10c-3 0-6 2-9 0s-6 0-9 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    // Heart icon for favorites
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 stroke-dark-text/50" fill="none" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className="relative pt-16 md:pt-24 pb-32 md:pb-44 lg:pb-56 bg-cream w-full">
      <div className="w-full px-6 flex flex-col items-center overflow-x-clip">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4 md:mb-6"
        >
          {Icon}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight tracking-tight">
            <span className="font-bold text-dark-text block">WHAT&apos;S UP</span>
            <span className="font-light text-dark-text/50">ON SOCIALS</span>
          </h2>
        </motion.div>

        {/* Fanned Card Deck Container - using absolute positioning for true centering */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-5xl"
          style={{ 
            // Height = card height + max Y offset + buffer for transforms
            // Desktop: 260px card + 100px offset + 40px buffer = 400px
            // Mobile: 130px card + 50px offset + 20px buffer = 200px
            height: isMobile ? '200px' : '400px',
          }}
        >
          {images.map((src, index) => (
            <SocialCard 
              key={index} 
              src={src} 
              index={index}
              rotation={cardRotations[index]}
              offsetY={cardOffsetY[index]}
              zIndex={cardZIndex[index]}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              isMobile={isMobile}
              totalCards={images.length}
              calculatedCardWidth={cardWidth}
            />
          ))}
        </motion.div>

        {/* Follow Text & Links - Completely separate section with generous spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
          style={{
            // Extra margin to clear the card transforms (max Y offset is 100px on desktop, 50px on mobile)
            marginTop: isMobile ? '80px' : '140px',
          }}
        >
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <p className="text-dark-text/60 text-base md:text-lg">
              Follow me on
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              {(variant === 'career' ? careerSocialLinks : favoritesSocialLinks).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${link.name}`}
                  className="transition-transform hover:scale-110"
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
