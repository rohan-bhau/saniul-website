"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

let audioCtx: AudioContext | null = null;
const clickVolume = 0.25;
let isSoundGloballyEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const sfx = {
  hover: () => {
    if (!isSoundGloballyEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable or blocked
    }
  },
  click: () => {
    if (!isSoundGloballyEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(clickVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked
    }
  },
  success: () => {
    if (!isSoundGloballyEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);
        gain.gain.setValueAtTime(0.06, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.25);
      });
    } catch {
      // AudioContext unavailable or blocked
    }
  },
};

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSfx: (name: keyof typeof sfx) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-sound");
    if (saved === "disabled") {
      setSoundEnabled(false);
      isSoundGloballyEnabled = false;
    } else {
      isSoundGloballyEnabled = true;
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      isSoundGloballyEnabled = next;
      localStorage.setItem("portfolio-sound", next ? "enabled" : "disabled");
      if (next) {
        sfx.click();
      }
      return next;
    });
  };

  const playSfx = (name: keyof typeof sfx) => {
    if (soundEnabled && sfx[name]) {
      sfx[name]();
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (!soundEnabled || !(e.target instanceof Element)) return;
    const target = e.target.closest('button, a, [role="button"]');
    if (target && !target.hasAttribute("disabled") && target.getAttribute("aria-disabled") !== "true") {
      sfx.click();
    }
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSfx }}>
      <div style={{ display: "contents" }} onClickCapture={handleClickCapture}>
        {children}
      </div>
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}

