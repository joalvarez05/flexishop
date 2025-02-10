import React from "react";
import "./carrito.css";
import useCarritoStore from "@/hooks/useCarritoStore";
import { IoTrash } from "react-icons/io5";

function CarritoProductos() {
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const setCarritoStore = useCarritoStore((state) => state.setCarritoStore);
  console.log(carritoStore);

  const handleEliminarProducto = (prod) => {
    console.log("Producto a eliminar:", prod);
    const nuevoCarrito = carritoStore.filter((item) => item.id !== prod.id);
    setCarritoStore(nuevoCarrito);

    console.log("Carrito actualizado:", nuevoCarrito);
  };

  const handleCantidadProducto = (prod, tipo) => {
    const nuevoCarrito = carritoStore.map((item) => {
      if (item.id === prod.id) {
        const nuevaCantidad =
          tipo === "incrementar" ? item.cantidad + 1 : item.cantidad - 1;
        return {
          ...item,
          cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1,
        };
      }
      return item;
    });

    setCarritoStore(nuevoCarrito);
  };

  return (
    <div>
      {carritoStore.length > 0 ? (
        carritoStore.map((prod) => (
          <div key={prod.id} className="container card">
            <div className="mt-2 bottom-line pb-3">
              <div className="row">
                <div className="col-lg-3 d-flex justify-content-center">
                  <img
                    src={prod.imagenes}
                    alt={prod.alt}
                    className="img-carrito"
                  />
                </div>
                <div className="col-lg-9">
                  <div className="mt-3 mt-lg-0 d-flex align-items-center justify-content-between">
                    <h4>
                      {prod.marca} {prod.modelo}
                    </h4>
                    <div>
                      <div className="btn-quantity-container d-flex align-items-center justify-content-center">
                        <button
                          type="button"
                          className="btn-quantity btn btn-default"
                          onClick={() =>
                            handleCantidadProducto(prod, "decrementar")
                          }
                        >
                          -
                        </button>
                        <span className="p-quantity">{prod.cantidad || 1}</span>
                        <button
                          type="button"
                          className="btn-quantity btn btn-default"
                          onClick={() =>
                            handleCantidadProducto(prod, "incrementar")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="fw-lighter my-1">
                    {prod.detalles.descripcion}
                  </div>
                  <div className="fw-lighter my-1">
                    Color: {prod.detalles.color}
                  </div>
                  <div className="fw-lighter my-1">
                    Talle: {prod.detalles.talla}
                  </div>
                  <div className="d-flex gap-1 my-1 align-items-center justify-content-between">
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-danger titulo"
                        onClick={() => {
                          handleEliminarProducto(prod);
                        }}
                      >
                        <IoTrash />
                        Borrar item
                      </button>
                    </div>
                    <div>
                      <h5>${prod.precio * (prod.cantidad || 1)}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </div>
  );
}

export default CarritoProductos;
