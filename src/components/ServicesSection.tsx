import React, { useState } from "react";
import * as Lucide from "lucide-react";
import { Service } from "../types";
import { SERVICES } from "../data";

// Helper to look up Lucide icons by string name
const renderServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "Cpu": return <Lucide.Cpu className="w-5 h-5" />;
    case "Disc": return <Lucide.Disc className="w-5 h-5" />;
    case "Zap": return <Lucide.Zap className="w-5 h-5" />;
    case "Droplet": return <Lucide.Droplet className="w-5 h-5" />;
    case "ShieldAlert": return <Lucide.Shield className="w-5 h-5" />; // suspension / sub-ideal road alerts
    case "RotateCw": return <Lucide.RotateCw className="w-5 h-5" />;
    case "Eye": return <Lucide.Eye className="w-5 h-5" />;
    default: return <Lucide.Wrench className="w-5 h-5" />;
  }
};

interface ServicesSectionProps {
  onBookClick: (serviceId?: string) => void;
}

export default function ServicesSection({ onBookClick }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Custom interactive cost estimator state
  const [estimatorVehicle, setEstimatorVehicle] = useState<string>("standard");
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>(["oil-changes"]);

  const categories = [
    { id: "all", label: "All Services" },
    { id: "maintenance", label: "Maintenance" },
    { id: "diagnostics", label: "Diagnostics" },
    { id: "repairs", label: "Repairs" },
    { id: "performance", label: "Performance" }
  ];

  const filteredServices = SERVICES.filter(s => 
    activeCategory === "all" || s.category === activeCategory
  );

  // Math calculation for interactive cost estimation
  const calculateTotalEstimate = () => {
    let subtotal = 0;
    let minTime = 0;
    
    selectedEstimates.forEach(id => {
      const s = SERVICES.find(srv => srv.id === id);
      if (!s) return;
      
      // Parse base dollar limit
      if (s.priceEstimate?.includes("$")) {
        const val = parseInt(s.priceEstimate.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(val)) subtotal += val;
      } else {
        // Custom or quote
        subtotal += 120; // default average project rate multiplier
      }

      // Parse average time mins
      if (s.estimatedTime?.includes("mins")) {
        const val = parseInt(s.estimatedTime.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(val)) minTime += val;
      } else if (s.estimatedTime?.includes("hour")) {
        // e.g. "1 - 2 hours"
        minTime += 90;
      } else {
        minTime += 120;
      }
    });

    // Multipliers based on vehicle tech class
    let multiplier = 1.0;
    if (estimatorVehicle === "european") multiplier = 1.35; // Special scanning and specialized tools
    if (estimatorVehicle === "heavy") multiplier = 1.15; // Truck chassis lift limits

    const adjustedPrice = Math.round(subtotal * multiplier);
    return {
      price: adjustedPrice,
      time: Math.round(minTime)
    };
  };

  const toggleEstimatorService = (id: string) => {
    if (selectedEstimates.includes(id)) {
      if (selectedEstimates.length > 1) {
        setSelectedEstimates(selectedEstimates.filter(x => x !== id));
      }
    } else {
      setSelectedEstimates([...selectedEstimates, id]);
    }
  };

  const estimateResults = calculateTotalEstimate();

  return (
    <section id="services" className="relative bg-[#0d0d0d] py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
            MASTER CATEGORIES
          </span>
          <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl text-white tracking-tighter mt-1 mb-4 leading-none">
            Professional <span className="text-stroke-white text-red-600">Mechanical Catalog</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
            We operate a full-service automotive laboratory in Nepean. Search our scheduled preventative maintenance, engineering diagnostics, and premium tuning solutions.
          </p>

          {/* Tab Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 font-sans text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-650/10"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col justify-between bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-red-600 transition-all duration-300"
            >
              <div>
                {/* Header Icon */}
                <div className="w-10 h-10 flex items-center justify-center bg-red-650/10 text-red-500 border border-red-900/20 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
                  {renderServiceIcon(service.iconName)}
                </div>

                <h3 className="font-sans font-black italic text-base text-white tracking-tight mb-2 uppercase leading-none">
                  {service.title}
                </h3>

                <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <p className="font-sans text-[11px] text-gray-550 leading-normal border-t border-white/10 pt-3 mb-4 italic">
                  {service.longDesc.substring(0, 115)}...
                </p>
              </div>

              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center bg-black/40 px-3 py-2 border border-white/5 font-mono text-[10px] text-gray-400 mb-4">
                  <span className="text-gray-500 uppercase">Rate: <span className="text-gray-300 font-bold">{service.priceEstimate}</span></span>
                  <span>{service.estimatedTime}</span>
                </div>

                <button
                  onClick={() => onBookClick(service.id)}
                  className="w-full py-2.5 bg-white/5 border border-white/10 hover:border-red-600 text-gray-300 hover:text-white font-sans text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Select & Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Estimate Section */}
        <div className="relative bg-white/5 border border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div>
                <span className="text-red-500 font-mono text-xs font-bold tracking-wider uppercase">
                  CLUTCHX LABS PRESENTATION
                </span>
                <h3 className="font-sans font-black italic uppercase text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-2 leading-none">
                  Interactive Service Cost Estimator
                </h3>
                <p className="text-gray-400 font-sans text-xs sm:text-sm">
                  Select your vehicle segment and check desired services. Our telemetry engine provides an instant customized estimation of work time and starting price instantly.
                </p>
              </div>

              {/* Sub-Interactive Selector 1: Vehicle Segment Class */}
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                  1. SELECT VEHICLE ARCHITECTURE CLASS
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "standard", label: "Domestic / Import", desc: "Honda, Ford, Toyota" },
                    { id: "heavy", label: "Truck / Heavy SUV", desc: "F-150, RAM, Tacoma" },
                    { id: "european", label: "European / Sports", desc: "BMW, Audi, Porsche" }
                  ].map((vh) => (
                    <button
                      key={vh.id}
                      onClick={() => setEstimatorVehicle(vh.id)}
                      className={`p-3 border font-sans text-left transition-all cursor-pointer ${
                        estimatorVehicle === vh.id
                          ? "bg-red-600/10 border-red-500 text-white"
                          : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                    >
                      <h5 className="text-[11px] font-black uppercase tracking-wider">{vh.label}</h5>
                      <p className="text-[9px] text-gray-550 mt-0.5">{vh.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Interactive Selector 2: Checkbox Service Menu */}
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2.5">
                  2. CHECK DESIRED WORK ITEMS
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((s) => {
                    const isChecked = selectedEstimates.includes(s.id);
                    return (
                      <div 
                        key={s.id}
                        onClick={() => toggleEstimatorService(s.id)}
                        className={`flex items-center gap-3 p-2.5 border font-sans text-xs font-semibold cursor-pointer select-none transition-colors ${
                          isChecked 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "bg-black/20 border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className={`w-4.5 h-4.5 border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-red-600 border-red-600 text-white" : "border-white/20"
                        }`}>
                          {isChecked && <Lucide.Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Results Display Panel */}
            <div className="lg:col-span-5 bg-black/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden text-center sm:text-left">
              <div className="absolute top-0 right-0 w-[80px] h-[80px] rotate-12 bg-red-600/5 rounded-full blur-xl pointer-events-none" />
              
              <div>
                <div className="bg-red-600/10 text-red-500 text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 w-fit border border-red-900/30 mx-auto sm:mx-0 mb-4">
                  LIVE Telemetry Report
                </div>
                <h4 className="font-sans font-black italic text-lg tracking-wider uppercase mb-1">
                  ESTIMATOR CALCULATOR
                </h4>
                <p className="text-[11px] font-mono text-gray-500 mb-6">
                  Based on current Nepean labor scales
                </p>

                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase">Estimated Starting Rate</span>
                    <p className="text-3xl font-sans font-black text-white mt-1">
                      ${estimateResults.price} <span className="text-gray-500 text-xs font-medium">CAD*</span>
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="text-[9px] font-mono text-gray-500 uppercase">Average Duration</span>
                    <p className="text-xl font-sans font-black text-white mt-2">
                      ~ {Math.round(estimateResults.time / 60) > 0 ? `${Math.floor(estimateResults.time / 60)}h ${estimateResults.time % 60}m` : `${estimateResults.time} mins`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 font-sans text-[11px] text-gray-400 bg-white/5 p-3 rounded border border-white/5 text-left">
                  <div className="flex gap-2">
                    <Lucide.Info className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Calculations adjust dynamically for diagnostic complexity on imports and performance weight limits.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onBookClick(selectedEstimates[0])}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-tighter transition-all cursor-pointer text-center"
                >
                  Confirm & Pre-Book
                </button>
                <a
                  href={`tel:343-297-7886`}
                  className="py-3 px-4 border border-white/20 hover:bg-white/5 text-white font-black uppercase tracking-tighter text-center"
                >
                  Call Shop
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
