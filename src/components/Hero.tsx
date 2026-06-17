import React from "react";
import { ShieldCheck, Phone, Zap, ArrowRight, MapPin } from "lucide-react";
import ThreeCarScene from "./ThreeCarScene";
import { BUSINESS_INFO } from "../data";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen bg-zinc-950 pt-28 pb-16 flex items-center overflow-hidden">
      
      {/* Background futuristic grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-red-650/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] rounded-full bg-zinc-800/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copywriting Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Location context Tag */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full w-fit">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-300">
                Premium Auto Shop • Nepean, Ontario
              </span>
            </div>

            {/* Headline and SEO tags */}
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-tight">
              Uncompromising <span className="text-red-500">Performance</span>, Absolute Automotive Precision.
            </h1>

            <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              ClutchX Motors is Nepean's premier automotive specialist. From dealer-alternative engine diagnostics and scheduled maintenance to performance upgrades and bespoke mechanics, we optimize vehicles for Ottawa climates and car enthusiasts alike.
            </p>

            {/* Structured quick credentials */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded bg-red-600/10 text-red-500 border border-red-900/20 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold font-sans uppercase tracking-wider">Diagnostic Specialists</h4>
                  <p className="text-zinc-500 text-[11px] font-sans">Advanced OEM telemetry scanning</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded bg-red-600/10 text-red-500 border border-red-900/20 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold font-sans uppercase tracking-wider">Performance Inspired</h4>
                  <p className="text-zinc-500 text-[11px] font-sans">Tuning, custom suspension & brakes</p>
                </div>
              </div>
            </div>

            {/* Direct primary booking CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-red-600/20 cursor-pointer group"
              >
                <span>Book Mechanical Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 rounded-xl font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500 animate-bounce" />
                <span>Call Shop: {BUSINESS_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Micro-SEO anchors */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[9px] text-zinc-500 uppercase mt-4">
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
