import React, { useEffect, useState } from "react";
import agregarAlCarrito from "@/utils/agregarAlCarrito";
import productos from "@/data/productos.json";
import useProductoStore from "@/hooks/useProductoStore.js";
import useCarritoStore from "@/hooks/useCarritoStore.jsx";
import { Toaster } from "react-hot-toast";
import { BsArrowUp } from "react-icons/bs";

function Home() {
  const [ordenar, setOrdenar] = useState("Filtrar");
  const [searchValue, setSearchValue] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const productoStore = useProductoStore((state) => state.productoStore);
  const setProductoStore = useProductoStore((state) => state.setProductoStore);
  const carritoStore = useCarritoStore((state) => state.carritoStore);
  const setCarritoStore = useCarritoStore((state) => state.setCarritoStore);

  useEffect(() => {
    setProductoStore(productos);
  }, [setProductoStore]);

  useEffect(() => {
    const filtrados = productoStore.filter((prod) =>
      prod.marca.toLowerCase().includes(searchValue.toLowerCase())
    );

    const ordenados = [...filtrados].sort((a, b) => {
      if (ordenar === "Mayor precio") return b.precio - a.precio;
      if (ordenar === "Menor precio") return a.precio - b.precio;
      return 0;
    });

    setProductosFiltrados(ordenados);
  }, [searchValue, productoStore, ordenar]);

  return (
    <main className="pt-3 pb-5">
      <a href="#top" className="go-top d-flex">
        <BsArrowUp />
      </a>
      <Toaster position="top-center" reverseOrder={true} />

      <section className="container pb-2 d-flex sm-bottom">
        <div className="text-center w-100">
          <input
            id="search"
            type="search"
            value={searchValue}
            placeholder="Buscar por marca..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="inp-search"
          />
        </div>
        <div className="d-flex justify-content-end sm">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-dark dropdown-toggle open-sans fw-medium"
              aria-expanded="false"
              data-bs-toggle="dropdown"
            >
              {ordenar}
            </button>
            <ul className="dropdown-menu oswald">
              {["Relevancia", "Mayor precio", "Menor precio"].map((opcion) => (
                <li key={opcion}>
                  <button
                    className="dropdown-item"
                    onClick={() => setOrdenar(opcion)}
                  >
                    {opcion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container" id="productos">
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod, index) => (
              <div className="col-6 col-md-4 col-lg-3 pt-3" key={prod.id}>
                <a href="#" className="text-decoration-none">
                  <div className="card h-100 py-3 d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={prod.imagenes}
                      className="card-img-top"
                      alt={prod.alt}
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchpriority={index < 3 ? "high" : "auto"}
                    />
                    <div className="card-body text-center">
                      <span className="card-text py-1 oswald fs-5 fw-medium">
                        {prod.marca}
                      </span>
                      <span className="texto-secundario fs-5 open-sans fw-medium">
                        {prod.detalles.descripcion}
                      </span>
                      <span className="card-text descuento fw-medium open-sans fs-4">
                        ${prod.precio}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-dark padding-sm-sm oswald espaciado"
                        onClick={() => agregarAlCarrito(prod, setCarritoStore)}
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
