import { create } from "zustand";

type State = {
  count: number;
};

interface Actions {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
}

export const useCountStore = create<State & Actions>((set) => ({
  count: parseInt(localStorage.getItem("count") || "0"),
  increment: (qty: number) =>
    set((state) => {
      const newCount = state.count + qty;
      localStorage.setItem("count", `${newCount}`);
      return { count: newCount };
    }),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));
