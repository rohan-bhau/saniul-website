"use client";

import React from "react";
import { GraduationCap, BookOpen, Award, CheckCircle } from "lucide-react";
import { SANIUL_DATA } from "@/data/saniulData";

export function EducationSection() {
  return (
    <section
      className="portfolio-root-section"
      id="Education"
      aria-labelledby="education-heading"
    >
      <div className="portfolio-container-inner">
        <div className="portfolio-section-header">
          <h2 className="section-display-title" id="education-heading">
            Education
          </h2>
          <p className="portfolio-section-subtitle">
            Formal business education and commercial fundamentals providing the
            theoretical framework for strategic operations and trade management.
          </p>
        </div>

        <div className="education-cards-grid">
          {SANIUL_DATA.education.map((edu) => (
            <article key={edu.id} className="education-card">
              <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <GraduationCap size={22} className="sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wider leading-tight">
                      {edu.field}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                      <Award size={12} />
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100 leading-snug">
                    {edu.degree}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4 text-xs sm:text-sm font-medium text-slate-300">
                <BookOpen size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 min-w-0">
                  <span className="text-slate-200 font-medium">{edu.institution}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 text-xs">Dhaka, Bangladesh</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {edu.description}
              </p>

              <div className="pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                  Verified Credential
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Academic Record</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

