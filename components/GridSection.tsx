"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Animated curve component - creates a smooth outward curve at the bottom
function AnimatedCurve({ backgroundColor }: { backgroundColor: string }) {
  const curveRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: curveRef,
    offset: ["start 0.8", "start 0.2"] // Triggers when element is 80% to 20% from top of viewport
  });
  
  // Curve height grows from 30px to 120px as you scroll
  const height = useTransform(scrollYProgress, [0, 1], [30, 120]);
  
  return (
    <div 
      ref={curveRef} 
      className="w-full overflow-hidden" 
      style={{ 
        backgroundColor,
        marginBottom: '-1px'
      }}
    >
      <motion.div
        style={{ height }}
      >
        <svg 
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,0 Q720,100 1440,0 L1440,100 L0,100 Z"
            fill="#f5f5f0"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export interface GridItem {
  name: string;
  category: string;
  image?: string;
}

export interface GridSectionProps {
  titleLine1: string;
  titleLine2: string;
  description: string;
  heroImage: string;
  items: GridItem[];
  categoryColors: Record<string, string>;
  backgroundColor?: string;
}

// Card path with diagonal cut at bottom-right
const cornerRadius = 8;
const stepHeight = 24;
const diagonalStartX = 100;
const diagonalEndX = 80;

const cardPath = `
  M 0.5 ${cornerRadius + 0.5}
  Q 0.5 0.5, ${cornerRadius + 0.5} 0.5
  L ${200 - cornerRadius - 0.5} 0.5
  Q 199.5 0.5, 199.5 ${cornerRadius + 0.5}
  L 199.5 ${200 - stepHeight - cornerRadius}
  Q 199.5 ${200 - stepHeight}, ${200 - cornerRadius - 0.5} ${200 - stepHeight}
  L ${diagonalStartX} ${200 - stepHeight}
  L ${diagonalEndX} 199.5
  L ${cornerRadius + 0.5} 199.5
  Q 0.5 199.5, 0.5 ${200 - cornerRadius - 0.5}
  Z
`;

const cardClipPath = `polygon(
  0% 0%,
  100% 0%,
  100% ${(200 - stepHeight - cornerRadius) / 2}%,
  ${diagonalStartX / 2}% ${(200 - stepHeight) / 2}%,
  ${diagonalEndX / 2}% 100%,
  0% 100%
)`;

// Stagger pattern: odd columns offset by 50% of card height
const shouldOffset = (index: number, columns: number): boolean => {
  const col = index % columns;
  if (columns === 4) return col === 1 || col === 3;
  if (columns === 2) return col === 1;
  return false;
};

// Hook to get current column count based on screen size
function useColumnCount() {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      setColumns(window.innerWidth >= 1024 ? 4 : 2);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

function GridCard({ 
  item, 
  index, 
  columns, 
  categoryColors 
}: { 
  item: GridItem; 
  index: number; 
  columns: number;
  categoryColors: Record<string, string>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasOffset = shouldOffset(index, columns);
  const colorClass = categoryColors[item.category] || 'from-gray-500/30 to-gray-600/30';

  return (
    <div 
      className="relative"
      style={{ 
        marginTop: hasOffset ? '50%' : '0',
        marginBottom: hasOffset ? '-50%' : '0'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with diagonal cut */}
        <div className="relative aspect-square">
          {/* SVG for card shape with diagonal notch */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200" 
            preserveAspectRatio="none"
          >
            <path
              d={cardPath}
              fill="#2a2a2a"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Content Container with matching clip-path */}
          <div 
            className="absolute inset-[2px] overflow-hidden"
            style={{ clipPath: cardClipPath }}
          >
            {/* Gradient Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${colorClass}`}
              animate={{ opacity: isHovered ? 0.6 : 0.3 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Image or Placeholder */}
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-6"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className={`w-1/2 h-1/2 rounded-full bg-gradient-to-br ${colorClass} opacity-60`}
                  animate={{ scale: isHovered ? 1.15 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
            
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-lime/5"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Label positioned in the bottom strip after the diagonal cut */}
          <div className="absolute -bottom-0.5 right-0 text-right">
            <h3 
              className="font-display font-semibold text-white"
              style={{ fontSize: 'clamp(6px, 1.8vw, 14px)' }}
            >
              {item.name}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function GridSection({
  titleLine1,
  titleLine2,
  description,
  heroImage,
  items,
  categoryColors,
  backgroundColor = '#1a1a1a'
}: GridSectionProps) {
  const columns = useColumnCount();

  return (
    <section className="relative min-h-screen" style={{ backgroundColor }}>
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[70vh] mb-16 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* Placeholder gradient - replace with actual hero image */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-lime/10 via-transparent to-transparent" 
            style={{ backgroundColor }} 
          />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
        </motion.div>

        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent" 
          style={{ 
            background: `linear-gradient(to top, ${backgroundColor}, transparent, transparent)` 
          }}
        />

        {/* Title */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{ 
            paddingTop: '32px',
            paddingBottom: '32px',
            paddingLeft: 'clamp(16px, 2.5vw, 40px)', 
            paddingRight: 'clamp(16px, 2.5vw, 40px)' 
          }}
        >
          <div 
            style={{ 
              maxWidth: '1400px', 
              margin: '0 auto' 
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ flexShrink: 0 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display leading-none">
                  <span className="font-light text-white">{titleLine1}</span>
                </h2>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display leading-none">
                  <span className="font-bold text-lime">{titleLine2}</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70"
                style={{ 
                  maxWidth: 'clamp(200px, 25vw, 400px)',
                  fontSize: 'clamp(12px, 1.2vw, 18px)',
                  textAlign: 'right',
                  marginTop: '8px'
                }}
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div 
        style={{ 
          width: '100%',
          paddingLeft: 'clamp(16px, 2.5vw, 40px)', 
          paddingRight: 'clamp(16px, 2.5vw, 40px)',
          paddingBottom: '60px'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1400px', 
            margin: '0 auto' 
          }}
        >
          <div 
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ 
              gap: 'clamp(12px, 1.5vw, 24px)',
              paddingBottom: '10%'
            }}
          >
            {items.map((item, index) => (
              <GridCard 
                key={`${item.name}-${item.category}`} 
                item={item} 
                index={index} 
                columns={columns}
                categoryColors={categoryColors}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <AnimatedCurve backgroundColor={backgroundColor} />
    </section>
  );
}
