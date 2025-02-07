import React, { useEffect, useState } from "react";
import agregarAlCarrito from "@/utils/agregarAlCarrito";
import productos from "@/data/productos.json";
import useCarritoStore from "@/hooks/useCarritoStore.js";
function Home() {
  const [ordenar, setOrdenar] = useState("Relevancia");
  const [searchValue, setSearchValue] = useState("");
  const setProductoStore = useCarritoStore((state) => state.setProductoStore);
  const productoStore = useCarritoStore((state) => state.productoStore);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setProductoStore(productos);
  });

  const handleOrdenar = (opcion) => {
    setOrdenar(opcion);
  };

  return (
    <main className="py-5">
      <section className="container pb-4">
        <div className="d-flex justify-content-between">
          <div>
            <input
              type="search"
              value={searchValue}
              placeholder="Buscar..."
              onChange={handleSearch}
              className="inp-search"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                Ordenar por
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOrdenar("Relevancia")}
                  >
                    Relevancia
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOrdenar("Mayor precio")}
                  >
                    Mayor precio
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOrdenar("Menor precio")}
                  >
                    Menor precio
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Sección de productos */}
      <section className="container" id="productos">
        <div className="row">
          {productoStore.length > 0 ? (
            productoStore.map((prod, index) => (
              <div className="col-12 col-md-4 col-lg-3 pt-3" key={index}>
                <a href="#" className="text-decoration-none">
                  <div className="card py-3 d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={prod.imagenes}
                      className="card-img-top"
                      alt={prod.nombre}
                    />
                    <div className="card-body">
                      <div className="text-center">
                        <span className="card-text py-1 oswald fs-5 fw-medium">
                          {prod.nombre}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="texto-secundario fs-5">
                          {prod.detalles.descripcion}
                        </span>
                      </div>
                      <div className="text-center py-1">
                        <span className="card-text descuento fw-medium open-sans fs-4">
                          ${prod.precio}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => agregarAlCarrito(prod)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      </section>
    </main>
  );
}
export default Home;
