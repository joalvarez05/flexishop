import React, { useEffect, useState } from "react";
import agregarAlCarrito from "@/utils/agregarAlCarrito";
import productos from "@/data/productos.json";
import useProductoStore from "@/hooks/useProductoStore.js";
import useCarritoStore from "@/hooks/useCarritoStore.js";
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
    setProductosFiltrados(
      productoStore.filter((prod) =>
        prod.marca.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, productoStore]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOrdenar = (opcion) => {
    setOrdenar(opcion);
  };
  // console.log(carritoStore);
  return (
    <main className="pt-3 pb-5" id="top">
      <a href="#top" className="go-top d-flex ">
        <BsArrowUp />
      </a>
      <Toaster position="top-center" reverseOrder={true} />
      <section className="container pb-2 d-flex sm-bottom">
        <div className="text-center w-100">
          <input
            id="search"
            type="search"
            value={searchValue}
            placeholder="Buscar..."
            onChange={handleSearch}
            className="inp-search"
          />
        </div>
        <div className="">
          <div className="d-flex justify-content-end sm">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                {ordenar}
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
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (
              <div className="col-6 col-md-4 col-lg-3 pt-3" key={prod.id}>
                <a href="#" className="text-decoration-none">
                  <div className="card h-100 py-3 d-flex flex-column align-items-center justify-content-center">
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
                        className="btn btn-dark padding-sm-sm"
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
