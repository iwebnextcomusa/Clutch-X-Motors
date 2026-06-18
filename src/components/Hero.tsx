import React from "react";
import { ShieldCheck, Phone, Zap, ArrowRight, MapPin } from "lucide-react";
import ThreeCarScene from "./ThreeCarScene";
import { BUSINESS_INFO } from "../data";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen bg-[#0d0d0d] pt-28 pb-16 flex items-center overflow-hidden">
      
      {/* Background futuristic grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Immersive Theme Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copywriting Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Location context Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-600/10 border border-red-600/30 rounded-full w-fit">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-red-550">
                Nepean & Ottawa Region Specialist
              </span>
            </div>

            {/* Headline with custom stroking & deep italics */}
            <h1 className="font-sans font-black italic uppercase text-5xl sm:text-6xl xl:text-7xl text-white tracking-tighter leading-[0.95] md:leading-[0.9]">
              Elite Performance <br/>
              <span className="text-stroke-white select-none">Unrivaled Care.</span>
            </h1>

            <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              Your destination for precision diagnostics, performance upgrades, and high-end automotive maintenance in Nepean, Ontario. We don't just fix cars; we optimize them.
            </p>

            {/* Structured quick credentials */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded bg-red-600/10 text-red-500 border border-red-900/20 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-wider">Diagnostic Specialists</h4>
                  <p className="text-gray-500 text-[11px] font-sans">Advanced computer mapping</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded bg-red-600/10 text-red-500 border border-red-900/20 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-wider">Performance Inspired</h4>
                  <p className="text-gray-500 text-[11px] font-sans">Tuning & custom power builds</p>
                </div>
              </div>
            </div>

            {/* Direct primary booking CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-tighter transition-all duration-300 shadow-xl shadow-red-600/10 cursor-pointer group"
              >
                <span>Book Mechanical Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-black uppercase tracking-tighter transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Call Shop: {BUSINESS_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Micro-SEO anchors */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[9px] text-zinc-600 uppercase mt-4">
              <span>#AutoRepairNepean</span>
              <span>•</span>
              <span>#MechanicNepeanOntario</span>
              <span>•</span>
              <span>#CarRepairNearMe</span>
              <span>•</span>
              <span>#PerformanceAutoShop</span>
            </div>

          </div>

          {/* ThreeJS Interactive Column */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center">
            <ThreeCarScene />
          </div>

        </div>
      </div>
    </section>
  );
}
