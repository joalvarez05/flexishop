import { create } from "zustand";

const useCarritoStore = create((set) => ({
  carritoStore: [],
  setCarritoStore: (actualizador) =>
    set((state) => ({
      carritoStore:
        typeof actualizador === "function"
          ? actualizador(state.carritoStore)
          : actualizador,
    })),
}));

export default useCarritoStore;
