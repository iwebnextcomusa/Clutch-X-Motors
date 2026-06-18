import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Cpu, AlertCircle, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default welcome templates
  const initialMessages: ChatMessage[] = [
    {
      id: "w1",
      sender: "assistant",
      text: "Hello! 🏎️ I am the ClutchX Motors virtual tuning & diagnostics assistant here in Nepean, Ontario. How can I assist you with your vehicle's repairs, brakes, maintenance, or custom upgrades today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  // Auto scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Prepare message histories for the fullstack server endpoint
    const historyPayload = messages.map(m => ({
      role: m.sender,
      text: m.text
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Local fullstack server communication failed.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: "msg-" + Math.random().toString(36).substring(2, 9),
        sender: "assistant",
        text: data.reply || "I encountered a minor scanning discrepancy. Please give our specialists a call at 343-297-7886 for absolute clarity!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      
      // Intelligent mock fallback reply
      setTimeout(() => {
        let fallbackText = "I apologize, my telemetry port is currently undergoing routine maintenance. Please contact ClutchX Motors directly at 343-297-7886 or email tm7moody@gmail.com for priority assistance!";
        const lower = textToSend.toLowerCase();
        if (lower.includes("brake")) {
          fallbackText = "Brakes are critical! We offer pads, high performance slot rotors, and calibers. Call 343-297-7886 to schedule safety testing.";
        } else if (lower.includes("diagnostic") || lower.includes("light")) {
          fallbackText = "Check engine light alert? We perform full telemetry code diagnostic scans. Give our Nepean shop a ring at 343-297-7886!";
        } else if (lower.includes("oil")) {
          fallbackText = "We offer fully synthetic preventative lubrication swaps. You can request a spot via our online appointment calendar above!";
        }

        const fallbackMsg: ChatMessage = {
          id: "msg-err-" + Math.random().toString(36).substring(2, 9),
          sender: "assistant",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 700);

    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const quickSuggestions = [
    "What are your business hours?",
    "Book a brake diagnostic scan",
    "Where is ClutchX located?",
    "Do you do performance exhaust upgrades?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
        {/* 1. Expandable Floating Room Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[90vw] sm:w-[380px] h-[450px] sm:h-[500px] max-h-[calc(100vh-120px)] bg-[#121212]/95 border border-white/10 flex flex-col justify-between shadow-2xl overflow-hidden mb-6 animate-slideUp relative backdrop-blur-lg">
          
          {/* Header block styled like an automotive carbon monitor */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-black z-10" />
          <div className="bg-black/80 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left font-sans">
              <div className="w-9 h-9 bg-red-600/10 border border-red-900/35 text-red-500 flex items-center justify-center relative">
                <Cpu className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse"></span>
              </div>
              <div>
                <h4 className="font-sans font-black italic text-xs uppercase text-white tracking-widest leading-none mb-1">
                  ClutchX Telemetry Bot
                </h4>
                <p className="text-[10px] font-mono text-gray-500 uppercase">
                  Active Nepean Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 px-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-none transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Panel area */}
          <div className="flex-1 p-4 overflow-y-auto bg-transparent space-y-4 pt-4 pb-4">
            {messages.map((m) => {
              const isAssistant = m.sender === "assistant";
              return (
                <div 
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] text-left ${isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`w-7 h-7 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                    isAssistant 
                      ? "bg-black text-red-500 border border-white/10" 
                      : "bg-red-650 text-white"
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`p-3 text-xs font-sans leading-relaxed shadow-sm ${
                      isAssistant 
                        ? "bg-black/60 text-gray-300 border border-white/10 rounded-none whitespace-pre-line" 
                        : "bg-red-600 text-white rounded-none"
                    }`}>
                      {m.text}
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase px-1 text-right">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%] text-left mr-auto">
                <div className="w-7 h-7 bg-black text-red-500 border border-white/10 flex items-center justify-center text-xs flex-shrink-0">
                  <Bot className="w-4 h-4 text-red-650 animate-pulse" />
                </div>
                <div className="bg-black/60 text-gray-400 border border-white/10 p-3 rounded-none text-xs font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-650 animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-650 animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-650 animate-bounce delay-225"></span>
                  <span className="text-[10px] uppercase font-mono tracking-tight ml-1">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick choices and text input zone */}
          <div className="bg-black/85 p-3 border-t border-white/10 flex flex-col gap-2.5">
            
            {/* Quick selectors (only displayed before full thread bloat) */}
            {messages.length < 4 && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {quickSuggestions.map((sg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sg)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-none font-sans text-[10px] text-gray-400 hover:text-white transition-all cursor-pointer text-left truncate max-w-full"
                  >
                    {sg}
                  </button>
                ))}
              </div>
            )}

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about codes, brakes, pricing, coilovers..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-black/60 border border-white/10 text-white rounded-none px-3.5 py-2.5 text-xs font-sans placeholder-gray-600 outline-none focus:border-red-650"
              />
              <button
                type="submit"
                className="p-2.5 bg-red-600 hover:bg-red-700 text-white transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-red-600/10"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* 2. Primary Triggers bubble */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewBadge(false);
        }}
        className="pointer-events-auto relative w-12 h-12 rotate-45 bg-red-655 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-all border border-white/15 cursor-pointer group"
        title="ClutchX Telemetry Support AI"
      >
        <div className="-rotate-45 flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageSquare className="w-5 h-5 animate-pulse" />
          )}
        </div>

        {/* Ambient Ring Glow */}
        <div className="absolute -inset-1 border border-red-500/30 scale-105 group-hover:scale-115 transition-transform -z-10 animate-ping"></div>

        {/* Micro notifications badge */}
        {!isOpen && hasNewBadge && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full flex items-center justify-center p-0.5 shadow-md -translate-x-1/2 -translate-y-1/2">
            <span className="w-1 h-1 bg-white rounded-full animate-ping"></span>
          </span>
        )}
      </button>

    </div>
  );
}
