import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";
import { calcularPrecioTotal } from "@/utils/calcularPrecioTotal.js";
import { Link } from "react-router-dom";

function CarritoCantidad() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const total = calcularPrecioTotal(carritoStore);
  return (
    <div className="text-center w-100 border border-danger">
      <div className="container mt-3">
        <div className="mt-2 bottom-line pb-3">
          {carritoStore <= 0 ? (
            ""
          ) : (
            <h3 className="fs-5">
              Total: <span className="fw-bold fs-4">{total}</span>
            </h3>
          )}
          <Link to="/pedido">
            <button type="button" className="btn btn-primary w-100">
              Confirmar pedido
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarritoCantidad;
