"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Hero from "@/components/Hero";
import BackgroundLines from "@/components/BackgroundLines";
import LegacySection from "@/components/LegacySection";
import PhotoGallery from "@/components/PhotoGallery";
import OnOffTrack from "@/components/OnOffTrack";
import CareerSection from "@/components/CareerSection";
import FavoritesSection from "@/components/FavoritesSection";
import SocialGrid from "@/components/SocialGrid";
import Footer from "@/components/Footer";
import { useHeaderContext } from "@/components/HeaderContext";

type RevealType = 'ontrack' | 'offtrack' | null;

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealType, setRevealType] = useState<RevealType>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const socialGridRef = useRef<HTMLDivElement>(null);
  const panelY = useMotionValue(1000); // Start off-screen, will be set properly on reveal
  const accumulatedDeltaRef = useRef(0);
  const isClosingRef = useRef(false);
  const { setForceLightHeader } = useHeaderContext();
  
  // Transform for visual feedback while dragging
  const panelOpacity = useTransform(panelY, [0, 150], [1, 0.8]);

  const handleReveal = (type: 'ontrack' | 'offtrack') => {
    accumulatedDeltaRef.current = 0;
    isClosingRef.current = false;
    setRevealType(type);
    setIsRevealed(true);
    // Let automatic header color detection handle the color based on visible section
    document.body.style.overflow = 'hidden';
    
    // Animate panel up from bottom
    panelY.set(window.innerHeight);
    animate(panelY, 0, {
      type: "tween",
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.6
    });
  };

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    animate(panelY, window.innerHeight, {
      type: "tween",
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
      onComplete: () => {
        setIsRevealed(false);
        setRevealType(null);
        accumulatedDeltaRef.current = 0;
        isClosingRef.current = false;
        setForceLightHeader(false); // Reset header color when panel closes
        document.body.style.overflow = '';
      }
    });
  };

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Track scroll position inside overlay to update header color
  useEffect(() => {
    const container = scrollContainerRef.current;
    const socialGrid = socialGridRef.current;
    
    if (!container || !isRevealed) return;

    const handleOverlayScroll = () => {
      if (!socialGrid) {
        // Still in dark section, force light header
        setForceLightHeader(true);
        return;
      }

      const socialGridRect = socialGrid.getBoundingClientRect();
      // If top of SocialGrid is above the middle of the viewport, switch to dark header
      const threshold = window.innerHeight * 0.3; // 30% from top
      
      if (socialGridRect.top <= threshold) {
        // SocialGrid (light bg) is visible - use dark header
        setForceLightHeader(false);
      } else {
        // Still in GridSection (dark bg) - use light header
        setForceLightHeader(true);
      }
    };

    // Initial check
    setForceLightHeader(true); // Start with light header for dark GridSection
    
    container.addEventListener('scroll', handleOverlayScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleOverlayScroll);
    };
  }, [isRevealed, setForceLightHeader]);

  // Handle wheel/touch events for drag-to-close
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isRevealed) return;

    let releaseTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isClosingRef.current) return;
      
      const scrollTop = container.scrollTop;
      const isAtTop = scrollTop <= 2;

      // Scrolling up while at top (negative deltaY = scroll up)
      if (isAtTop && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        
        // More responsive multiplier
        accumulatedDeltaRef.current += Math.abs(e.deltaY) * 0.8;
        const newOffset = Math.min(accumulatedDeltaRef.current, 400);
        panelY.set(newOffset);

        // Clear any existing timeout
        clearTimeout(releaseTimeout);
        
        // Check threshold immediately for faster response
        if (newOffset > 100) {
          handleClose();
          return;
        }
        
        // Short timeout for release detection
        releaseTimeout = setTimeout(() => {
          if (!isClosingRef.current && panelY.get() > 0) {
            // Snap back if not past threshold
            animate(panelY, 0, {
              type: "spring",
              stiffness: 500,
              damping: 35
            });
            accumulatedDeltaRef.current = 0;
          }
        }, 100);
      } else if (e.deltaY > 0) {
        // Scrolling down - reset drag state
        if (accumulatedDeltaRef.current > 0) {
          accumulatedDeltaRef.current = Math.max(0, accumulatedDeltaRef.current - Math.abs(e.deltaY));
          panelY.set(accumulatedDeltaRef.current);
        }
      }
    };

    // Touch support for mobile
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isClosingRef.current) return;
      
      const scrollTop = container.scrollTop;
      const isAtTop = scrollTop <= 2;
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY;
      
      // Pulling down while at top
      if (isAtTop && deltaY > 0) {
        e.preventDefault();
        const newOffset = Math.min(deltaY * 0.6, 400);
        panelY.set(newOffset);
        accumulatedDeltaRef.current = newOffset;
        
        if (newOffset > 100) {
          handleClose();
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (!isClosingRef.current && panelY.get() > 0 && panelY.get() <= 100) {
        animate(panelY, 0, {
          type: "spring",
          stiffness: 500,
          damping: 35
        });
        accumulatedDeltaRef.current = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(releaseTimeout);
    };
  }, [isRevealed, panelY]);

  return (
    <main className="relative">
      <BackgroundLines />
      <Hero />
      <LegacySection />
      <PhotoGallery />
      <OnOffTrack onReveal={handleReveal} />
      
      {/* Reveal container - slides up from bottom when triggered */}
      {isRevealed && (
        <motion.div
          ref={scrollContainerRef}
          style={{ 
            y: panelY,
            opacity: panelOpacity 
          }}
          className={`fixed inset-0 z-20 overflow-y-auto ${
            revealType === 'offtrack' ? 'bg-[#1a1a1a]' : 'bg-cream'
          }`}
        >
          {/* Drag indicator at top */}
          <div className="sticky top-0 left-0 right-0 z-10 flex flex-col items-center pt-3 pb-1 pointer-events-none">
            <div className={`w-10 h-1 rounded-full ${
              revealType === 'offtrack' ? 'bg-white/30' : 'bg-dark-text/30'
            }`} />
          </div>
          {revealType === 'ontrack' ? (
            <>
              <CareerSection />
              <div ref={socialGridRef}>
                <SocialGrid variant="career" />
              </div>
              {/* Spacer between social section and footer */}
              <div className="h-32 sm:h-40 md:h-48 lg:h-56 bg-cream" />
              <Footer />
            </>
          ) : (
            <>
              <FavoritesSection />
              <div ref={socialGridRef}>
                <SocialGrid variant="favorites" />
              </div>
              {/* Spacer between social section and footer */}
              <div className="h-32 sm:h-40 md:h-48 lg:h-56 bg-cream" />
              <Footer />
            </>
          )}
        </motion.div>
      )}
    </main>
  );
}
