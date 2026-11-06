"use client";

import React from "react";
import { SoundProvider } from "@/context/SoundContext";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { VenturesSection } from "@/components/VenturesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { EducationSection } from "@/components/EducationSection";
import { SpotifySection } from "@/components/SpotifySection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SoundProvider>
      <div className="home-page-container">
        <BackgroundParticles />

        <div className="home-ui-scale">
          <Navbar />
          <main>
            <Hero />
            <About />
            <EducationSection />
            <ExperienceSection />
            <VenturesSection />
            <CapabilitiesSection />
            <SpotifySection />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SoundProvider>
  );
}
