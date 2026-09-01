import { useState } from "react";
import { useCafe } from "./cafe-store";
import { formatPrice } from "@/data/cafe";
import { downloadOrderBill, type PastOrder } from "@/lib/receipt-utils";
import { X, CheckCircle2, Clock, MapPin, Phone, User, Coffee, Download } from "lucide-react";
import { toast } from "sonner";

export function CheckoutModal() {
  const { checkoutOpen, closeCheckout, lines, total, clearCart, addOrderToHistory } = useCafe();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [tableNo, setTableNo] = useState("");
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PastOrder | null>(null);

  if (!checkoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    const orderId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotalAmount = total;
    const taxAmount = Math.round(total * 0.05);
    const grandTotal = subtotalAmount + taxAmount;

    const newOrder: PastOrder = {
      id: orderId,
      date: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      customerName: name,
      phone,
      orderType,
      tableNo: tableNo || "Table #04",
      items: lines.map((l) => ({
        name: l.item.name,
        qty: l.qty,
        price: l.item.price,
      })),
      subtotal: subtotalAmount,
      tax: taxAmount,
      total: grandTotal,
      status: "Preparing",
    };

    setLastPlacedOrder(newOrder);
    addOrderToHistory(newOrder);

    toast.success("Order Placed Successfully! ☕", {
      description: `Order ${orderId} has been sent to our barista counter.`,
    });

    clearCart();
  };

  const handleClose = () => {
    setLastPlacedOrder(null);
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
              {lastPlacedOrder ? "Order Confirmed!" : "Complete Your Order"}
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

        {lastPlacedOrder ? (
          /* Confirmation Screen with Embedded Visual Order Bill */
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto size-14 rounded-full bg-[#D9A15B]/20 border border-[#D9A15B]/40 flex items-center justify-center text-[#D9A15B] animate-bounce">
              <CheckCircle2 className="size-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9A15B]">
                Order #{lastPlacedOrder.id}
              </span>
              <h4 className="mt-1 font-display text-2xl font-bold">Your Coffee is Brewing!</h4>
            </div>

            {/* Embedded Order Tax Bill Card */}
            <div className="rounded-2xl bg-[#12100E] p-5 border border-[#D9A15B]/30 text-left space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-[#D9A15B]/15 pb-3">
                <div>
                  <h5 className="font-display text-base font-bold text-[#F5EFE6]">BREW &amp; BEAN</h5>
                  <p className="text-[10px] text-[#A89F91] uppercase tracking-wider">
                    Official Tax Invoice
                  </p>
                </div>
                <span className="text-xs font-bold text-[#D9A15B] bg-[#D9A15B]/15 px-3 py-1 rounded-full border border-[#D9A15B]/30">
                  {lastPlacedOrder.id}
                </span>
              </div>

              {/* Order & Customer Info */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#A89F91]">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider">Customer</span>
                  <strong className="text-[#F5EFE6] font-semibold">{lastPlacedOrder.customerName}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider">Phone</span>
                  <strong className="text-[#F5EFE6] font-semibold">{lastPlacedOrder.phone}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider">Order Type</span>
                  <strong className="text-[#D9A15B] font-semibold">
                    {lastPlacedOrder.orderType === "dine-in"
                      ? `Dine-In (${lastPlacedOrder.tableNo})`
                      : "Takeaway Pickup"}
                  </strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider">Time</span>
                  <strong className="text-[#F5EFE6] font-semibold">{lastPlacedOrder.date}</strong>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-1.5 pt-2 border-t border-[#D9A15B]/15">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#D9A15B] pb-1 border-b border-[#D9A15B]/10">
                  <span>Item</span>
                  <span>Amount</span>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto text-xs pr-1">
                  {lastPlacedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-[#F5EFE6]">
                        <span className="text-[#D9A15B] font-bold">{item.qty}x</span> {item.name}
                      </span>
                      <span className="font-bold text-[#F5EFE6]">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="pt-3 border-t border-2 border-[#D9A15B]/20 text-xs space-y-1">
                <div className="flex justify-between text-[#A89F91]">
                  <span>Subtotal</span>
                  <span>{formatPrice(lastPlacedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#A89F91]">
                  <span>GST (5%)</span>
                  <span>{formatPrice(lastPlacedOrder.tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#D9A15B] pt-2 border-t border-[#D9A15B]/15">
                  <span>TOTAL AMOUNT PAID</span>
                  <span>{formatPrice(lastPlacedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => downloadOrderBill(lastPlacedOrder)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
              >
                <Download className="size-4 stroke-[2.5]" />
                Download Tax Bill File
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2 text-xs text-[#A89F91] hover:text-[#F5EFE6] transition-colors text-center"
              >
                Done &amp; Return to Site
              </button>
            </div>
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
