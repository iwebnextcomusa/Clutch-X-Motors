import React from "react";
import { Hammer, Award, ShieldAlert, CheckCircle, Users } from "lucide-react";

export default function AboutSection() {
  const highlightPoints = [
    {
      title: "Dealer-Alternative Expertise",
      desc: "Licensed master technicians utilizing dealer-equivalent scanning machinery for precise component diagnosis without high-markup dealer pricing.",
      icon: Award
    },
    {
      title: "Ottawa Valley Climate Prep",
      desc: "Bespoke preparation setups designed to withstand extreme freeze-and-thaw cycles, high road salt environments, and demanding seasonal changes.",
      icon: Hammer
    },
    {
      title: "Absolute Integrity & Transparency",
      desc: "Zero hidden charges. We save failed parts to present visual explanations, and provide digital data logs explaining all telemetry codes directly.",
      icon: Users
    }
  ];

  return (
    <section id="about" className="relative bg-[#0d0d0d] py-24 overflow-hidden border-t border-white/10">
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-red-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Side 1: Imagery recommendations and aesthetic block */}
          <div className="relative">
            {/* Visual presentation block instead of empty image placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
              <div className="absolute top-0 right-0 w-[150px] h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span className="font-mono text-xs uppercase text-gray-400 tracking-wider">Establishment Log #001</span>
              </div>
              <h3 className="font-sans font-black italic uppercase text-2xl text-white tracking-tight mb-4">
                The ClutchX Motors Mission
              </h3>
              <p className="font-sans text-sm text-gray-400 mb-6 leading-relaxed">
                Founded right here in Nepean, Ontario, ClutchX Motors was born from dry mechanical frustration. We set out to change the stale standard repair shop experience: replacing over-hyped vague diagnosis reports with real digital telemetry, high-grade performance materials, and real customer transparency.
              </p>
              <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6">
                Whether diagnosing complex powertrain issues on a domestic transport, calibrating track coilovers, or performing scheduled synthetic lubrication on an import sedan, we treat every chassis with motorsport respect.
              </p>
              
              <div className="flex flex-col gap-2 bg-black/40 border border-white/10 p-4 rounded-xl">
                <p className="font-mono text-[10px] text-zinc-500 uppercase">LOCATION ADVANTAGE</p>
                <p className="font-sans text-xs text-zinc-300 font-bold">
                  Centrally based in Nepean, ON to serve Ottawa, Barrhaven, and Kanata motorists reliably.
                </p>
              </div>
            </div>
            
            {/* Ambient Red glow frame */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-650/30 to-transparent blur-lg opacity-25 -z-10" />
          </div>

          {/* Side 2: Core Why Choose Us */}
          <div className="flex flex-col gap-8 text-left">
            <div>
              <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
                ESTABLISHED TRUST
              </span>
              <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl text-white tracking-tighter mt-1 mb-4 leading-none">
                Why Motorists Choose <span className="text-stroke-white text-red-600">ClutchX</span>
              </h2>
              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                We bridge the gap between traditional mechanical craft and high-tech electrical automotive telemetry, delivering specialized vehicle care tailored to your exact driving demands.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {highlightPoints.map((pt, idx) => (
                <div key={idx} className="flex gap-4 p-4 border border-white/5 hover:border-red-600 bg-white/5 backdrop-blur-sm transition-all duration-300">
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg bg-red-650/10 border border-red-900/30 text-red-500">
                    <pt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-black italic uppercase tracking-wider mb-1.5">
                      {pt.title}
                    </h4>
                    <p className="text-gray-400 text-xs font-sans leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 mt-2 text-center sm:text-left">
              <div>
                <p className="font-sans font-black text-2xl text-white">100%</p>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-tight">Satisified Clients</p>
              </div>
              <div className="border-l border-white/15 pl-4">
                <p className="font-sans font-black text-2xl text-red-500">12+</p>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-tight">Years Combined</p>
              </div>
              <div className="border-l border-white/15 pl-4">
                <p className="font-sans font-black text-2xl text-white">40-Pt</p>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-tight">Standard Inspection</p>
              </div>
            </div>

          </div>

        </div>

        {/* Cinematic Autoplay Background Video Loop Container */}
        <div className="mt-20 md:mt-24 relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 h-[300px] sm:h-[400px] shadow-2xl group">
          
          {/* Native HTML5 video, fully responsive, automated loop & muted playback */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-1000"
            style={{ filter: "grayscale(30%) contrast(110%)" }}
          >
            <source 
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e0c0c1b0f19c961e93cbf7f1e784&profile_id=139&oauth2_token_id=57447761" 
              type="video/mp4" 
            />
            Your browser does not support HTML5 video loops.
          </video>

          {/* Absolute futuristic overlay layouts */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-black/20 pointer-events-none" />
          
          <div className="relative h-full w-full flex flex-col justify-end p-6 sm:p-10 text-left z-10">
            <span className="bg-red-650/15 text-red-500 border border-red-900/30 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 w-fit rounded-full mb-3.5 flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CINEMATIC LIVE STREAM • TELEMETRY ON</span>
            </span>
            
            <h3 className="font-sans font-black italic text-xl sm:text-2xl text-white tracking-tight uppercase leading-snug max-w-xl">
              Engineered with High-Frequency Motorsport Spec Tuning
            </h3>
            <p className="text-gray-400 font-sans text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Our Nepean operations integrate modern computerized powertrain alignment and diagnostic scanners with old-school manual engine building, delivering unmatched mechanical craftsmanship.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
