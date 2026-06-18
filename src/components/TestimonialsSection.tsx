import React from "react";
import { Star, ShieldAlert, BadgeCheck, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-[#0d0d0d] py-24 border-t border-white/10">
      
      {/* Visual background accents */}
      <div className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full bg-zinc-800/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
            VERIFIED FEEDBACK
          </span>
          <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl text-white tracking-tighter mt-1 mb-4 leading-none">
            Hear From Ottawa <span className="text-stroke-white text-red-600">Region Motorists</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
            Local drivers in Nepean, Ottawa, and Barrhaven depend on ClutchX Motors for transparent diagnostics and uncompromising build quality. Read their independent testimonials.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="relative flex flex-col justify-between bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:border-red-600 transition-all duration-300"
            >
              {/* Abs quote mark */}
              <div className="absolute top-5 right-5 text-white/5">
                <Quote className="w-8 h-8" />
              </div>

              <div>
                {/* Micro Star Row */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-sans font-black italic text-white tracking-tight uppercase leading-none mb-1">
                      {t.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400">
                      {t.location} • {t.vehicle}
                    </span>
                  </div>

                  {t.verified && (
                    <div className="flex items-center gap-1 bg-red-650/10 text-red-500 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 border border-red-900/10">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>VERIFIED OWNER</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Schema injection box for search engines (visually clean) */}
        <div className="mt-16 bg-black/45 p-6 border border-white/10 text-left max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600/15 flex items-center justify-center text-emerald-500 border border-emerald-950">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-sans font-black italic uppercase tracking-wider mb-0.5">Automotive Trust Index</h4>
              <p className="text-gray-500 text-[11px] font-sans">
                Our reviews are verified via actual work orders logged in Nepean, Ontario.
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center font-mono text-xs">
            <span className="text-gray-400 font-bold">Aggregate Score:</span>
            <span className="text-white font-bold bg-black px-2.5 py-1 border border-white/15">
              4.9 / 5.0 Stars
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
