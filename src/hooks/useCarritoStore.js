import { create } from "zustand";

const useCarritoStore = create((set) => ({
  productoStore: [],
  setProductoStore: (productos) => set({ productoStore: productos }),
}));

export default useCarritoStore;
