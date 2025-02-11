import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calcularPrecioTotal.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CarritoCantidad() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const total = calcularPrecioTotal(carritoStore);

  const handleRedirection = (e) => {
    if (carritoStore.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className="text-center w-100 ">
      <div className="container mt-3">
        <div className="mt-2 bottom-line pb-3">
          {carritoStore.length > 0 ? (
            <h3 className="fs-5">
              Total: <span className="fw-bold fs-4">{total}</span>
            </h3>
          ) : (
            ""
          )}

          <Link to="/pedido" onClick={handleRedirection}>
            <button
              type="button"
              className="btn btn-primary w-100"
              disabled={carritoStore.length === 0}
            >
              Confirmar pedido
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarritoCantidad;
