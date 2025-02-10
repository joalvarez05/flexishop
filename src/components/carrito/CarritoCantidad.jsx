import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";

function CarritoCantidad() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const setCarritoStore = useCarritoStore((state) => state.setCarritoStore);
  const calcularPrecioTotal = () => {
    const total = carritoStore.reduce((total, prod) => {
      const precio = prod.precio;
      const cantidad = prod.cantidad || 1; // Si no hay cantidad, se asume 1
      if (precio && !isNaN(precio)) {
        return total + precio * cantidad;
      }
      return total;
    }, 0);

    // Formatear el total con separadores de miles y 2 decimales
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(total);
  };
  return (
    <div className="border border-danger">
      <div className="total-carrito">
        <h3>Total: {calcularPrecioTotal()}</h3>
      </div>
    </div>
  );
}

export default CarritoCantidad;
