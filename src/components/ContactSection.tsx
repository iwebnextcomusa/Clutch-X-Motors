import React from "react";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "../data";

export default function ContactSection() {
  return (
    <div className="flex flex-col gap-12 text-left">
      
      {/* Structural layout: Contact Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Telephone */}
        <a 
          href={`tel:${BUSINESS_INFO.phone}`}
          className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4 hover:border-red-600/30 transition-colors group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-650/10 text-red-500 border border-red-900/20 group-hover:bg-red-650 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
              Call Hotline
            </h4>
            <p className="font-sans font-black text-white text-lg group-hover:text-red-500 transition-colors">
              {BUSINESS_INFO.phoneFormatted}
            </p>
            <p className="font-sans text-[11px] text-zinc-500 mt-0.5">
              Instant booking, towing & consults
            </p>
          </div>
        </a>

        {/* Card 2: Email */}
        <a 
          href={`mailto:${BUSINESS_INFO.email}`}
          className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4 hover:border-red-600/30 transition-colors group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-650/10 text-red-500 border border-red-900/20 group-hover:bg-red-650 group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
              Email Dispatch
            </h4>
            <p className="font-sans font-black text-white text-base truncate group-hover:text-red-500 transition-colors">
              {BUSINESS_INFO.email}
            </p>
            <p className="font-sans text-[11px] text-zinc-500 mt-1">
              General build inquries & media logs
            </p>
          </div>
        </a>

        {/* Card 3: Location */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-650/10 text-red-500 border border-red-900/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
              Shop Location
            </h4>
            <p className="font-sans font-black text-white text-sm">
              {BUSINESS_INFO.address}
            </p>
            <p className="font-sans text-[11px] text-zinc-500 mt-1">
              Nepean (Merivale/Hunt Club Area)
            </p>
          </div>
        </div>

        {/* Card 4: Operating Hours */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-650/10 text-red-500 border border-red-900/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
              Service Windows
            </h4>
            <div className="flex flex-col gap-1 text-[11px] font-sans text-zinc-400">
              {BUSINESS_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-zinc-850/60 pb-1 last:border-b-0">
                  <span className="font-bold text-zinc-300">{h.days}:</span>
                  <span className="text-zinc-500">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Structural layout: Map Embed & Callout Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-3">
        
        {/* Column 1: Elegant Interactive Map Embed of Nepean area */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-3 h-[380px] sm:h-[450px] relative overflow-hidden shadow-xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x4cde06fac05a2df7%3A0xe54d6fa7c6bd9ac5!2sNepean%2C%20ON!5m2!1sen!2sca" 
            className="w-full h-full rounded-2xl border-0" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Nepean location pin for ClutchX Motors"
          ></iframe>
        </div>

        {/* Column 2: Directions guidance card */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-red-500 uppercase font-bold tracking-widest leading-none">
              DIRECTIONS ADVISORY
            </span>
            <h4 className="font-sans font-black text-white text-lg tracking-tight uppercase leading-snug">
              Finding ClutchX Motors in Nepean
            </h4>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-1">
              We are conveniently situated near the intersection of <strong>Merivale Road & West West Hunt Club Road</strong> in Nepean, Ontario. This location boasts extreme access convenience, allowing rapid arrivals for motorists from Barrhaven, Kanata, central Ottawa, and Carleton.
            </p>
            <div className="p-3.5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5 font-sans text-xs">
              <p className="text-zinc-300">
                <strong>From Hwy 417 (The Queensway):</strong>
              </p>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Take Woodroffe Ave or Maitland Ave exit south, turn right onto Merivale Road, and follow south until reaching Hunt Club sector.
              </p>
            </div>
          </div>

          <a 
            href="https://google.com/maps?q=Nepean,+ON" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-4 bg-zinc-950 hover:bg-zinc-850 text-white border border-zinc-800 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all mt-6"
          >
            <span>Launch Google Navigation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
