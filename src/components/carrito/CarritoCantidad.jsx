import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calcularPrecioTotal.js";

function CarritoCantidad() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  return (
    <div>
      <div className="total-carrito">
        {carritoStore <= 0 ? (
          ""
        ) : (
          <h3>Total: {calcularPrecioTotal(carritoStore)}</h3>
        )}
      </div>
    </div>
  );
}

export default CarritoCantidad;
