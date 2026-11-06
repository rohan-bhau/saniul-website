import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Store,
  Truck,
  Mail,
  Layers,
  ChevronRight,
  Activity,
} from "lucide-react";
import { SANIUL_DATA } from "@/data/saniulData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const VENTURE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "ayan-trading-house": Building2,
  "commercial-ventures": Store,
  "enterprise-logistics": Truck,
};

export async function generateStaticParams() {
  return SANIUL_DATA.businesses.map((biz) => ({
    slug: biz.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = SANIUL_DATA.businesses.find((b) => b.slug === slug);
  if (!venture) return { title: "Venture Not Found" };

  return {
    title: `${venture.name} — Sani Ul`,
    description: venture.description,
  };
}

export default async function VentureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = SANIUL_DATA.businesses.find((b) => b.slug === slug);
  if (!venture) notFound();

  const VentureIcon = VENTURE_ICONS[venture.slug] || Building2;

  // Pagination for previous & next ventures
  const currentIndex = SANIUL_DATA.businesses.findIndex((b) => b.slug === slug);
  const prevVenture =
    currentIndex > 0 ? SANIUL_DATA.businesses[currentIndex - 1] : null;
  const nextVenture =
    currentIndex < SANIUL_DATA.businesses.length - 1
      ? SANIUL_DATA.businesses[currentIndex + 1]
      : null;

  return (
    <div className="home-page-container min-h-screen bg-[#070b14] text-slate-100">
      {/* Subtle ambient lighting */}
      <div className="gsap-ambient" aria-hidden="true">
        <span className="gsap-ambient-orb gsap-ambient-orb-one opacity-30" />
        <span className="gsap-ambient-orb gsap-ambient-orb-two opacity-20" />
      </div>

      <div className="home-ui-scale relative z-10">
        {/* Floating Top Navigation */}
        <header className="sticky top-4 z-50 px-4 md:px-8 py-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Link
              href="/#Ventures"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="text-blue-400" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-400 uppercase hidden sm:inline">
                Active Operation
              </span>
            </div>

            <Link
              href="/#Contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-600/30"
            >
              <Mail size={13} />
              <span>Contact</span>
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Portfolio
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <Link href="/#Ventures" className="hover:text-blue-400 transition-colors">
              Ventures
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-slate-200 font-medium truncate">{venture.name}</span>
          </nav>

          {/* Hero Header Block */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <VentureIcon size={22} />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <span>{venture.industry}</span>
                <span>•</span>
                <span>{venture.period}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {venture.name}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              {venture.tagline}
            </p>

            {/* Meta Tags Strip */}
            <div className="flex items-center gap-2.5 flex-wrap pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                <Briefcase size={13} className="text-blue-400" />
                <span>{venture.role}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                <MapPin size={13} className="text-blue-400" />
                <span>{venture.location}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                <Activity size={13} className="text-emerald-400" />
                <span>Continuous Operations</span>
              </span>
            </div>
          </div>

          {/* Cinematic Hero Image */}
          <div className="relative aspect-[16/9] max-h-[520px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-slate-950">
            <Image
              src={venture.image}
              alt={venture.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1140px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 font-mono">
                {venture.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 font-mono">
                {venture.period}
              </span>
            </div>
          </div>

          {/* Performance Benchmarks Strip */}
          <div className="mb-14">
            <h2 className="text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-blue-400" />
              <span>Operational Metrics &amp; Benchmarks</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {venture.keyMetrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm flex flex-col justify-between"
                >
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                    {metric.value}
                  </strong>
                  <span className="text-xs text-slate-400 font-medium">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Content & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Columns: Overview, Directives, Archive */}
            <div className="lg:col-span-2 space-y-12">
              {/* Executive Overview */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Layers size={20} className="text-blue-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Executive Overview &amp; Scope
                  </h2>
                </div>
                <div className="w-12 h-0.5 bg-blue-500 rounded-full" />
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                  {venture.fullDescription.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Core Operational Directives */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={20} className="text-blue-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Operational Responsibilities &amp; Directives
                  </h2>
                </div>
                <div className="w-12 h-0.5 bg-blue-500 rounded-full" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {venture.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-3 hover:border-blue-500/30 transition-colors"
                    >
                      <CheckCircle2
                        size={17}
                        className="text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Operational Archive / Field Images */}
              {venture.galleryImages && venture.galleryImages.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Building2 size={20} className="text-blue-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Field Views &amp; Operational Archive
                    </h2>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 rounded-full" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    {venture.galleryImages.map((imgSrc, gIdx) => (
                      <div
                        key={gIdx}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-slate-900"
                      >
                        <Image
                          src={imgSrc}
                          alt={`${venture.name} archive view ${gIdx + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 360px"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Governance, Role, and Contact */}
            <div className="space-y-6">
              {/* Governance & Leadership Card */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase">
                  <ShieldCheck size={16} />
                  <span>Leadership Mandate</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Governance &amp; Standard
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Under Sani Ul&apos;s direct supervision, all trading activities,
                  procurement contracts, and distribution schedules follow strict
                  financial governance, vendor compliance, and operational discipline.
                </p>

                <div className="pt-3 border-t border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    ASSIGNED ROLE
                  </span>
                  <span className="text-sm font-semibold text-white block">
                    {venture.role}
                  </span>
                </div>
              </div>

              {/* Commercial Inquiries CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900/90 border border-blue-500/25 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-white">
                  Commercial Opportunities
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Discuss trade collaborations, vendor representation, or distribution logistics directly with Sani Ul.
                </p>
                <Link
                  href="/#Contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-blue-600/30"
                >
                  <Mail size={15} />
                  <span>Send Direct Inquiry</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Pagination: Prev / Next */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            {prevVenture ? (
              <Link
                href={`/ventures/${prevVenture.slug}`}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors p-3.5 rounded-xl bg-white/5 border border-white/10"
              >
                <ArrowLeft size={16} className="text-blue-400" />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-mono text-slate-500">
                    Previous Venture
                  </span>
                  <span>{prevVenture.name}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextVenture ? (
              <Link
                href={`/ventures/${nextVenture.slug}`}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors p-3.5 rounded-xl bg-white/5 border border-white/10 ml-auto"
              >
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-mono text-slate-500">
                    Next Venture
                  </span>
                  <span>{nextVenture.name}</span>
                </div>
                <ArrowRight size={16} className="text-blue-400" />
              </Link>
            ) : (
              <Link
                href="/#Ventures"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors ml-auto"
              >
                <span>Return to Portfolio</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
