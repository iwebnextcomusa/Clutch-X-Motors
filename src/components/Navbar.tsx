import React, { useState, useEffect } from "react";
import { Phone, Menu, X, ShieldAlert, Cpu } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Showcase" },
    { id: "testimonials", label: "Reviews" },
    { id: "contact", label: "Contact & Book" }
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-black/85 backdrop-blur-md border-b border-white/10 shadow-xl py-3" 
        : "bg-black/40 backdrop-blur-sm border-b border-white/5 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Immersive UI Brand Logo */}
          <div 
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-sm rotate-45 group-hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
              <span className="-rotate-45 font-black text-xl tracking-tighter text-white">CX</span>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase ml-2 italic text-white leading-none">
              Clutch<span className="text-red-600">X</span> Motors
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-sans text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-red-500 border-b-2 border-red-600 pb-0.5" 
                      : "text-gray-400 hover:text-white pb-0.5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call to action & booking trigger */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-transparent text-gray-300 border border-white/15 hover:bg-white/5 transition-colors font-mono text-xs font-bold tracking-tight"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>
            
            <button
              onClick={() => handleNavClick("contact")}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 text-xs font-black uppercase tracking-tighter transition-all text-white cursor-pointer"
            >
              Book Service
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="sm:hidden p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-red-500"
              title="Call ClutchX Motors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 shadow-2xl py-5 px-4 flex flex-col gap-3 animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive 
                      ? "bg-red-600/10 text-red-500 border-l-4 border-red-600" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="h-[1px] bg-zinc-800 my-2"></div>

          <div className="flex flex-col gap-3.5 px-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Nepean Specialist Hotline</span>
              <span className="text-emerald-500 font-bold">● ONLINE NOW</span>
            </div>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-3.5 w-full py-3.5 bg-zinc-900 text-white border border-zinc-750 hover:bg-zinc-800 rounded-xl transition-all font-mono text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call: {BUSINESS_INFO.phoneFormatted}</span>
            </a>

            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-red-600/10 cursor-pointer"
            >
              Book Instant Service
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
