import React, { useState, useEffect } from "react";
import { Calendar, Clock, Car, Check, Trash2, ArrowUpRight, ShieldCheck, Mail, Phone, User } from "lucide-react";
import { ServiceBooking } from "../types";
import { SERVICES, BUSINESS_INFO } from "../data";

interface BookingSectionProps {
  preselectedServiceId?: string;
  onClearPreselection?: () => void;
}

export default function BookingSection({ preselectedServiceId, onClearPreselection }: BookingSectionProps) {
  // Booking Form State
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");

  // Validation & Submission States
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [activeBookings, setActiveBookings] = useState<ServiceBooking[]>([]);

  // Initialize service selections
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Load existing bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("clutchx_bookings");
      if (stored) {
        setActiveBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not retrieve stored bookings from local storage:", e);
    }
  }, []);

  // Save changes to active bookings
  const saveBookingsToStorage = (updated: ServiceBooking[]) => {
    try {
      localStorage.setItem("clutchx_bookings", JSON.stringify(updated));
      setActiveBookings(updated);
    } catch (e) {
      console.warn("Could not save bookings to local storage:", e);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Form Validations
    if (!customerName.trim()) return setValidationError("Customer name is required.");
    if (!email.trim() || !email.includes("@")) return setValidationError("Please provide a valid email address.");
    if (!phone.trim() || phone.replace(/[^0-9]/g, "").length < 7) {
      return setValidationError("Please provide a valid contact phone number.");
    }
    if (!vehicleYear.trim() || isNaN(Number(vehicleYear)) || Number(vehicleYear) < 1920 || Number(vehicleYear) > 2030) {
      return setValidationError("Please enter a valid vehicle year (e.g. 2021).");
    }
    if (!vehicleMake.trim()) return setValidationError("Vehicle make is required (e.g. Nissan).");
    if (!vehicleModel.trim()) return setValidationError("Vehicle model is required (e.g. 370z).");
    if (!serviceId) return setValidationError("Please select an automotive service category.");
    if (!bookingDate) return setValidationError("Please pick a desired appointment date.");
    if (!bookingTime) return setValidationError("Please select an arrival time slot.");

    setSubmitting(true);

    // Simulate backend booking pipeline dispatching after a slight delay
    setTimeout(() => {
      const newBooking: ServiceBooking = {
        id: "BK-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        customerName,
        email,
        phone,
        vehicleYear,
        vehicleMake,
        vehicleModel,
        serviceId,
        bookingDate,
        bookingTime,
        notes,
        status: "Pending",
        createdAt: new Date().toISOString()
      };

      const updatedList = [newBooking, ...activeBookings];
      saveBookingsToStorage(updatedList);

      setSubmitting(false);
      setSubmittedSuccessfully(true);

      // Clear Form state inputs
      setCustomerName("");
      setEmail("");
      setPhone("");
      setVehicleYear("");
      setVehicleMake("");
      setVehicleModel("");
      setNotes("");
      if (onClearPreselection) onClearPreselection();

      // Autohide confirmation state after 6 seconds
      setTimeout(() => {
        setSubmittedSuccessfully(false);
      }, 7000);
    }, 1200);
  };

  const cancelBooking = (id: string) => {
    const updated = activeBookings.filter(b => b.id !== id);
    saveBookingsToStorage(updated);
  };

  const getServiceLabel = (id: string) => {
    return SERVICES.find(s => s.id === id)?.title || "General Mechanical Diagnostics";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUMN 1: Submitting Booking Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
              RESERVAL PORTAL
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-2">
              Book Your Service Appointment
            </h3>
            <p className="text-zinc-400 font-sans text-xs sm:text-sm">
              Schedule premium auto maintenance or diagnostics in Nepean, ON. Fill out your vehicle specs and mechanical concerns below for direct priority intake booking.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5">
            
            {/* Row 1: Contact Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    required
                    placeholder="Joe Driver"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-xl text-xs font-sans placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    required
                    placeholder="driver@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-xl text-xs font-sans placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Phone Mobile *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="tel"
                    required
                    placeholder="343-297-7886"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-xl text-xs font-sans placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Vehicle Telemetry Specs */}
            <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex flex-col gap-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-zinc-650" />
                <span>VEHICLE IDENTIFICATION DATA</span>
              </span>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-zinc-500 font-sans uppercase">Aero Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2018"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-lg text-xs font-sans placeholder-zinc-700 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-zinc-500 font-sans uppercase">Vehicle Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Audi"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-lg text-xs font-sans placeholder-zinc-700 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-zinc-500 font-sans uppercase">Model Subtype *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S4 Quattro"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-lg text-xs font-sans placeholder-zinc-700 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Service type selecting */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Select Service *</label>
                <select
                  required
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3 py-3.5 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-300 rounded-xl text-xs font-sans outline-none"
                >
                  <option value="" disabled>-- Pick Category --</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                  <option value="custom">Other Custom Modifications</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Desired Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-300 rounded-xl text-xs font-sans outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Time Window *</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-650 pointer-events-none" />
                  <select
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-3.5 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-300 rounded-xl text-xs font-sans outline-none"
                  >
                    <option value="">-- Arrival Hour --</option>
                    <option value="08:00 AM">08:00 AM (Early Drop-off)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM (Lunch Intake)</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM (Late Check)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Brief symptoms or upgrade details (Optional)</label>
              <textarea
                placeholder="e.g. Squeaky brakes high metal grind over 50km/h, or custom catback exhaust parts are currently ready for bolt-on installation..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-red-600 text-zinc-100 rounded-xl text-xs font-sans placeholder-zinc-700 outline-none transition-colors resize-none"
              />
            </div>

            {/* Status alerts */}
            {validationError && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-500 text-xs font-semibold rounded-xl font-sans">
                {validationError}
              </div>
            )}

            {submittedSuccessfully && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 text-xs rounded-xl font-sans flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-emerald-300 uppercase mb-0.5">Booking Registered Successfully!</h5>
                  <p>Estimated confirmation has been registered locally and logged under active listings on this dashboard. No payment needed online.</p>
                </div>
              </div>
            )}

            {/* Submission CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-red-600 hover:bg-red-700 hover:translate-y-[-1px] active:translate-y-0 text-white rounded-xl text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-600/10 disabled:opacity-50"
            >
              {submitting ? "Intaking Secure Reservation..." : "Submit Appointment Request"}
            </button>

          </form>
        </div>

        {/* COLUMN 2: session active listings */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-red-600/5 rounded-full blur-xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-4 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold">
                Local Telemetry Database
              </span>
            </div>

            <h4 className="font-sans font-extrabold text-white text-base tracking-wider uppercase mb-1">
              Active Booking Entries
            </h4>
            <p className="text-[11px] font-sans text-zinc-500 mb-6">
              Listing of your pending scheduled appointments preserved in local state storage. Give us a call or visit to sync.
            </p>

            {activeBookings.length === 0 ? (
              <div className="border border-dashed border-zinc-800 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-650 border border-zinc-850">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-zinc-400 text-xs font-bold uppercase leading-none mb-1">No Active Bookings</h5>
                  <p className="text-zinc-600 font-sans text-[10px]">Your pending mechanical reservations will list right here.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {activeBookings.map((b) => (
                  <div 
                    key={b.id}
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-start justify-between gap-4 transition-colors hover:border-zinc-700/80"
                  >
                    <div className="text-left flex flex-col gap-1.5">
                      <div className="flex gap-2 items-center">
                        <span className="font-mono text-[9px] bg-red-600/10 text-red-500 border border-red-900/30 px-1.5 py-0.5 rounded font-bold">
                          {b.id}
                        </span>
                        <span className="font-mono text-[9px] bg-zinc-950 text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded font-semibold uppercase">
                          {b.status}
                        </span>
                      </div>

                      <h5 className="font-sans text-xs font-extrabold text-white leading-tight uppercase mt-1">
                        {b.vehicleYear} {b.vehicleMake} {b.vehicleModel}
                      </h5>

                      <p className="text-[11px] font-sans text-zinc-400 font-semibold">
                        {getServiceLabel(b.serviceId)}
                      </p>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-zinc-500 mt-1">
                        <span>Date: <span className="text-zinc-300 font-medium">{b.bookingDate}</span></span>
                        <span>Time: <span className="text-zinc-300 font-medium">{b.bookingTime}</span></span>
                      </div>
                    </div>

                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="p-1 px-1.5 text-zinc-650 hover:text-red-500 hover:bg-red-950/20 rounded transition-all cursor-pointer border border-transparent hover:border-red-900/30"
                      title="Delete local entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-zinc-850 pt-5 text-left flex flex-col gap-2.5">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-none">
              Shop Telemetry Support
            </span>
            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Diagnostic check completes during intake drop-off</span>
            </div>
            <p className="text-[10px] font-sans text-zinc-500">
              * Rates represent raw entry-level calculations. Exhaust system, tuning, and coilovers require active parts discussion beforehand.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
