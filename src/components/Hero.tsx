"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { SANIUL_DATA } from "@/data/saniulData";
import { LinkedinIcon, InstagramIcon, FacebookIcon, TiktokIcon } from "./SocialIcons";
import { LanyardComponent } from "./LanyardComponent";
import { sfx } from "@/context/SoundContext";

export function Hero() {
  const [roleText, setRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTypewriter = useCallback(() => {
    const roles = SANIUL_DATA.person.roles;
    const currentRole = roles[roleIdx];

    if (isTyping) {
      if (charIdx < currentRole.length) {
        setRoleText((prev) => prev + currentRole[charIdx]);
        setCharIdx((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2200);
      }
    } else {
      if (charIdx > 0) {
        setRoleText((prev) => prev.slice(0, -1));
        setCharIdx((prev) => prev - 1);
      } else {
        setRoleIdx((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [charIdx, isTyping, roleIdx]);

  useEffect(() => {
    const timer = setTimeout(handleTypewriter, isTyping ? 90 : 45);
    return () => clearTimeout(timer);
  }, [handleTypewriter, isTyping]);

  return (
    <section className="hero-root-section relative" id="Home">
      {/* 3D Physics ID Card Lanyard - Hanging directly from top ceiling of screen */}
      <div className={`lanyard-card-container ${isMobile ? "is-mobile" : ""}`}>
        <div className="lanyard-viewport">
          <LanyardComponent />
        </div>
      </div>

      <div className="hero-container-inner relative z-10">
        <div className="hero-text-col">
          {/* Badge completely removed per instructions */}

          <div className="hero-heading-group">
            <h1 className="hero-h1-gradient">Welcome to</h1>
            <h1 className="hero-h1-white">My Portfolio</h1>
          </div>

          <div className="hero-typewriter-row">
            <span className="hero-typewriter-text">{roleText}</span>
            <span className="hero-typewriter-cursor" />
          </div>

          <p className="hero-description-copy">
            Committed to building and operating businesses with discipline, purpose, and consistency. As Operations Manager at Ayan Trading House, I oversee strategic operations, trading initiatives, and organizational growth while developing sustainable sole proprietorship ventures in Bangladesh.
          </p>

          <div className="hero-action-row">
            <a
              href="#Ventures"
              onClick={() => sfx.click()}
              className="hero-btn-primary"
            >
              <span>Explore Ventures</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#Contact"
              onClick={() => sfx.click()}
              className="hero-btn-secondary"
            >
              <span>Get in Touch</span>
              <Send size={15} />
            </a>
          </div>

          <div className="hero-find-me-wrap">
            <span className="hero-find-me-label">Find me</span>
            <div className="hero-social-buttons">
              <a
                href={SANIUL_DATA.person.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="hero-social-icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="hero-social-icon-btn"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="hero-social-icon-btn"
                aria-label="TikTok"
              >
                <TiktokIcon size={18} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="hero-social-icon-btn"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
