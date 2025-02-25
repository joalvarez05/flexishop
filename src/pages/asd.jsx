<section className="container" id="productos">
  <div className="">
    {productosFiltrados.length > 0 ? (
      productosFiltrados.map((prod, index) => (
        <div className="row pt-2 pt-lg-3 " key={prod.id}>
          {/* <a href="#" className="text-decoration-none"> */}
          {/* Columna izquierda para la imagen */}
          <div className="col-3 d-flex justify-content-start">
            <img
              src={prod.imagenes}
              className="card-img-top"
              alt={prod.alt}
              loading={index < 3 ? "eager" : "lazy"}
              fetchpriority={index < 3 ? "high" : "auto"}
            />
          </div>

          {/* Columna derecha para los detalles */}
          <div className="col-9 d-flex flex-column align-items-center">
            <span className="card-text py-1 oswald fs-5 fw-medium">
              {prod.marca}
            </span>
            <span className="texto-secundario fs-6 open-sans fw-medium">
              {prod.detalles.descripcion}
            </span>
            <span className="card-text descuento fw-medium open-sans fs-6">
              ${prod.precio}
            </span>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success btn-sm padding-sm-sm oswald espaciado"
              onClick={() => agregarAlCarrito(prod, setCarritoStore)}
            >
              Agregar al carrito
            </button>
          </div>
          {/* </a> */}
        </div>
      ))
    ) : (
      <p>No hay productos disponibles</p>
    )}
  </div>
</section>;

export default Home;
