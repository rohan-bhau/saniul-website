"use client";

import React from "react";
import {
  Layers,
  TrendingUp,
  Handshake,
  DollarSign,
  Truck,
  Target,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface Capability {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CAPABILITIES: Capability[] = [
  {
    id: "ops-mgmt",
    name: "Operations Management",
    category: "Core Discipline",
    description: "Daily workflow architecture, process optimization, and operational team coordination.",
    icon: Layers,
  },
  {
    id: "trade-commerce",
    name: "Trading & Commerce",
    category: "Wholesale Trade",
    description: "Domestic wholesale commodity trade, market valuation, and commercial contract execution.",
    icon: TrendingUp,
  },
  {
    id: "vendor-rel",
    name: "Vendor & Supplier Relations",
    category: "Procurement",
    description: "Tier-1 supplier negotiations, service-level agreements, and partner reliability.",
    icon: Handshake,
  },
  {
    id: "fin-gov",
    name: "Financial Governance",
    category: "Capital Control",
    description: "Operating budget oversight, disciplined capital allocation, and payment settlements.",
    icon: DollarSign,
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Logistics",
    category: "Distribution",
    description: "Distribution network planning, freight dispatch schedules, and inventory buffering.",
    icon: Truck,
  },
  {
    id: "strat-exec",
    name: "Strategic Execution",
    category: "Leadership",
    description: "Translating commercial targets into operational milestones with disciplined deadlines.",
    icon: Target,
  },
  {
    id: "client-mgmt",
    name: "Commercial Alliances",
    category: "Partnerships",
    description: "Fostering long-term client trust, stakeholder alignment, and trade collaborations.",
    icon: Users,
  },
  {
    id: "risk-mgmt",
    name: "Governance & Compliance",
    category: "Trade Standards",
    description: "Supply disruption mitigation, statutory trade compliance, and regulatory adherence.",
    icon: ShieldCheck,
  },
];

export function CapabilitiesSection() {
  return (
    <section
      className="portfolio-root-section py-20 px-4 sm:px-6"
      id="Capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-display-title !mb-2 text-2xl sm:text-3xl md:text-4xl" id="capabilities-heading">
            Core Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Functional competencies honed through active enterprise management, procurement cycles, and trade operations in Bangladesh.
          </p>
        </div>

        {/* 8 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CAPABILITIES.map((cap) => {
            const IconComponent = cap.icon;
            return (
              <article
                key={cap.id}
                className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0e1628]/90 to-[#070b14]/95 border border-white/10 hover:border-blue-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {cap.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors tracking-tight">
                    {cap.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Core Capability</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
