import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 hover:border-red-605 text-zinc-350 hover:text-white rounded-xl shadow-2xl transition-all hover:translate-y-[-3px] active:translate-y-0 cursor-pointer group"
      title="Scroll back to top"
    >
      <ArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
    </button>
  );
}
