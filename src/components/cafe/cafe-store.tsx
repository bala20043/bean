import { createContext, useCallback, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import type { MenuItem } from "@/data/cafe";
import type { PastOrder } from "@/lib/receipt-utils";
import { toast } from "sonner";

export type OrderLine = {
  item: MenuItem;
  qty: number;
  isOffer?: boolean;
  offerTag?: string;
};

type CafeStore = {
  lines: OrderLine[];
  cartOpen: boolean;
  cartBounce: boolean;
  checkoutOpen: boolean;
  reserveOpen: boolean;
  historyOpen: boolean;
  orderHistory: PastOrder[];
  previewOrder: PastOrder | null;
  total: number;
  totalCount: number;
  addItem: (item: MenuItem, qty?: number, isOffer?: boolean, offerTag?: string) => void;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  addOrderToHistory: (order: PastOrder) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openReserve: () => void;
  closeReserve: () => void;
  openHistory: () => void;
  closeHistory: () => void;
  openPreview: (order: PastOrder) => void;
  closePreview: () => void;
};

const CafeContext = createContext<CafeStore | null>(null);

export function CafeProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [previewOrder, setPreviewOrder] = useState<PastOrder | null>(null);

  // Load Order History from LocalStorage
  const [orderHistory, setOrderHistory] = useState<PastOrder[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("brew_bean_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Order History to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("brew_bean_orders", JSON.stringify(orderHistory));
    } catch (e) {
      console.error("Failed to save orders", e);
    }
  }, [orderHistory]);

  const addOrderToHistory = useCallback((newOrder: PastOrder) => {
    setOrderHistory((prev) => [newOrder, ...prev]);
  }, []);

  const triggerCartBounce = useCallback(() => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 650);
  }, []);

  const addItem = useCallback(
    (item: MenuItem, qty = 1, isOffer = false, offerTag = "") => {
      setLines((prev) => {
        const existing = prev.find((line) => line.item.id === item.id);
        if (existing) {
          return prev.map((line) =>
            line.item.id === item.id ? { ...line, qty: line.qty + qty } : line,
          );
        }
        return [...prev, { item, qty, isOffer, offerTag }];
      });

      triggerCartBounce();

      toast.success(`Added ${item.name} to order`, {
        description: isOffer
          ? `Special Offer "${offerTag}" applied!`
          : `₹${item.price * qty} · View cart in header`,
        duration: 3000,
      });
    },
    [triggerCartBounce],
  );

  const updateQty = useCallback((id: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((line) => {
          if (line.item.id === id) {
            const newQty = line.qty + delta;
            return newQty > 0 ? { ...line, qty: newQty } : null;
          }
          return line;
        })
        .filter((line): line is OrderLine => line !== null),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.item.id !== id));
    toast.info("Item removed from cart");
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [lines],
  );

  const totalCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const value = useMemo<CafeStore>(
    () => ({
      lines,
      cartOpen,
      cartBounce,
      checkoutOpen,
      reserveOpen,
      historyOpen,
      orderHistory,
      previewOrder,
      total,
      totalCount,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      addOrderToHistory,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openCheckout: () => {
        setCartOpen(false);
        setCheckoutOpen(true);
      },
      closeCheckout: () => setCheckoutOpen(false),
      openReserve: () => setReserveOpen(true),
      closeReserve: () => setReserveOpen(false),
      openHistory: () => setHistoryOpen(true),
      closeHistory: () => setHistoryOpen(false),
      openPreview: (order: PastOrder) => setPreviewOrder(order),
      closePreview: () => setPreviewOrder(null),
    }),
    [
      lines,
      cartOpen,
      cartBounce,
      checkoutOpen,
      reserveOpen,
      historyOpen,
      orderHistory,
      previewOrder,
      total,
      totalCount,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      addOrderToHistory,
    ],
  );

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafe() {
  const ctx = useContext(CafeContext);
  if (!ctx) throw new Error("useCafe must be used within CafeProvider");
  return ctx;
}

