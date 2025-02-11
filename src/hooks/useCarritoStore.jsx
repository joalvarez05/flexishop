import { create } from "zustand";
import { useEffect } from "react";

const useCarritoStore = create((set) => ({
  carritoStore: [],

  setCarritoStore: (nuevoCarrito) => {
    set({ carritoStore: nuevoCarrito });
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  },

  limpiarCarrito: () => {
    set({ carritoStore: [] });
    localStorage.removeItem("carrito");
  },
}));

export const useCarritoWatcher = () => {
  const { setCarritoStore } = useCarritoStore();

  useEffect(() => {
    const datosGuardados = localStorage.getItem("carrito");
    if (datosGuardados) {
      const carritoRecuperado = JSON.parse(datosGuardados);
      setCarritoStore(carritoRecuperado);
    }
  }, [setCarritoStore]);

  return useCarritoStore((state) => state.carritoStore);
};

export default useCarritoStore;
