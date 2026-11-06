"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Send, Briefcase } from "lucide-react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        stage.classList.toggle("is-in-view", entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-root-section"
      id="About"
      aria-labelledby="about-section-heading"
    >
      <h2 className="section-display-title" id="about-section-heading">
        About Me
      </h2>

      <div className="about-container-inner">
        <div className="about-intro">
          <h2 className="about-title" id="about-title">
            <span className="about-title-greeting">Hi, I&apos;m</span>
            <span className="whitespace-nowrap">Sani Ul</span>
          </h2>
          <a href="#Contact" className="about-action about-action-primary">
            <Send size={17} />
            <span>Get in Touch</span>
          </a>
        </div>

        <div
          ref={stageRef}
          className="about-portrait-stage"
          aria-label="Portrait of Sani Ul"
        >
          <div className="about-portrait-glow" />
          <div className="about-portrait">
            {/* Real authentic photo of Sani Ul */}
            <Image
              className="about-person-image"
              src="/images/sani/sani-about-portrait.webp"
              alt="Sani Ul - Operations Manager"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <span className="about-portrait-orbit about-portrait-orbit-one" />
          <span className="about-portrait-orbit about-portrait-orbit-two" />
        </div>

        <div className="about-bio">
          <p>
            I am an <strong>Operations Manager &amp; Business Leader</strong> focused
            on strategic operations, trading initiatives, and driving sustainable
            commercial growth in Bangladesh.
          </p>
          <p>
            With disciplined execution, supply chain optimization, and enterprise
            management, I bridge operational efficiency with long-term business vision.
          </p>
          <a href="#Ventures" className="about-action about-action-secondary">
            <Briefcase size={17} />
            <span>Explore Ventures</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
