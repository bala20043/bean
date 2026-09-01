import { useState } from "react";
import { useCafe } from "./cafe-store";
import { formatPrice } from "@/data/cafe";
import { X, CheckCircle2, Clock, MapPin, Phone, User, Coffee } from "lucide-react";
import { toast } from "sonner";

export function CheckoutModal() {
  const { checkoutOpen, closeCheckout, lines, total, clearCart } = useCafe();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [tableNo, setTableNo] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<{ id: string; time: string } | null>(null);

  if (!checkoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    const orderId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedOrder({
      id: orderId,
      time: "12–15 mins",
    });

    toast.success("Order Placed Successfully! ☕", {
      description: `Order ${orderId} has been sent to our barista counter.`,
    });

    clearCart();
  };

  const handleClose = () => {
    setSubmittedOrder(null);
    setName("");
    setPhone("");
    setTableNo("");
    closeCheckout();
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
            <Coffee className="size-5 text-[#D9A15B]" />
            <h3 className="font-display text-xl font-bold">
              {submittedOrder ? "Order Confirmed!" : "Complete Your Order"}
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

        {submittedOrder ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="mx-auto size-16 rounded-full bg-[#D9A15B]/20 border border-[#D9A15B]/40 flex items-center justify-center text-[#D9A15B] animate-bounce">
              <CheckCircle2 className="size-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9A15B]">
                Order #{submittedOrder.id}
              </span>
              <h4 className="mt-1 font-display text-2xl font-bold">Your Coffee is Brewing!</h4>
              <p className="mt-2 text-sm text-[#A89F91] max-w-xs mx-auto">
                We've received your order and our baristas are crafting your drinks with love.
              </p>
            </div>

            <div className="rounded-2xl bg-[#26201C] p-4 border border-[#D9A15B]/15 flex items-center justify-around text-center">
              <div>
                <Clock className="size-5 text-[#D9A15B] mx-auto mb-1" />
                <p className="text-xs text-[#A89F91]">Est. Preparation</p>
                <p className="text-sm font-bold text-[#F5EFE6]">{submittedOrder.time}</p>
              </div>
              <div className="h-8 w-px bg-[#D9A15B]/15" />
              <div>
                <MapPin className="size-5 text-[#D9A15B] mx-auto mb-1" />
                <p className="text-xs text-[#A89F91]">Location</p>
                <p className="text-sm font-bold text-[#F5EFE6]">Brew & Bean, Bandra</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-sm hover:bg-[#E5A958] transition-all hover:scale-105"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Order Summary Pill */}
            <div className="rounded-2xl bg-[#26201C] p-4 border border-[#D9A15B]/15 space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#D9A15B]">
                <span>Items Summary ({lines.length})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1 text-xs text-[#A89F91]">
                {lines.map(({ item, qty }) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {qty}x {item.name}
                    </span>
                    <span>{formatPrice(item.price * qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("dine-in")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    orderType === "dine-in"
                      ? "border-[#D9A15B] bg-[#D9A15B]/15 text-[#D9A15B]"
                      : "border-[#D9A15B]/15 bg-[#26201C] text-[#A89F91] hover:bg-[#26201C]/80"
                  }`}
                >
                  Dine-In (At Café)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    orderType === "takeaway"
                      ? "border-[#D9A15B] bg-[#D9A15B]/15 text-[#D9A15B]"
                      : "border-[#D9A15B]/15 bg-[#26201C] text-[#A89F91] hover:bg-[#26201C]/80"
                  }`}
                >
                  Takeaway / Pickup
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 size-4 text-[#A89F91]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
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
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
                  />
                </div>
              </div>

              {orderType === "dine-in" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-1.5">
                    Table Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table #04"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] placeholder-[#A89F91]/50 text-sm focus:outline-none focus:border-[#D9A15B]"
                  />
                </div>
              )}
            </div>

            {/* Total and Place Order */}
            <div className="pt-3 border-t border-[#D9A15B]/15">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-sm shadow-lg hover:bg-[#E5A958] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Place Order · {formatPrice(total)}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
