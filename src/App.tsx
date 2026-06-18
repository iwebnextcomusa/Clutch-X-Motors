import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import BookingSection from "./components/BookingSection";
import ContactSection from "./components/ContactSection";
import AiChatbot from "./components/AiChatbot";
import ScrollToTop from "./components/ScrollToTop";
import { BUSINESS_INFO } from "./data";
import { Phone, Mail, MapPin, ShieldAlert, BadgeCheck } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);

  // Auto-spy scroll matching for navbar active indicators
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["home", "about", "services", "gallery", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleBookTrigger = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedBookingService(serviceId);
    }
    
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* 1. Global Navigation Sticky Frame */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 2. Hero Sector with interactive Three.js components */}
      <Hero onBookClick={() => handleBookTrigger()} />

      {/* 3. About Section outlining credentials, story, values */}
      <AboutSection />

      {/* 4. Complete Services Catalogue & estimator price calculator */}
      <ServicesSection onBookClick={handleBookTrigger} />

      {/* 5. Before & after interactive drag slider showcase */}
      <GallerySection />

      {/* 6. Testimonials & verified reviews slider list */}
      <TestimonialsSection />

      {/* 7. Book and Contact Portal unified block */}
      <section id="contact" className="relative bg-[#0d0d0d] py-24 border-t border-white/10 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
              RESERVAL & DIRECTIONS
            </span>
            <h2 className="font-sans font-black italic uppercase text-3xl sm:text-4xl text-white tracking-tighter mt-1 mb-4 leading-none">
              Schedule Your <span className="text-stroke-white text-red-650">Diagnostics Visit</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
              Plan your physical arrival slot or get in touch with our Nepean repair shop instantly. Secure vehicle logs and diagnostic reporting available on arrival.
            </p>
          </div>

          <div className="space-y-16">
            {/* Booking state scheduling form */}
            <BookingSection 
              preselectedServiceId={preselectedBookingService} 
              onClearPreselection={() => setPreselectedBookingService(undefined)}
            />

            {/* Direct contact, maps locator framing */}
            <ContactSection />
          </div>

        </div>
      </section>

      {/* 8. Global Floating Elements */}
      <AiChatbot />
      <ScrollToTop />

      {/* 9. Unified Footer with strictly mandated credits */}
      <footer className="bg-[#050505] border-t border-white/10 py-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[150px] h-full bg-gradient-to-l from-red-650/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Logo brand repeat */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-sm rotate-45 shadow-lg shadow-red-600/20">
              <span className="-rotate-45 font-sans font-black text-xl text-white tracking-widest leading-none">CX</span>
            </div>
            <div className="mt-2 text-center">
              <span className="font-sans font-black italic text-base tracking-tighter text-white uppercase">CLUTCH<span className="text-red-500">X</span> MOTORS</span>
              <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-0.5">Automotive Specialties • Nepean ON</p>
            </div>
          </div>

          <div className="h-[1px] bg-white/5 max-w-xl mx-auto my-6"></div>

          {/* Business links info repeats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-[11px] text-gray-400 mb-8 font-mono uppercase">
            <span>Direct: {BUSINESS_INFO.phoneFormatted}</span>
            <span className="hidden sm:inline text-red-500">•</span>
            <span>Email: {BUSINESS_INFO.email}</span>
            <span className="hidden sm:inline text-red-500">•</span>
            <span>Hunts Club & Merivale Nepean, ON</span>
          </div>

          {/* Strictly Mandated Credits */}
          <div className="text-gray-500 text-xs font-sans tracking-wide">
            <p className="mb-2">
              © {new Date().getFullYear()} ClutchX Motors. All mechanical and diagnostic rights reserved.
            </p>
            <p className="text-gray-500 font-semibold text-[11px]">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors underline decoration-dotted">iWebNext</a>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
