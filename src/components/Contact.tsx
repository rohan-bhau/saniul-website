"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Tag,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Building2,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SANIUL_DATA } from "@/data/saniulData";
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
} from "./SocialIcons";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#38bdf8", "#60a5fa", "#34d399"],
        });
      } catch {
        // Confetti optional
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      className="portfolio-root-section py-20 px-4 sm:px-6 relative"
      id="Contact"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="section-display-title !mb-2 text-2xl sm:text-3xl md:text-4xl"
            id="contact-section-heading"
          >
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Discuss commercial partnerships, trade procurement, or operational collaborations directly with Sani Ul.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Executive Mandate (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0e1628]/95 to-[#070b14]/95 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase mb-4">
                <Building2 size={15} />
                <span>Executive Office</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Sani Ul
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Operations Manager at Ayan Trading House. Available for wholesale trade agreements, vendor contracts, and strategic business initiatives.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 uppercase">
                      Email Communication
                    </span>
                    <a
                      href={`mailto:${SANIUL_DATA.person.contact.email}`}
                      className="text-slate-200 hover:text-blue-400 font-medium transition-colors break-all"
                    >
                      {SANIUL_DATA.person.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 uppercase">
                      Headquarters &amp; Location
                    </span>
                    <span className="text-slate-200 font-medium">
                      {SANIUL_DATA.person.contact.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 uppercase">
                      Operational Availability
                    </span>
                    <span className="text-slate-200 font-medium">
                      Sunday – Thursday (9:00 AM – 6:00 PM BST)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-7 pt-5 border-t border-white/10">
                <span className="block text-[11px] font-mono text-slate-500 uppercase mb-3">
                  Verified Social Channels
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={SANIUL_DATA.person.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href={SANIUL_DATA.person.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="Facebook"
                  >
                    <FacebookIcon size={16} />
                  </a>
                  <a
                    href={SANIUL_DATA.person.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href={SANIUL_DATA.person.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 flex items-center justify-center transition-all"
                    title="TikTok"
                  >
                    <TiktokIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Integrated Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0e1628]/95 to-[#070b14]/95 border border-white/10 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill in your inquiry details below. Your submission is recorded and dispatched directly to Sani Ul.
                </p>
              </div>

              {/* Status Alerts */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Message delivered successfully.</strong>
                    <span className="text-emerald-400/90 text-xs">
                      Your inquiry has been submitted and delivered to Sani Ul. You will receive a response shortly.
                    </span>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Submission failed.</strong>
                    <span className="text-rose-400/90 text-xs">
                      {errorMessage || "Unable to send message. Please try again or email directly."}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User size={13} className="text-blue-400" />
                      <span>Full Name</span>
                      <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail size={13} className="text-blue-400" />
                      <span>Email Address</span>
                      <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone size={13} className="text-blue-400" />
                      <span>Phone Number</span>
                      <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Tag size={13} className="text-blue-400" />
                      <span>Subject</span>
                      <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Commercial Procurement / Partnership"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-blue-400" />
                    <span>Message &amp; Project Details</span>
                    <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Provide specific details regarding your inquiry, trade volume, or proposal..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed hover:gap-2.5"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
