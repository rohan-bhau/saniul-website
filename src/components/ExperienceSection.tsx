"use client";

import React, { useRef, useEffect } from "react";
import {
  Briefcase,
  Building2,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Award,
} from "lucide-react";

export function ExperienceSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (wrapRef.current) {
            const rect = wrapRef.current.getBoundingClientRect();
            const isWrapVisible =
              rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0;
            wrapRef.current.classList.toggle("is-visible", isWrapVisible);

            const viewportTrigger = window.innerHeight * 0.68;
            const scrolledPast = viewportTrigger - rect.top;
            const totalHeight = rect.height;
            const progressRatio = Math.min(
              Math.max(scrolledPast / totalHeight, 0),
              1
            );

            wrapRef.current.style.setProperty(
              "--tree-progress",
              `${(progressRatio * 100).toFixed(2)}%`
            );
            wrapRef.current.style.setProperty(
              "--tree-spark-opacity",
              progressRatio > 0.01 && progressRatio < 0.99 ? "1" : "0"
            );

            branchRefs.current.forEach((branch) => {
              if (branch) {
                const branchRect = branch.getBoundingClientRect();
                const isPassed = branchRect.top <= viewportTrigger;
                branch.classList.toggle("is-revealed", isPassed);
                branch.classList.toggle("is-active", isPassed);
              }
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const treeNodes = [
    {
      id: "ayan-trading",
      role: "Operations Manager",
      organization: "Ayan Trading House",
      period: "2019 – Present",
      badge: "Current Role",
      icon: Building2,
      description:
        "Directing operational workflows, end-to-end trading management, and vendor logistics across Bangladesh with disciplined execution and compliance.",
      highlights: [
        "Overseeing daily trading operations and multi-tier logistics coordination",
        "Managing tier-1 supplier, vendor, and institutional partner relationships",
        "Standardizing operational protocols to ensure 100% fulfillment reliability",
        "Driving business performance and commercial expansion initiatives",
      ],
    },
    {
      id: "sole-proprietorship",
      role: "Founder & Business Owner",
      organization: "Sole Proprietorship Ventures",
      period: "2017 – Present",
      badge: "Entrepreneurship",
      icon: TrendingUp,
      description:
        "Founded and managing active commercial ventures in commodity trade, logistics, and local business distribution in Dhaka.",
      highlights: [
        "End-to-end capital planning, commercial risk modeling, and business setup",
        "Procurement pipeline optimization and strategic vendor negotiation",
        "Establishing autonomous operating procedures for distribution networks",
        "Sustaining multi-year commercial growth and revenue continuity",
      ],
    },
    {
      id: "trading-associate",
      role: "Operations Associate",
      organization: "Commercial Trading Firm",
      period: "2016 – 2019",
      badge: "Foundation",
      icon: Briefcase,
      description:
        "Foundational operations role managing trade documentation, inventory tracking, and warehouse dispatch systems.",
      highlights: [
        "Assisted in daily inventory audits, cargo tracking, and manifest reconciliation",
        "Streamlined delivery schedules across regional freight forwarders",
        "Prepared daily operational reports and cross-departmental coordination",
      ],
    },
    {
      id: "commercial-credibility",
      role: "Operations & Governance Focus",
      organization: "Verified Bangladesh Trade Operations",
      period: "Milestone",
      badge: "Credibility",
      icon: Award,
      description:
        "Over two years of operational leadership upholding rigorous standards in enterprise logistics, vendor contracts, and trading governance.",
      highlights: [
        "100% compliance with domestic trade regulations and tax standards",
        "Proven crisis resilience across market supply fluctuations",
        "Long-term trust relationships with suppliers and banking partners",
      ],
    },
  ];

  return (
    <section
      className="journey-tree-section"
      id="Experience"
      aria-labelledby="experience-heading"
    >
      <div className="portfolio-section-header">
        <h2 className="section-display-title" id="experience-heading">
          Professional Journey
        </h2>
        <p className="portfolio-section-subtitle">
          A chronological path of disciplined operational execution, enterprise
          management, and verified commercial milestones.
        </p>
      </div>

      <div ref={wrapRef} className="journey-tree-wrap">
        {/* Animated Scroll-Filling Trunk Line */}
        <div className="journey-tree-stem-track" aria-hidden="true">
          <div className="journey-tree-stem-fill">
            <span className="journey-tree-stem-spark" />
          </div>
        </div>

        {treeNodes.map((node, index) => {
          const isLeft = index % 2 === 0;
          const NodeIcon = node.icon;

          return (
            <div
              key={node.id}
              ref={(el) => {
                branchRefs.current[index] = el;
              }}
              className={`journey-tree-branch ${
                isLeft ? "branch-left" : "branch-right"
              }`}
            >
              <span className="journey-branch-connector" aria-hidden="true" />
              <div className="journey-node-dot" aria-hidden="true" />

              <article className="journey-card-box">
                <div className="journey-card-header">
                  <div className="journey-logo-badge" aria-hidden="true">
                    <NodeIcon size={24} />
                  </div>
                  <div>
                    <h3 className="journey-role-title">{node.role}</h3>
                    <p className="journey-org-name">{node.organization}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="journey-period-pill">
                        <Calendar size={12} />
                        {node.period}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        {node.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="journey-desc">{node.description}</p>

                <ul className="journey-bullets" aria-label="Key responsibilities">
                  {node.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>
                      <CheckCircle2 size={15} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
