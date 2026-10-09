import { create } from "zustand";
import type { Toast } from "@/types";
interface UIState {
  toasts: Toast[];
  notify: (message: string, type?: Toast["type"]) => void;
  dismiss: (id: number) => void;
}
export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  notify: (message, type = "success") => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      3200,
    );
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
