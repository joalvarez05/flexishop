import { create } from "zustand";

// Función para cargar el carrito desde localStorage
const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const useCarritoStore = create((set) => ({
  carritoStore: cargarCarritoDesdeLocalStorage(), // Cargamos el carrito desde localStorage
  setCarritoStore: (actualizador) =>
    set((state) => {
      const nuevoCarrito =
        typeof actualizador === "function"
          ? actualizador(state.carritoStore)
          : actualizador;

      // Guardamos el nuevo carrito en localStorage cada vez que cambia
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

      return { carritoStore: nuevoCarrito };
    }),
}));

export default useCarritoStore;
