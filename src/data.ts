import { Service, BeforeAfterPhoto, Testimonial } from "./types";

export const BUSINESS_INFO = {
  name: "ClutchX Motors",
  location: "Nepean, Ontario",
  address: "1800 Merivale Road, Nepean, ON K2G 1E6",
  phone: "343-297-7886",
  phoneFormatted: "+1 (343) 297-7886",
  email: "tm7moody@gmail.com",
  domain: "clutchxmotors.ca",
  hours: [
    { days: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { days: "Saturday", time: "9:00 AM - 3:00 PM" },
    { days: "Sunday", time: "Closed" }
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  }
};

export const SERVICES: Service[] = [
  {
    id: "engine-diagnostics",
    title: "Engine Diagnostics & Telemetry Scanning",
    shortDesc: "Complete digital diagnostic system scanning using cutting-edge OEM software.",
    longDesc: "When a warning light comes on, it takes state-of-the-art technology to interpret the engine fault codes correctly. Our Nepean diagnostic lab checks electrical telemetry, sensor outputs, timing alignment, and firing metrics to uncover performance discrepancies instantly before they cause catastrophic repair needs.",
    iconName: "Cpu",
    category: "diagnostics",
    estimatedTime: "45 - 90 mins",
    priceEstimate: "Starts at $89"
  },
  {
    id: "performance-brakes",
    title: "Brake & Brake Upgrade Services",
    shortDesc: "Premium metallic/ceramic pad upgrades and direct performance heavy-duty rotors.",
    longDesc: "Brake reliability is non-negotiable. Whether you need quiet ceramic pads for daily commuting in Ottawa, or drilled & slotted racing rotors with multi-piston calipers for high-performance deceleration, our mechanics install premium braking components built to exceed factory tolerances.",
    iconName: "Disc",
    category: "repairs",
    estimatedTime: "1 - 2 hours",
    priceEstimate: "Starts at $149"
  },
  {
    id: "performance-upgrades",
    title: "Performance Exhausts & Power Packages",
    shortDesc: "Custom bolt-on kits, cold air intakes, custom exhausts, and suspension adjustments.",
    longDesc: "Unleash your vehicle's full potential. At ClutchX Motors, we specialize in direct muscle & import upgrades: complete high-flow catback exhaust installations, induction cold air intakes, sports intercoolers, turbocharger upgrades, and custom dyno-ready setups.",
    iconName: "Zap",
    category: "performance",
    estimatedTime: "Varies by project",
    priceEstimate: "Custom Quote"
  },
  {
    id: "oil-changes",
    title: "Preventative Maintenance & Lube",
    shortDesc: "Premium fully synthetic oil changes, oil filtration, and multi-point vehicle checks.",
    longDesc: "The ultimate engine life extension. We use strictly top-shelf fully synthetic lubricants matching your specific vehicle certification, along with clean OEM filters, coolant testing, and a comprehensive 40-point safety check of critical components.",
    iconName: "Droplet",
    category: "maintenance",
    estimatedTime: "30 - 45 mins",
    priceEstimate: "Starts at $69"
  },
  {
    id: "suspension-steering",
    title: "Suspension & Performance Coilovers",
    shortDesc: "Custom height coilovers, control arms, sway bars, and ride comfort rebuilds.",
    longDesc: "Command the road. We construct track-ready response rates or comfortable daily ride structures. From replacing leak-prone factory shocks and worn control arm bushings to fine-tuning track suspension with fully adjustable coilovers, we handle any ride setup.",
    iconName: "ShieldAlert",
    category: "performance",
    estimatedTime: "2 - 5 hours",
    priceEstimate: "Starts at $199"
  },
  {
    id: "tire-wheel",
    title: "Tire Swaps & High-Speed Balancing",
    shortDesc: "Seasonal changeovers, performance tire mounting, and laser balancing.",
    longDesc: "Ensure secure road contact in every Ontario season. We perform flawless wheel swaps, mount ultra-high performance summer compounds, fit heavy-duty studded Ottawa winter sets, and execute weight-balanced laser tuning to eliminate steering oscillations.",
    iconName: "RotateCw",
    category: "maintenance",
    estimatedTime: "45 - 60 mins",
    priceEstimate: "Starts at $49"
  },
  {
    id: "inspections",
    title: "Comprehensive Safety Inspections",
    shortDesc: "Pre-purchase inspections and roadworthy certifications for Ontario registration.",
    longDesc: "Buying a used sports car or preparing for an Ontario registration transfer? Drive with confidence. Our master mechanics analyze frame status, powertrain compression, braking thickness, suspension play, and core diagnostics with detailed visual data reports.",
    iconName: "Eye",
    category: "diagnostics",
    estimatedTime: "1 - 2 hours",
    priceEstimate: "Starts at $119"
  },
  {
    id: "custom-modifications",
    title: "Custom Automotive Engineering",
    shortDesc: "Bespoke track preparation, structural cooling, and premium styling installs.",
    longDesc: "You dream it, we engineer it. From aerodynamic spoiler kits, cooling configurations, custom engine bay dress-ups, heavy-duty clutches, to auxiliary telemetry gauge pods, ClutchX Motors provides highly personalized build consultations.",
    iconName: "Wrench",
    category: "performance",
    estimatedTime: "Custom projects",
    priceEstimate: "Inquire"
  }
];

export const BEFORE_AFTER_PHOTOS: BeforeAfterPhoto[] = [
  {
    id: "p1",
    title: "Carbon Fiber Brake System Upgrade",
    description: "Replaced heavy, faded stock rotors with drilled high-carbon performance discs and carbon-ceramic pads for a customer in Nepean.",
    beforeUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=700&auto=format&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "Performance Catback Exhaust Upgrade",
    description: "Replaced restrictive factory single-muffler unit with custom T-304 stainless steel dual-valved performance system for optimized flow and raw throttle acoustic response.",
    beforeUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=700&auto=format&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: "p3",
    title: "Fully Adjustable Motorsport Coilover Kit",
    description: "Upgraded sagging stock suspension setup to premium coilover system. Reduced wheel gap, tuned damper dampening, and lowered center of gravity.",
    beforeUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=700&auto=format&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1610835063904-41160d3d4112?q=80&w=700&auto=format&fit=crop"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Alex MacLean",
    location: "Nepean, ON",
    rating: 5,
    date: "2026-04-12",
    comment: "ClutchX Motors changed how my Golf R drives! The suspension overhaul and check engine light diagnosis was super transparent. Other shops in Ottawa quoted me double for parts the car did not even need. This is my go-to mechanic team.",
    vehicle: "2019 Volkswagen Golf R",
    verified: true
  },
  {
    id: "t2",
    name: "David S.",
    location: "Ottawa, ON",
    rating: 5,
    date: "2026-05-30",
    comment: "Excellent service! Broke down nearby on Merivale and got towed here. They diagnosed a failed ignition module, showed me exact sensor data logs, and had me back on the road in 2 hours. Very professional and pricing is fair and upfront.",
    vehicle: "2018 Ford Mustang GT",
    verified: true
  },
  {
    id: "t3",
    name: "Melissa Vance",
    location: "Barrhaven, ON",
    rating: 5,
    date: "2026-06-02",
    comment: "I book ClutchX for state safety checks and seasonal tire mounts. They are super prompt, has neat waiting area, and the mechanic actually answered all my custom engine maintenance inquiries in detail. Highly recommended!",
    vehicle: "2021 Toyota RAV4",
    verified: true
  }
];
