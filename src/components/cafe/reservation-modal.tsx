import { useState } from "react";
import { useCafe } from "./cafe-store";
import { X, Calendar, Clock, Users, User, Phone, CheckCircle2, Utensils } from "lucide-react";
import { toast } from "sonner";

export function ReservationModal() {
  const { reserveOpen, closeReserve } = useCafe();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState<{ id: string; date: string; time: string } | null>(
    null,
  );

  if (!reserveOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      toast.error("Please fill in all required reservation details.");
      return;
    }

    const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      id: resId,
      date,
      time,
    });

    toast.success("Table Reserved! 🥂", {
      description: `Reservation ${resId} confirmed for ${guests} guests.`,
    });
  };

  const handleClose = () => {
    setConfirmed(null);
    setName("");
    setPhone("");
    setGuests("2");
    setDate("");
    setTime("19:00");
    setNotes("");
    closeReserve();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#1C1815] border border-[#D9A15B]/25 text-[#F5EFE6] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D9A15B]/15 bg-[#12100E]">
          <div className="flex items-center gap-2">
            <Utensils className="size-5 text-[#D9A15B]" />
            <h3 className="font-display text-xl font-bold">
              {confirmed ? "Reservation Confirmed" : "Reserve a Table"}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1.5 text-[#A89F91] hover:bg-[#26201C] hover:text-[#F5EFE6] transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5">
            <div className="mx-auto size-16 rounded-full bg-[#D9A15B]/20 border border-[#D9A15B]/40 flex items-center justify-center text-[#D9A15B] animate-bounce">
              <CheckCircle2 className="size-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9A15B]">
                Confirmation #{confirmed.id}
              </span>
              <h4 className="mt-1 font-display text-2xl font-bold">We Can't Wait to Host You!</h4>
              <p className="mt-2 text-sm text-[#A89F91] max-w-xs mx-auto">
                A table for {guests} guests has been reserved under your name.
              </p>
            </div>

            <div className="rounded-2xl bg-[#26201C] p-4 border border-[#D9A15B]/15 flex items-center justify-around text-center">
              <div>
                <Calendar className="size-5 text-[#D9A15B] mx-auto mb-1" />
                <p className="text-xs text-[#A89F91]">Date</p>
                <p className="text-sm font-bold text-[#F5EFE6]">{confirmed.date}</p>
              </div>
              <div className="h-8 w-px bg-[#D9A15B]/15" />
              <div>
                <Clock className="size-5 text-[#D9A15B] mx-auto mb-1" />
                <p className="text-xs text-[#A89F91]">Time</p>
                <p className="text-sm font-bold text-[#F5EFE6]">{confirmed.time}</p>
              </div>
              <div className="h-8 w-px bg-[#D9A15B]/15" />
              <div>
                <Users className="size-5 text-[#D9A15B] mx-auto mb-1" />
                <p className="text-xs text-[#A89F91]">Guests</p>
                <p className="text-sm font-bold text-[#F5EFE6]">{guests} People</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-sm hover:bg-[#E5A958] transition-all hover:scale-105"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 size-4 text-[#A89F91]" />
                  <input
                    type="text"
                    required
                    placeholder="Ananya Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 size-4 text-[#A89F91]" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] text-sm focus:outline-none focus:border-[#D9A15B]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n} className="bg-[#1C1815] text-[#F5EFE6]">
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] text-sm focus:outline-none focus:border-[#D9A15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] text-sm focus:outline-none focus:border-[#D9A15B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                Special Requests / Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Window seat, anniversary, dietary notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-sm shadow-lg hover:bg-[#E5A958] transition-all hover:scale-[1.02] active:scale-95 mt-2"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
