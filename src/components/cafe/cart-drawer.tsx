import { useCafe } from "./cafe-store";
import { formatPrice } from "@/data/cafe";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const { cartOpen, closeCart, lines, updateQty, removeItem, total, totalCount, openCheckout } =
    useCafe();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#1C1815] border-l border-[#D9A15B]/20 text-[#F5EFE6] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#D9A15B]/15 bg-[#12100E]/80">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="size-5 text-[#D9A15B]" />
              <h2 className="font-display text-xl font-bold tracking-tight">Your Coffee Order</h2>
              <span className="rounded-full bg-[#D9A15B]/20 px-2.5 py-0.5 text-xs font-bold text-[#D9A15B]">
                {totalCount}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full p-1.5 text-[#A89F91] hover:bg-[#26201C] hover:text-[#F5EFE6] transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {lines.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="size-16 rounded-full bg-[#26201C] flex items-center justify-center text-[#A89F91] mb-4">
                  <ShoppingBag className="size-8 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#F5EFE6]">Your order is empty</h3>
                <p className="mt-1 text-sm text-[#A89F91] max-w-xs">
                  Explore our signature coffee & delicious treats to add them to your cart.
                </p>
              </div>
            ) : (
              lines.map(({ item, qty, isOffer, offerTag }) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#26201C]/60 border border-[#D9A15B]/10 hover:border-[#D9A15B]/25 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-bold text-[#F5EFE6] truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#A89F91] hover:text-[#E55B5B] transition-colors p-0.5"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      {isOffer && (
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-[#D9A15B] uppercase tracking-wider bg-[#D9A15B]/15 px-2 py-0.5 rounded-md">
                          {offerTag || "Offer Applied"}
                        </span>
                      )}
                      <p className="mt-1 text-xs font-semibold text-[#D9A15B]">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D9A15B]/10">
                      <div className="flex items-center gap-2 border border-[#D9A15B]/20 rounded-lg bg-[#12100E] px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 text-[#A89F91] hover:text-[#F5EFE6] transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold text-[#F5EFE6] min-w-4 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 text-[#A89F91] hover:text-[#F5EFE6] transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-[#F5EFE6]">
                        {formatPrice(item.price * qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {lines.length > 0 && (
            <div className="p-6 border-t border-[#D9A15B]/15 bg-[#12100E]/90 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#A89F91]">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-[#A89F91]">
                  <span>Taxes & Service</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#F5EFE6] pt-2 border-t border-[#D9A15B]/10">
                  <span>Total Amount</span>
                  <span className="text-[#D9A15B]">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={openCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-sm shadow-lg hover:bg-[#E5A958] transition-all hover:scale-[1.02] active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
