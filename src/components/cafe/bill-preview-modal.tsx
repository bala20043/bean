import { useCafe } from "./cafe-store";
import { formatPrice } from "@/data/cafe";
import { downloadOrderBill } from "@/lib/receipt-utils";
import { X, Printer, FileText, Store } from "lucide-react";

export function BillPreviewModal() {
  const { previewOrder, closePreview } = useCafe();

  if (!previewOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closePreview}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#1C1815] border border-[#D9A15B]/30 text-[#F5EFE6] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9A15B]/15 bg-[#12100E]">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-[#D9A15B]" />
            <h3 className="font-display text-lg font-bold">Official Tax Bill</h3>
          </div>
          <button
            type="button"
            onClick={closePreview}
            className="rounded-full p-1.5 text-[#A89F91] hover:bg-[#26201C] hover:text-[#F5EFE6] transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Visual Receipt Content */}
        <div className="p-6 space-y-5">
          {/* Brand Header */}
          <div className="text-center space-y-1 pb-4 border-b border-dashed border-[#D9A15B]/20">
            <div className="inline-flex items-center gap-1.5 text-[#D9A15B]">
              <Store className="size-4" />
              <h4 className="font-display text-xl font-bold tracking-tight">BREW &amp; BEAN</h4>
            </div>
            <p className="text-[11px] text-[#A89F91] uppercase tracking-widest">
              Artisanal Coffee &amp; Bakery · Bandra West
            </p>
          </div>

          {/* Details Table */}
          <div className="space-y-1 text-xs text-[#A89F91]">
            <div className="flex justify-between">
              <span>Invoice Ref:</span>
              <strong className="text-[#F5EFE6]">{previewOrder.id}</strong>
            </div>
            <div className="flex justify-between">
              <span>Date &amp; Time:</span>
              <strong className="text-[#F5EFE6]">{previewOrder.date}</strong>
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong className="text-[#F5EFE6]">{previewOrder.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Order Preference:</span>
              <strong className="text-[#F5EFE6]">
                {previewOrder.orderType === "dine-in"
                  ? `Dine-In (${previewOrder.tableNo || "Table #04"})`
                  : "Takeaway Pickup"}
              </strong>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2 pt-2 border-t border-[#D9A15B]/15">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#D9A15B] pb-1 border-b border-[#D9A15B]/10">
              <span>Item &amp; Qty</span>
              <span>Amount</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {previewOrder.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-[#F5EFE6]">
                    <span className="text-[#D9A15B] font-bold">{i.qty}x</span> {i.name}
                  </span>
                  <span className="font-bold text-[#F5EFE6]">{formatPrice(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="space-y-1.5 pt-3 border-t border-2 border-[#D9A15B]/20 text-xs">
            <div className="flex justify-between text-[#A89F91]">
              <span>Subtotal</span>
              <span>{formatPrice(previewOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#A89F91]">
              <span>GST (5%)</span>
              <span>{formatPrice(previewOrder.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#D9A15B] pt-2 border-t border-[#D9A15B]/15">
              <span>TOTAL AMOUNT PAID</span>
              <span>{formatPrice(previewOrder.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => downloadOrderBill(previewOrder)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#D9A15B] text-[#12100E] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#E5A958] transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="size-4 stroke-[2.5]" />
              Print / Save as PDF Bill
            </button>

            <button
              type="button"
              onClick={closePreview}
              className="w-full py-2.5 text-xs text-[#A89F91] hover:text-[#F5EFE6] transition-colors text-center"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

