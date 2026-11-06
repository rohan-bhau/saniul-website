"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Building2,
  Store,
  Truck,
} from "lucide-react";
import { SANIUL_DATA } from "@/data/saniulData";

const VENTURE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "ayan-trading-house": Building2,
  "commercial-ventures": Store,
  "enterprise-logistics": Truck,
};

export function VenturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;

            if (totalScrollable > 0) {
              const scrolled = -rect.top;
              const p = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
              setScrollProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Card 0: Stays at y=0, slightly scales down as subsequent cards stack over it
  const scale0 = 1 - scrollProgress * 0.04;

  // Card 1: Animates from y=600 to y=36 between progress 0.10 and 0.48
  const rawP1 = Math.min(Math.max((scrollProgress - 0.10) / 0.38, 0), 1);
  const easeP1 = 1 - Math.pow(1 - rawP1, 3);
  const y1 = (1 - easeP1) * 600 + 36;
  const scale1 = 0.98 + easeP1 * 0.02 - (scrollProgress > 0.48 ? (scrollProgress - 0.48) * 0.02 : 0);

  // Card 2: Animates from y=600 to y=72 between progress 0.48 and 0.86
  const rawP2 = Math.min(Math.max((scrollProgress - 0.48) / 0.38, 0), 1);
  const easeP2 = 1 - Math.pow(1 - rawP2, 3);
  const y2 = (1 - easeP2) * 600 + 72;
  const scale2 = 0.98 + easeP2 * 0.02;

  const cardTransforms = [
    { y: 0, scale: scale0, opacity: 1 },
    { y: y1, scale: scale1, opacity: rawP1 > 0 ? 1 : 0 },
    { y: y2, scale: scale2, opacity: rawP2 > 0 ? 1 : 0 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "290vh" }}
      id="Ventures"
      aria-labelledby="ventures-heading"
    >
      {/* Pinned Screen Viewport - Positioned cleanly below floating navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-18 sm:pt-20 pb-4 px-3 sm:px-6">
        {/* Section Display Title & Subtitle with clean bottom gap */}
        <div className="text-center mb-5 sm:mb-6 flex-shrink-0">
          <h2
            className="section-display-title !mb-1 text-2xl sm:text-3xl md:text-4xl"
            id="ventures-heading"
          >
            Ventures &amp; Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Commercial operations, sole proprietorship enterprises, and strategic distribution networks overseen by Sani Ul.
          </p>
        </div>

        {/* Stack Deck Area - Broad Horizontal Width (1080px) & Expanded Height */}
        <div className="relative w-full max-w-[1080px] h-[520px] sm:h-[560px]">
          {SANIUL_DATA.businesses.map((biz, index) => {
            const CardIcon = VENTURE_ICONS[biz.slug] || Building2;
            const tf = cardTransforms[index] || { y: 0, scale: 1, opacity: 1 };

            return (
              <div
                key={biz.id}
                className="venture-stack-card absolute inset-x-0 top-0 will-change-transform"
                style={{
                  transform: `translate3d(0, ${tf.y}px, 0) scale(${tf.scale})`,
                  transformOrigin: "top center",
                  opacity: tf.opacity,
                  zIndex: (index + 1) * 10,
                  transition: "none",
                }}
              >
                <article className="w-full rounded-[20px] sm:rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0e1628] to-[#070b14] shadow-[0_-12px_32px_rgba(0,0,0,0.85),0_28px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
                  {/* Top: Large Prominent Banner Image */}
                  <div className="relative w-full h-[190px] sm:h-[240px] md:h-[270px] bg-slate-950 overflow-hidden">
                    <Image
                      src={biz.image}
                      alt={biz.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1080px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1628]/90 via-transparent to-black/20" />
                  </div>

                  {/* Below Image: Venture Name with Logo, Truncated Description, Location & View Details */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                    {/* Venture Name with Suitable Logo */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <CardIcon size={20} />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                        {biz.name}
                      </h3>
                    </div>

                    {/* Description Truncated to 2 Lines */}
                    <p className="text-xs sm:text-sm md:text-[15px] text-slate-300/90 leading-relaxed line-clamp-2">
                      {biz.description}
                    </p>

                    {/* Footer Row: Location on Left, View Details on Right */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 min-w-0">
                        <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{biz.location}</span>
                      </div>

                      <Link
                        href={`/ventures/${biz.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all hover:gap-2.5 shadow-md flex-shrink-0 ml-auto"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
