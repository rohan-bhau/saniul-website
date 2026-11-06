"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { SANIUL_DATA } from "@/data/saniulData";
import { LinkedinIcon, InstagramIcon, FacebookIcon, TiktokIcon } from "./SocialIcons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-wrap">
            <a
              href="#Home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-2.5 mb-3.5 transition-opacity hover:opacity-85"
              aria-label="Sani Ul Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sani/sani-emblem.png"
                alt="SU"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Sani Ul
              </span>
            </a>
            <p className="footer-tagline">
              Operations Manager at Ayan Trading House • Entrepreneur • Building businesses with consistency, discipline, and purpose.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-heading">Navigation</span>
            <div className="footer-links-list">
              <a href="#Home">Home</a>
              <a href="#About">About</a>
              <a href="#Experience">Experience</a>
              <a href="#Ventures">Ventures</a>
              <a href="#Capabilities">Capabilities</a>
              <a href="#Contact">Contact</a>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-heading">Connect</span>
            <div className="footer-social-row">
              <a
                href={SANIUL_DATA.person.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
              >
                <TiktokIcon size={16} />
              </a>
              <a
                href={SANIUL_DATA.person.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Sani Ul. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
