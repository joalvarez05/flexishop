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

      <section className="container mt-4" id="productos">
        <div className="row container-mid ">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod, index) => (
              <div
                className="row tarjeta pb-2 rounded-3 pt-lg-3 col-md-6 col-lg-4 me-lg-2 me-sm-0"
                key={prod.id}
              >
                <div className="col-4 p-0 col-md-4 col-lg-4 pt-3 m-0">
                  {/* <a href="#" className="text-decoration-none"> */}
                  <img
                    src={prod.imagenes}
                    className="card-img-top"
                    alt={prod.alt}
                    loading={index < 3 ? "eager" : "lazy"}
                    fetchpriority={index < 3 ? "high" : "auto"}
                  />
                </div>
                <div className="col-8 col-lg-8 col-md-3 card-body d-flex text-center ">
                  <span className="card-text pt-1 oswald fs-5 fw-medium">
                    {prod.marca}
                  </span>
                  <span className="texto-secundario fs-6 open-sans fw-medium">
                    {prod.detalles.descripcion}
                  </span>
                  <span className="card-text fw-bold open-sans fs-6">
                    ${prod.precio}
                  </span>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-success d-block d-sm-none"
                      onClick={() => agregarAlCarrito(prod, setCarritoStore)}
                    >
                      Agregar al carrito
                    </button>
                    <button
                      type="button"
                      className="btn btn-success d-none d-sm-block"
                      onClick={() => agregarAlCarrito(prod, setCarritoStore)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
                {/* </a> */}
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
