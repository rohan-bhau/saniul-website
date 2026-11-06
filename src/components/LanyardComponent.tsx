"use client";

import React, { useEffect, useRef, useState } from "react";

export function LanyardComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 767 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 767;
      setIsMobile((prev) => (prev !== mobile ? mobile : prev));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let root: { unmount: () => void } | null = null;

    const initLanyard = async () => {
      try {
        const dynamicImport = new Function("u", "return import(u)");
        const LanyardMod = await dynamicImport("/assets/Lanyard.js?v=2");
        const ReactMod = await dynamicImport("/assets/index-DaF2D7ct.js");

        if (destroyed || !containerRef.current) return;

        const isMobile = window.innerWidth <= 767;
        const v = "v7_final_strap";
        const element = ReactMod.jsxRuntime.jsx(LanyardMod.default, {
          frontImage: "/images/sani/sani-front-pure.png?v=" + v,
          backImage: "/images/sani/sani-back-pure.png?v=" + v,
          strapImage: "/images/sani/sani-strap-pure.png?v=" + v,
          cardColor: "#04010e09",
          imagePadding: 0.035,
          strapColor: "#111827",
          finish: "glossy",
          anchor: isMobile ? "center" : "right",
          orientation: "portrait",
          size: 0.62,
          cornerRadius: 0.25,
          strapLength: 0.59,
          strapWidth: 0.62,
          gravity: 1.2,
          damping: 0.35,
          elasticity: 0.7,
          breeze: 0.1,
          interactive: true,
          autoFlip: true,
          metal: "silver",
          intro: false,
        });

        const r = ReactMod.ReactDOM.createRoot(containerRef.current);
        root = r;
        r.render(element);
      } catch (err) {
        console.error("Lanyard initialization error:", err);
      }
    };

    initLanyard();

    return () => {
      destroyed = true;
      try {
        root?.unmount();
      } catch {}
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative pointer-events-auto bg-transparent"
      style={{ background: "transparent" }}
    />
  );
}
