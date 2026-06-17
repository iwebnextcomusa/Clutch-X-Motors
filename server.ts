import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not defined. Using simulated chatbot replies.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API API Route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback simulated response if no API key is set
        setTimeout(() => {
          const lower = message.toLowerCase();
          let reply = "Hello! I am the ClutchX Motors virtual assistant. How can I help you today with your vehicle in Nepean?";
          
          if (lower.includes("brake") || lower.includes("squeak") || lower.includes("grind")) {
            reply = "Brake safety is absolutely crucial! At ClutchX Motors, we offer comprehensive brake diagnostics, performance pad & rotor upgrades, caliper replacements, and high-temp fluid flushes. Would you like to schedule a brake inspection?";
          } else if (lower.includes("diagnostic") || lower.includes("engine") || lower.includes("light") || lower.includes("code")) {
            reply = "Is your check engine light on? We perform high-tech computer diagnostics in Nepean, reading sensor codes and troubleshooting raw telemetry to discover exactly what is wrong. Let's get you booked for an engine diagnostic.";
          } else if (lower.includes("oil") || lower.includes("maintenance") || lower.includes("fluid")) {
            reply = "Regular oil changes and preventative fluid service keep your vehicle's components running at peak performance. We offer synthetic lube services, filters, and fluid flushes. Would you like to schedule an oil service?";
          } else if (lower.includes("performance") || lower.includes("upgrade") || lower.includes("exhaust")) {
            reply = "At ClutchX Motors, we are car enthusiasts first! We specialize in custom exhaust fabrication, performance bolt-on upgrades, custom coilover suspensions, custom tuning, and high-performance brake installs for enthusiasts in Nepean and Ottawa.";
          } else if (lower.includes("phone") || lower.includes("contact") || lower.includes("call") || lower.includes("number")) {
            reply = "You can call ClutchX Motors directly at 343-297-7886, email us at tm7moody@gmail.com, or fill out our instant appointment booking form right here on the website.";
          } else if (lower.includes("hours") || lower.includes("open") || lower.includes("saturday")) {
            reply = "Our business hours in Nepean are:\n\n• Monday to Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 3:00 PM\n• Sunday: Closed";
          } else if (lower.includes("where") || lower.includes("location") || lower.includes("address") || lower.includes("nepean") || lower.includes("map")) {
            reply = "ClutchX Motors is centrally located in Nepean, Ontario, proudly serving Nepean, Ottawa, and surrounding automotive communities! You can see our exact location on the interactive map on our contact section.";
          } else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
            reply = "We offer very competitive, transparent pricing with no hidden fees. To provide an accurate quote, we'd love to run a diagnostic on your car or discuss your specific upgrade. Please give us a quick call at 343-297-7886!";
          }
          
          res.json({ reply });
        }, 600);
        return;
      }

      const systemInstruction = `
You are the ClutchX Motors Virtual Assistant. ClutchX Motors is a premium automotive repair, diagnostics, and performance shop based in Nepean, Ontario, Canada.
Information:
- Phone: 343-297-7886 (click-to-call)
- Email: tm7moody@gmail.com
- Domain: clutchxmotors.ca
- Location: Nepean, ON (serving Nepean and the Ottawa region)
- Address: Merivale Road & West West Hunt Club Road sector, Nepean, ON
- Business Hours:
  * Monday - Friday: 8:00 AM - 6:00 PM
  * Saturday: 9:00 AM - 3:00 PM
  * Sunday: Closed

Services Offered:
- Engine Diagnostics & Computer Scanning (Check Engine Light coding/troubleshooting)
- Complete Brake Services (Pads, rotors, calipers, luxury & performance brake upgrades)
- Suspension & Steering (Shocks, struts, lift kits, coilovers, alignments)
- Oil Changes & Preventative Maintenance (Fully synthetic, filters, safety checks)
- Performance Upgrades (Custom cold air intakes, exhaust setups, dyno prep, sports suspension)
- Tire Services (Seasonal swaps, mounting, balancing)
- Comprehensive Pre-Purchase & Safety vehicle inspections
- Custom Automotive Services & Custom Modifications

Your Tone:
Highly professional, passionate about automotive performance, incredibly helpful, transparent, and concise. Help the user diagnose their issues based on what they describe, explain potential mechanical causes in layman's/expert terms, and guide them to schedule a book appointment or call 343-297-7886. Support the active booking flow by informing them they can fill the form above. Mention Nepean, Ontario explicitly. Keep answers well-structured with bullet points where necessary.
`;

      const contents = [
        { role: 'user', parts: [{ text: `System Instruction: ${systemInstruction}` }] }
      ];

      if (history && history.length > 0) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.text }]
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Error with server-side Gemini call:", err);
      res.status(500).json({ error: "Failed to generate AI response. Using system backup replies." });
    }
  });

  // Vite middleware for dev / static files for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
