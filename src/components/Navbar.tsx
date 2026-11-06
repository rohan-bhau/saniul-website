"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { useSound, sfx } from "@/context/SoundContext";

const NAV_ITEMS = [
  { name: "Home", href: "#Home" },
  { name: "About", href: "#About" },
  { name: "Experience", href: "#Experience" },
  { name: "Ventures", href: "#Ventures" },
  { name: "Capabilities", href: "#Capabilities" },
  { name: "Contact", href: "#Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, toggleSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["Home", "About", "Education", "Experience", "Ventures", "Capabilities", "Contact"];
      const threshold = window.innerHeight * 0.38;
      let current = sections[0];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      });

      // Map sub-sections to main navbar items
      if (current === "Education") {
        setActiveSection("About");
      } else {
        setActiveSection(current);
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    sfx.click();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <header className={`navbar-root ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between sm:justify-start gap-4 sm:gap-7 lg:gap-9 mt-3 sm:mt-4">
        {/* Desktop Brand: SU emblem + Sani Ul in same line */}
        <a
          href="#Home"
          onClick={(e) => handleNavClick(e, "#Home")}
          className="hidden md:flex items-center gap-2.5 transition-opacity hover:opacity-85 whitespace-nowrap pointer-events-auto pl-1 sm:pl-2"
          aria-label="Sani Ul Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sani/sani-emblem.png"
            alt="SU"
            className="h-8 sm:h-9 w-auto object-contain"
          />
          <span className="text-base sm:text-lg font-bold text-white tracking-tight">
            Sani Ul
          </span>
        </a>

        <div className="navbar-container glass-surface glass-surface--fallback !rounded-full !mt-0 pointer-events-auto w-full md:w-auto">
          <div className="glass-surface__content !rounded-full !px-3 sm:!px-4 !py-2 flex items-center justify-between w-full">
            {/* Mobile Brand on Left: SU emblem + Sani Ul in same line */}
            <a
              href="#Home"
              onClick={(e) => handleNavClick(e, "#Home")}
              className="navbar-mobile-brand flex md:hidden items-center gap-2 mr-auto"
              aria-label="Sani Ul Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sani/sani-emblem.png"
                alt="SU"
                className="h-6 w-auto object-contain"
              />
              <span className="text-sm font-bold text-white tracking-tight">
                Sani Ul
              </span>
            </a>

            <nav className="navbar-links">
              {NAV_ITEMS.map((item) => {
                const secId = item.href.replace("#", "");
                const isActive = activeSection === secId;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`navbar-link-item ${isActive ? "is-active" : ""}`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="navbar-active-pill" />}
                  </a>
                );
              })}
            </nav>

            <div className="navbar-actions flex items-center gap-1 sm:gap-2 ml-auto">
              <button
                type="button"
                onClick={handleSoundToggle}
                className="navbar-icon-btn"
                title={soundEnabled ? "Mute Sound SFX" : "Enable Sound SFX"}
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <Volume2 size={16} className="text-blue-400" />
                ) : (
                  <VolumeX size={16} />
                )}
              </button>

              <button
                type="button"
                className="navbar-mobile-toggle"
                onClick={() => {
                  sfx.click();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`navbar-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
        style={{
          maxHeight: mobileMenuOpen ? "calc(100svh - 85px)" : "0px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <div className="navbar-mobile-glass glass-surface glass-surface--fallback !rounded-2xl">
          <div className="glass-surface__content !p-4 !flex !flex-col !gap-2">
            <div className="navbar-mobile-inner !p-0 !gap-1.5">
              {NAV_ITEMS.map((item) => {
                const secId = item.href.replace("#", "");
                const isActive = activeSection === secId;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`navbar-mobile-link ${isActive ? "is-active" : ""}`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="navbar-mobile-indicator" />}
                  </a>
                );
              })}
              <div className="navbar-mobile-footer !mt-3 !pt-3 border-t border-white/10">
                <a
                  href="#Contact"
                  onClick={(e) => handleNavClick(e, "#Contact")}
                  className="navbar-mobile-cta"
                >
                  <span>Connect with Sani</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
