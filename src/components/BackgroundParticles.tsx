"use client";

import React from "react";

const METEORS = [
  { top: "-8%", left: "8%", duration: "9s", delay: "-3s" },
  { top: "-12%", left: "35%", duration: "11s", delay: "-9s" },
  { top: "12%", left: "-10%", duration: "10s", delay: "-6s" },
  { top: "28%", left: "4%", duration: "12s", delay: "-10s" },
  { top: "-14%", left: "54%", duration: "10s", delay: "-2s" },
  { top: "-6%", left: "78%", duration: "12s", delay: "-7s" },
  { top: "8%", left: "18%", duration: "11s", delay: "-5s" },
  { top: "22%", left: "-8%", duration: "9s", delay: "-8s" },
  { top: "-10%", left: "92%", duration: "13s", delay: "-11s" },
  { top: "36%", left: "-12%", duration: "11s", delay: "-4s" },
  { top: "-18%", left: "43%", duration: "8s", delay: "-6s" },
  { top: "4%", left: "3%", duration: "12s", delay: "-1s" },
  { top: "16%", left: "30%", duration: "10s", delay: "-9s" },
  { top: "30%", left: "-6%", duration: "13s", delay: "-12s" },
  { top: "-5%", left: "65%", duration: "9s", delay: "-4s" },
];

export function BackgroundParticles() {
  return (
    <>
      <div className="gsap-ambient" aria-hidden="true">
        <span className="gsap-ambient-orb gsap-ambient-orb-one" />
        <span className="gsap-ambient-orb gsap-ambient-orb-two" />
        <span className="gsap-ambient-orb gsap-ambient-orb-three" />
      </div>

      <div className="meteor-background" aria-hidden="true">
        {METEORS.map((m, idx) => (
          <span
            key={idx}
            className="meteor"
            style={
              {
                "--meteor-top": m.top,
                "--meteor-left": m.left,
                "--meteor-duration": m.duration,
                "--meteor-delay": m.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
