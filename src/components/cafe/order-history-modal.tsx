import { useCafe } from "./cafe-store";
import { formatPrice } from "@/data/cafe";
import { downloadOrderBill } from "@/lib/receipt-utils";
import { X, History, Download, Coffee, ShoppingBag, Eye, Trash2 } from "lucide-react";

export function OrderHistoryModal() {
  const {
    historyOpen,
    closeHistory,
    orderHistory,
    openCart,
    openPreview,
    deleteOrderFromHistory,
    clearAllHistory,
  } = useCafe();

  if (!historyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeHistory}
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#1C1815] border border-[#D9A15B]/25 text-[#F5EFE6] shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D9A15B]/15 bg-[#12100E]">
          <div className="flex items-center gap-2.5">
            <History className="size-5 text-[#D9A15B]" />
            <h3 className="font-display text-xl font-bold">Your Past Orders</h3>
            <span className="rounded-full bg-[#D9A15B]/20 px-2.5 py-0.5 text-xs font-bold text-[#D9A15B]">
              {orderHistory.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {orderHistory.length > 0 && (
              <button
                type="button"
                onClick={clearAllHistory}
                className="text-xs font-semibold text-rose-400/80 hover:text-rose-400 hover:underline transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={closeHistory}
              className="rounded-full p-1.5 text-[#A89F91] hover:bg-[#26201C] hover:text-[#F5EFE6] transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderHistory.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="size-16 rounded-full bg-[#26201C] flex items-center justify-center text-[#A89F91] mx-auto">
                <Coffee className="size-8 stroke-[1.5]" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#F5EFE6]">No previous orders found</h4>
              <p className="text-xs text-[#A89F91] max-w-xs mx-auto">
                Once you order coffee or food from our menu, your detailed bills and receipts will appear here.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeHistory();
                  openCart();
                }}
                className="mt-3 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-xs uppercase tracking-wider hover:bg-[#E5A958] transition-all"
              >
                <ShoppingBag className="size-4" />
                Start an Order
              </button>
            </div>
          ) : (
            orderHistory.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-[#26201C]/80 border border-[#D9A15B]/15 p-5 space-y-3 hover:border-[#D9A15B]/35 transition-all group"
              >
                <div className="flex items-center justify-between border-b border-[#D9A15B]/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-[#D9A15B]">
                        Order #{order.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D9A15B]/15 text-[#D9A15B] px-2 py-0.5 rounded-md">
                        {order.orderType === "dine-in" ? `Dine-In (${order.tableNo})` : "Takeaway"}
                      </span>
                    </div>
                    <p className="text-xs text-[#A89F91] mt-0.5">{order.date}</p>
                  </div>

                  <button
                    type="button"
                    title="Delete this order"
                    onClick={() => deleteOrderFromHistory(order.id)}
                    className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Items Summary */}
                <div className="space-y-1.5 text-xs text-[#F5EFE6]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[#A89F91]">
                      <span>
                        {item.qty}x <strong className="text-[#F5EFE6]">{item.name}</strong>
                      </span>
                      <span className="font-semibold text-[#F5EFE6]">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-[#D9A15B]/10">
                  <div>
                    <span className="text-xs text-[#A89F91]">Total Amount Paid</span>
                    <p className="font-display text-lg font-bold text-[#D9A15B]">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openPreview(order)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#26201C] border border-[#D9A15B]/20 text-[#F5EFE6] text-xs font-bold hover:bg-[#D9A15B]/20 hover:text-[#D9A15B] transition-all"
                    >
                      <Eye className="size-3.5 text-[#D9A15B]" />
                      View Bill Slide
                    </button>

                    <button
                      type="button"
                      onClick={() => downloadOrderBill(order)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D9A15B] text-[#12100E] text-xs font-bold hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
                    >
                      <Download className="size-3.5" />
                      Download File
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


