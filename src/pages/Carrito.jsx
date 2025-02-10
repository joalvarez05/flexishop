import React from "react";
import CarritoProductos from "@/components/carrito/CarritoProductos";
import CarritoCantidad from "@/components/carrito/CarritoCantidad";
import useCarritoStore from "@/hooks/useCarritoStore";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar.jsx";
function Carrito() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  let cantidadItems = carritoStore.length;

  return (
    <>
      <Navbar></Navbar>
      <section className="pt-3 pb-5">
        <div className="container">
          <Link to="/1" className="text-decoration-none">
            <Breadcrumb></Breadcrumb>
          </Link>
          <h2 className="text-center py-3 oswald"> Shopping Cart </h2>
          <div>
            {cantidadItems <= 0 ? (
              ""
            ) : (
              <p className="fw-medium open-sans">{`${cantidadItems} items`}</p>
            )}
          </div>
          <div className="row">
            <div className="col-12 col-md-7 col-lg-8">
              <CarritoProductos></CarritoProductos>
            </div>
            <div className="col-12 col-md-5 col-lg-4">
              <CarritoCantidad></CarritoCantidad>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
