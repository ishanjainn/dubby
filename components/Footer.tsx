"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "On Track", href: "/on-track" },
  { name: "Off Track", href: "/off-track" },
  { name: "Partnerships", href: "/partnerships" },
  { name: "Calendar", href: "/calendar" },
];

const socialLinks = [
  { name: "TikTok", href: "https://www.tiktok.com/@landonorris" },
  { name: "Instagram", href: "https://www.instagram.com/lando" },
  { name: "YouTube", href: "https://www.youtube.com/@LandoNorris" },
  { name: "Twitch", href: "https://www.twitch.tv/landonorris" },
];

const partnerLogos = [
  "ADD C",
  "GOOGLE",
  "RALPH LAUREN",
  "ANDROID",
  "P&P",
  "MONSTER",
  "HILTON",
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-cream overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Pages Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-dark-text/60 uppercase mb-6">
              Pages
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-text hover:text-lime transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="https://store.landonorris.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-4 py-2 bg-lime text-dark-green rounded-lg text-sm font-medium hover:bg-lime/90 transition-colors"
            >
              Store
            </Link>
          </div>

          {/* Follow On Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-dark-text/60 uppercase mb-6">
              Follow On
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-text hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs tracking-[0.2em] text-dark-text/60 uppercase mb-6">
              Sign Up
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-text/5 border border-dark-text/10 rounded-lg text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:border-lime transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-dark-green text-cream rounded-lg hover:bg-dark-text transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Animated Helmet - placeholder for Rive animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-8 relative h-32 md:h-40 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="relative w-24 h-24 md:w-32 md:h-32"
              >
                <Image
                  src="/assets/helmet-360.png"
                  alt="Helmet"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Fallback - animated circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime/30 to-dark-green/30" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-24 text-center"
        >
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-display leading-tight">
            <span className="text-dark-text">Always</span>
            <br />
            <span className="font-bold text-dark-text">bringing</span>
            <br />
            <span className="text-dark-text">the</span>
            <br />
            <span className="font-bold text-lime">fight.</span>
          </h2>
        </motion.div>

        {/* Business Enquiries */}
        <div className="mt-12 text-center">
          <a
            href="mailto:business@landonorris.com"
            className="inline-flex items-center gap-2 text-dark-text/60 hover:text-lime transition-colors"
          >
            <span className="text-sm">Business Enquiries</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Partner Logos Bar */}
      <div className="border-t border-dark-text/10 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="text-dark-text/30 text-xs tracking-widest font-medium"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-text/10 py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-dark-text/50 text-sm">
              ©2026 Lando Norris. All rights reserved
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link
                href="/legal/privacy-policy"
                className="text-dark-text/50 text-sm hover:text-dark-text transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms-conditions"
                className="text-dark-text/50 text-sm hover:text-dark-text transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 h-48 bg-dark-green/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
    </footer>
  );
}
