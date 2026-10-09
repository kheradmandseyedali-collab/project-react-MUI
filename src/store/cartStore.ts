import { create } from "zustand";
import type { CartItem, Product } from "@/types";
interface CartState {
  items: CartItem[];
  add: (p: Product) => void;
  update: (id: number, n: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}
const read = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem("nova-cart") || "[]");
  } catch {
    return [];
  }
};
const save = (items: CartItem[]) => {
  localStorage.setItem("nova-cart", JSON.stringify(items));
  return items;
};
export const useCartStore = create<CartState>((set) => ({
  items: read(),
  add: (product) =>
    set((s) => ({
      items: save(
        s.items.some((i) => i.product.id === product.id)
          ? s.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            )
          : [...s.items, { product, quantity: 1 }],
      ),
    })),
  update: (id, n) =>
    set((s) => ({
      items: save(
        s.items.map((i) =>
          i.product.id === id ? { ...i, quantity: Math.max(1, n) } : i,
        ),
      ),
    })),
  remove: (id) =>
    set((s) => ({ items: save(s.items.filter((i) => i.product.id !== id)) })),
  clear: () => set({ items: save([]) }),
}));
