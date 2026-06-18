import React, { useState, useRef } from "react";
import { ArrowLeftRight, Paintbrush, ArrowRight, Focus } from "lucide-react";
import { BEFORE_AFTER_PHOTOS } from "../data";

export default function GallerySection() {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("p1");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);

  const activePhoto = BEFORE_AFTER_PHOTOS.find(p => p.id === selectedPhotoId) || BEFORE_AFTER_PHOTOS[0];

  // Drag handles for Before/After Slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // If dragging or just hovering (hover is smoother and easier for conversions!)
    if (e.buttons === 1 || e.type === "mousemove") {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="gallery" className="relative bg-[#0d0d0d] py-24 border-t border-white/10 overflow-hidden">
      
      <div className="absolute top-1/2 right-1/4 w-[250px] h-[250px] rounded-full bg-red-650/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
            BEFORE & AFTER SLIDER
          </span>
          <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl text-white tracking-tighter mt-1 mb-4 leading-none">
            Custom Build & <span className="text-stroke-white text-red-600">Repair Showcase</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
            Move your cursor across the engine chassis images below to explore the transformation achieved in the ClutchX Motors diagnostics and performance shop in Nepean.
          </p>
        </div>

        {/* Gallery selection controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls list */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-4 text-left">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none">
              Select Build Segment
            </span>
            
            <div className="flex flex-col gap-2">
              {BEFORE_AFTER_PHOTOS.map((photo) => {
                const isSelected = selectedPhotoId === photo.id;
                return (
                  <button
                    key={photo.id}
                    onClick={() => {
                      setSelectedPhotoId(photo.id);
                      setSliderPosition(50); // reset slider to center
                    }}
                    className={`p-4 border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-white/10 border-red-550/50 shadow-md translate-x-1" 
                        : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <h4 className="text-xs font-black font-sans uppercase tracking-wider text-white mb-1.5">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] font-sans text-gray-400 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="bg-black/45 p-4 border border-white/10 font-sans text-xs text-gray-500 leading-normal mt-2 flex gap-3">
              <Focus className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 animate-pulse" />
              <span>We upload authentic, un-manipulated visual logs directly from the shop floor. What you see is exact ClutchX build quality.</span>
            </div>
          </div>

          {/* Interactive Drag Screen Frame */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Visual Header indicating slider info */}
            <div className="flex justify-between items-center font-mono text-[10px] text-gray-550 mb-3 px-2 uppercase">
              <span>◄ Before (Stock / Failing)</span>
              <span className="text-red-500 font-bold bg-red-950/15 px-2 py-0.5 border border-red-900/20 flex items-center gap-1">
                <ArrowLeftRight className="w-3 h-3 animate-ping" />
                <span>Move Cursor Over Image</span>
              </span>
              <span>After (ClutchX Spec) ►</span>
            </div>

            {/* Slider container frame */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl select-none cursor-ew-resize group"
            >
              {/* After Image (Background) */}
              <img 
                src={activePhoto.afterUrl} 
                alt={`${activePhoto.title} after`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              {/* After Label */}
              <div className="absolute bottom-4 right-4 z-10 bg-black/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded font-mono text-[10px] text-emerald-500 font-bold shadow-md">
                CLUTCHX SPECIALIST COMPLETED
              </div>

              {/* Before Image (Foreground overlay sliced with sliderPosition percentage) */}
              <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={activePhoto.beforeUrl} 
                  alt={`${activePhoto.title} before`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current?.clientWidth || "100%" }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Before Label */}
              <div className="absolute bottom-4 left-4 z-10 bg-black/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded font-mono text-[10px] text-gray-400 font-bold shadow-md">
                INCOMING DIAGNOSTIC CHASSIS
              </div>

              {/* Vertical Divider line */}
              <div 
                className="absolute top-0 bottom-0 w-[2.5px] bg-red-500 z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Visual drag indicator button in the center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-650 border border-white text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Micro Details under slide */}
            <p className="font-sans text-xs text-gray-550 mt-3 text-right">
              Project ID: #{activePhoto.id.toUpperCase()}-NEPEAN • Double resolution high performance hardware telemetry matching K2G Ontario.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
