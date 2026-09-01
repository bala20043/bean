import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/cafe";

export type OrderLine = { item: MenuItem; qty: number };

type CafeStore = {
  orderOpen: boolean;
  reserveOpen: boolean;
  selected: MenuItem | null;
  lines: OrderLine[];
  total: number;
  openOrder: (item?: MenuItem | null) => void;
  closeOrder: () => void;
  openReserve: () => void;
  closeReserve: () => void;
  setSelected: (item: MenuItem | null) => void;
  addLine: (item: MenuItem, qty: number) => void;
  removeLine: (id: string) => void;
  clearOrder: () => void;
};

const CafeContext = createContext<CafeStore | null>(null);

export function CafeProvider({ children }: { children: ReactNode }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [lines, setLines] = useState<OrderLine[]>([]);

  const openOrder = useCallback((item?: MenuItem | null) => {
    if (item) setSelected(item);
    setOrderOpen(true);
  }, []);

  const addLine = useCallback((item: MenuItem, qty: number) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [...prev, { item, qty }];
    });
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.item.id !== id));
  }, []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [lines],
  );

  const value = useMemo<CafeStore>(
    () => ({
      orderOpen,
      reserveOpen,
      selected,
      lines,
      total,
      openOrder,
      closeOrder: () => setOrderOpen(false),
      openReserve: () => setReserveOpen(true),
      closeReserve: () => setReserveOpen(false),
      setSelected,
      addLine,
      removeLine,
      clearOrder: () => setLines([]),
    }),
    [orderOpen, reserveOpen, selected, lines, total, openOrder, addLine, removeLine],
  );

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafe() {
  const ctx = useContext(CafeContext);
  if (!ctx) throw new Error("useCafe must be used within CafeProvider");
  return ctx;
}
