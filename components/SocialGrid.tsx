"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Different images for career vs favorites sections
const careerImages = [
  "/assets/social/career-1.jpg",
  "/assets/social/career-2.jpg",
  "/assets/social/career-3.jpg",
  "/assets/social/career-4.jpg",
  "/assets/social/career-5.jpg",
  "/assets/social/career-6.jpg",
  "/assets/social/career-7.jpg",
];

const favoritesImages = [
  "/assets/social/favorites-1.jpg",
  "/assets/social/favorites-2.jpg",
  "/assets/social/favorites-3.jpg",
  "/assets/social/favorites-4.jpg",
  "/assets/social/favorites-5.jpg",
  "/assets/social/favorites-6.jpg",
  "/assets/social/favorites-7.jpg",
];

// Card rotations for the fan effect (index 3 is center)
const cardRotations = [-20, -13, -6, 0, 6, 13, 20];
// Outer cards much lower, center card at top - creates arc shape
const cardOffsetY = [100, 60, 25, 0, 25, 60, 100];
// Z-index: center card highest, outer cards behind
const cardZIndex = [1, 2, 3, 7, 3, 2, 1];

const socialLinks = [
  { name: "TikTok", href: "https://www.tiktok.com/@landonorris" },
  { name: "Instagram", href: "https://www.instagram.com/lando" },
  { name: "YouTube", href: "https://www.youtube.com/@LandoNorris" },
  { name: "Twitch", href: "https://www.twitch.tv/landonorris" },
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
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime/40 to-dark-green/60" />
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
          <p className="text-dark-text/60 text-base md:text-lg mb-4 md:mb-6">
            Follow Lando on social media
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text/50 hover:text-dark-green text-xs md:text-sm font-medium uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
