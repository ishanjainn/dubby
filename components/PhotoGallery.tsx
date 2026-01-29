"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface TimelineItem {
  year: string;
  date?: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "1998",
    date: "25 April",
    title: "Born",
    subtitle: "The Beginning",
    description: "Started the journey",
    image: "/assets/timeline/birth.jpg",
  },
  {
    year: "2013",
    title: "10th Grade",
    subtitle: "K Sudarshan Central School",
    description: "CCL Bermo, Bokaro • 10 CGPA",
    image: "/assets/timeline/10th.jpg",
  },
  {
    year: "2015",
    title: "12th Grade",
    subtitle: "DPS Ranchi",
    description: "91%",
    image: "/assets/timeline/12th.jpg",
  },
  {
    year: "2020",
    title: "B.Tech Graduate",
    subtitle: "UIET Chandigarh",
    description: "Electronics Engineering",
    image: "/assets/timeline/btech.jpg",
  },
  {
    year: "2020",
    date: "June",
    title: "Intern",
    subtitle: "KPMG India",
    description: "Started professional journey",
    image: "/assets/timeline/kpmg-intern.jpg",
  },
  {
    year: "2020",
    date: "September",
    title: "Analyst",
    subtitle: "KPMG India",
    description: "First full-time role",
    image: "/assets/timeline/kpmg-analyst.jpg",
  },
  {
    year: "2022",
    title: "Associate Consultant",
    subtitle: "KPMG India",
    description: "First promotion",
    image: "/assets/timeline/kpmg-associate.jpg",
  },
  {
    year: "2023",
    title: "Consultant",
    subtitle: "KPMG India",
    description: "Growing responsibilities",
    image: "/assets/timeline/kpmg-consultant.jpg",
  },
  {
    year: "2024",
    title: "Assistant Manager",
    subtitle: "KPMG India",
    description: "Current role",
    image: "/assets/timeline/kpmg-am.jpg",
  },
];

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll - responsive based on screen size
  // Mobile: 180px intro + (9 × 220px items) = ~2160px content
  // Desktop: 280px intro + (9 × 320px items) = ~3160px content
  const scrollAmount = isMobile ? -1600 : -2200;
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollAmount]);
  
  // Background: dark green → cream
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#2A2F23", "#8A8A7A", "#F5F5F0"]
  );

  // Text color transition
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#E8E4D9", "#4A4A3A", "#2A2F23"]
  );

  const labelColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(232, 228, 217, 0.5)", "rgba(42, 47, 35, 0.4)", "rgba(42, 47, 35, 0.5)"]
  );

  const lineColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(232, 228, 217, 0.2)", "rgba(42, 47, 35, 0.15)", "rgba(42, 47, 35, 0.2)"]
  );

  return (
    <motion.section 
      ref={containerRef} 
      className="relative h-[300vh] md:h-[400vh]"
      style={{ backgroundColor }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontally scrolling content */}
        <motion.div
          className="absolute inset-0"
          style={{ x }}
        >
          {/* Wide container for horizontal scroll - auto width based on content */}
          <div className="relative h-full flex items-center w-max">
            
            {/* Timeline Line */}
            <motion.div 
              className="absolute top-1/2 left-[5%] h-[1px]"
              style={{ 
                backgroundColor: lineColor,
                width: "95%",
              }}
            />

            {/* Timeline Items - includes intro section */}
            <div className="flex items-center gap-0 pl-[3%] pr-[5%]">
              {/* Intro/Title Section */}
              <div className="flex-shrink-0 w-[180px] md:w-[280px] px-4 md:px-8 flex flex-col justify-center">
                <motion.div style={{ color: textColor }}>
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase opacity-50">The Journey</span>
                  <h2 className="text-2xl md:text-4xl font-display font-bold mt-2">Timeline</h2>
                  <p className="text-xs md:text-sm opacity-60 mt-2 md:mt-3 max-w-[160px] md:max-w-[200px]">
                    A visual journey through the years
                  </p>
                </motion.div>
              </div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col flex-shrink-0 w-[220px] md:w-[320px] px-4 md:px-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  {/* Year marker on timeline */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div 
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-lime"
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>

                  {/* Content - alternating above/below timeline */}
                  <div className={`flex flex-col ${index % 2 === 0 ? 'mb-12 md:mb-24' : 'mt-12 md:mt-24'}`}>
                    {/* Text Content */}
                    <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                      <motion.span 
                        className="block text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em] uppercase mb-1"
                        style={{ color: labelColor }}
                      >
                        {item.date ? `${item.date} ${item.year}` : item.year}
                      </motion.span>
                      <motion.h3 
                        className="text-lg md:text-2xl font-display font-bold mb-1"
                        style={{ color: textColor }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-xs md:text-sm font-medium mb-1"
                        style={{ color: textColor }}
                      >
                        {item.subtitle}
                      </motion.p>
                      {item.description && (
                        <motion.p 
                          className="text-[10px] md:text-xs opacity-60"
                          style={{ color: textColor }}
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Image */}
                    <div className={`mt-3 md:mt-4 ${index % 2 === 0 ? 'order-2' : 'order-1 mb-3 md:mb-4'}`}>
                      <div className="relative w-[140px] h-[180px] md:w-[200px] md:h-[260px] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                        {/* Fallback gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-dark-green/40 to-dark-text/60" />
                        {/* Year overlay */}
                        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
                          <span className="text-2xl md:text-4xl font-display font-bold text-white/20">
                            {item.year.slice(-2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
