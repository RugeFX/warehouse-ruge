import type { StateCreator } from "zustand";

export interface CountSlice {
  count: number;
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
}

export const createCountSlice: StateCreator<CountSlice> = (set) => ({
  count: parseInt(localStorage.getItem("count") || "0"),
  increment: (qty: number) =>
    set((state) => {
      const newCount = state.count + qty;
      localStorage.setItem("count", `${newCount}`);
      return { count: newCount };
    }),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
});
