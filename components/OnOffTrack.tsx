"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import PasswordModal from "./PasswordModal";

interface OnOffTrackProps {
  onReveal?: () => void;
}

export default function OnOffTrack({ onReveal }: OnOffTrackProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPersonalContent, setShowPersonalContent] = useState(false);

  // Check sessionStorage on mount for existing unlock
  useEffect(() => {
    const unlocked = sessionStorage.getItem("offTrackUnlocked") === "true";
    setIsUnlocked(unlocked);
  }, []);

  const handleOnTrackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Trigger reveal of content below
    onReveal?.();
  };

  const handleOffTrackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUnlocked) {
      setShowPersonalContent(true);
      onReveal?.();
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);
    setShowPersonalContent(true);
    onReveal?.();
  };

  return (
    <>
      {/* Section at bottom of page - negative margin pulls it up to overlap with section above */}
      <section className="relative -mt-[50vh] md:-mt-[70vh] h-[80vh] md:h-[85vh] overflow-hidden z-[5]">
        {/* Desktop Layout - Images on sides, text in center */}
        <div className="hidden md:block relative z-10 h-full pt-20">
          {/* Left Image - At left edge, cropped */}
          <div className="absolute left-0 bottom-0 w-[38%] lg:w-[35%] xl:w-[32%] h-full z-10">
            <Image
              src="/assets/ontrack.png"
              alt="On Track"
              fill
              className="object-contain object-left-bottom"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>

          {/* Right Image - At right edge, cropped */}
          <div className="absolute right-0 bottom-0 w-[38%] lg:w-[35%] xl:w-[32%] h-full z-10">
            <Image
              src="/assets/offtrack.png"
              alt="Off Track"
              fill
              className="object-contain object-right-bottom"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>

          {/* Centered Text Content - Vertically centered between the faces */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center h-full">
            {/* Titles Row */}
            <div className="flex justify-center items-start gap-12 lg:gap-20">
              {/* ON TRACK */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-end"
              >
                <div className="text-center">
                  <span 
                    className="font-script text-lime text-8xl lg:text-9xl block transform -rotate-12 mb-[-16px] lg:mb-[-20px]"
                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                  >
                    On
                  </span>
                  <h2 className="font-display text-dark-text text-7xl lg:text-8xl font-bold tracking-tight">
                    TRACK
                  </h2>
                </div>
                <p className="text-dark-text/70 text-base lg:text-lg max-w-[220px] lg:max-w-[280px] text-right leading-relaxed mt-5">
                  Most recent <span className="font-semibold text-dark-text">results</span>,
                  career stats and photos from trackside.
                </p>
              </motion.div>

              {/* OFF TRACK */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="text-center">
                  <span 
                    className="font-script text-lime text-8xl lg:text-9xl block transform -rotate-12 mb-[-16px] lg:mb-[-20px]"
                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                  >
                    Off
                  </span>
                  <h2 className="font-display text-dark-text text-7xl lg:text-8xl font-bold tracking-tight">
                    TRACK
                  </h2>
                </div>
                <p className="text-dark-text/70 text-base lg:text-lg max-w-[220px] lg:max-w-[280px] text-left leading-relaxed mt-5">
                  <span className="font-semibold text-dark-text">Campaigns</span>, shoots
                  and other such promotional materials for fans
                </p>
              </motion.div>
            </div>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center items-center gap-5 mt-10"
            >
              <button
                onClick={handleOnTrackClick}
                className="w-16 h-16 bg-lime rounded-xl flex items-center justify-center 
                         hover:bg-lime/80 transition-all duration-200 group hover:scale-105"
                aria-label="View On Track content"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={handleOffTrackClick}
                className="w-16 h-16 bg-lime rounded-xl flex items-center justify-center 
                         hover:bg-lime/80 transition-all duration-200 group hover:scale-105"
                aria-label={isUnlocked ? "View Off Track content" : "Unlock Off Track content"}
              >
                {isUnlocked ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Text above, images below */}
        <div className="md:hidden relative z-10 h-full flex flex-col pt-16">
          {/* Text Section */}
          <div className="px-6 pt-4 pb-2 relative z-10">
            <div className="flex justify-center items-start gap-4">
              {/* ON TRACK */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-end"
              >
                <div className="text-center">
                  <span 
                    className="font-script text-lime text-5xl block transform -rotate-12 mb-[-10px]"
                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                  >
                    On
                  </span>
                  <h2 className="font-display text-dark-text text-5xl font-bold tracking-tight">
                    TRACK
                  </h2>
                </div>
                <p className="text-dark-text/70 text-sm max-w-[150px] text-right leading-relaxed mt-3">
                  Most recent <span className="font-semibold text-dark-text">results</span>,
                  career stats and photos from trackside.
                </p>
              </motion.div>

              {/* OFF TRACK */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="text-center">
                  <span 
                    className="font-script text-lime text-5xl block transform -rotate-12 mb-[-10px]"
                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
                  >
                    Off
                  </span>
                  <h2 className="font-display text-dark-text text-5xl font-bold tracking-tight">
                    TRACK
                  </h2>
                </div>
                <p className="text-dark-text/70 text-sm max-w-[150px] text-left leading-relaxed mt-3">
                  <span className="font-semibold text-dark-text">Campaigns</span>, shoots
                  and other such promotional materials for fans
                </p>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-4 mt-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={handleOnTrackClick}
                  className="w-12 h-12 bg-lime rounded-lg flex items-center justify-center 
                           hover:bg-lime/80 transition-all duration-200"
                  aria-label="View On Track content"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <button
                  onClick={handleOffTrackClick}
                  className="w-12 h-12 bg-lime rounded-lg flex items-center justify-center 
                           hover:bg-lime/80 transition-all duration-200"
                  aria-label={isUnlocked ? "View Off Track content" : "Unlock Off Track content"}
                >
                  {isUnlocked ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </motion.div>
            </div>
          </div>

          {/* Images Section - Below text, fills remaining space */}
          <div className="relative z-10 w-full flex-1 min-h-[350px]">
            <div className="absolute left-[-20%] bottom-0 w-[65%] h-full">
              <Image
                src="/assets/ontrack.png"
                alt="On Track"
                fill
                className="object-cover object-center-bottom"
                style={{ objectPosition: '65% bottom' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            <div className="absolute right-[-20%] bottom-0 w-[65%] h-full">
              <Image
                src="/assets/offtrack.png"
                alt="Off Track"
                fill
                className="object-cover object-center-bottom"
                style={{ objectPosition: '35% bottom' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Personal Content Section - Revealed after password */}
        <AnimatePresence>
          {showPersonalContent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 z-20 overflow-auto bg-cream"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                      <h3 className="font-display text-2xl md:text-4xl font-bold text-dark-text mb-1 md:mb-2">
                        Personal Life
                      </h3>
                      <p className="text-dark-text/60 text-sm md:text-base">
                        A glimpse into life off the track
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPersonalContent(false)}
                      className="text-dark-text/60 hover:text-dark-text transition-colors p-2"
                      aria-label="Close personal content"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + item * 0.1, duration: 0.4 }}
                        className="aspect-square bg-gradient-to-br from-lime/10 to-dark-text/5 
                                 rounded-xl md:rounded-2xl flex items-center justify-center border border-dark-text/10"
                      >
                        <span className="text-dark-text/30 text-xs md:text-sm">Content {item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />
    </>
  );
}
