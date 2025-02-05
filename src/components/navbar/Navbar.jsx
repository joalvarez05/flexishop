import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useParams } from "react-router-dom";
import empresaData from "@/data/empresa.json";

function Navbar() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [empresaActual, setEmpresaActual] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const empresaEncontrada = empresaData.find(
      (item) => item.empresa.id === id
    );
    if (empresaEncontrada) {
      setEmpresaActual(empresaEncontrada.empresa);
    } else {
      setEmpresaActual(null);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className="lavanda-str pt-1 d-flex justify-content-center align-items-center hide-on-mobile">
        <span className="fs-5 py-1 fw-medium open-sans lettering-space">
          Vender sin comisiones nunca ha sido tan fácil
        </span>
      </div>
      <header className="underline-nav">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid py-3 d-flex justify-content-between align-items-center ">
            <div className="d-flex align-items-center ">
              <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarNav"
                aria-controls="sidebarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="logo-brand">
                <img
                  src={
                    empresaActual?.logo ||
                    "https://res.cloudinary.com/druvz15q9/image/upload/v1738764741/person-circle-outline_dq7h9q.svg"
                  }
                  alt={`logo de ${empresaActual?.nombre || "empresa"}`}
                  style={{ maxWidth: "44px", borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="ms-3 me-auto">
              <input
                type="search"
                value={searchValue}
                placeholder="Buscar..."
                onChange={handleSearch}
                className="hide-on-mobile inp-search"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/druvz15q9/image/upload/v1738764741/person-circle-outline_dq7h9q.svg"
                alt="Avatar"
                className="avatar-img"
              />
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start rounded-3 w-365"
            tabIndex="-1"
            id="sidebarNav"
            aria-labelledby="sidebarNavLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body mt-5">
              <ul className="navbar-nav">
                <li className="nav-item hide-on-desktop mb-4">
                  <h2 className="titulo text-center oswald">
                    {empresaActual.nombre}
                  </h2>
                </li>
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://res.cloudinary.com/druvz15q9/image/upload/v1738771994/whatsapp_cupez7.svg"
                      alt="icono whatsapp"
                      className="icon-sidebar"
                      loading="lazy"
                    />
                    <a
                      className="nav-link ms-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://api.whatsapp.com/send?phone=${empresaActual.contacto?.telefono}&text=Hola me comunico desde FlexiShop`}
                    >
                      {empresaActual.contacto?.whatsapp || "No disponible"}
                    </a>
                  </div>
                </li>
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://res.cloudinary.com/druvz15q9/image/upload/v1738771994/phone_xunfve.svg"
                      alt="icono telefono"
                      className="icon-sidebar"
                      loading="lazy"
                    />
                    <a
                      className="nav-link ms-2"
                      href={`tel:${empresaActual.contacto?.telefono}`}
                      target="_blank"
                    >
                      {empresaActual.contacto?.telefono || "No disponible"}
                    </a>
                  </div>
                </li>
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center text-wrap">
                    <img
                      src="https://res.cloudinary.com/druvz15q9/image/upload/v1738771994/instagram_bjpldr.svg"
                      alt="icono instagram"
                      className="icon-sidebar"
                      loading="lazy"
                    />
                    <a
                      className="nav-link ms-2 text-wrap"
                      href={empresaActual.redes_sociales?.instagram_url}
                    >
                      {empresaActual.redes_sociales?.instagram ||
                        "No disponible"}
                    </a>
                  </div>
                </li>
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://res.cloudinary.com/druvz15q9/image/upload/v1738771994/location_bj43c6.svg"
                      alt="icono ubicacion"
                      className="icon-sidebar"
                      loading="lazy"
                    />
                    <p className="open-sans ms-2">
                      {empresaActual.direccion?.calle +
                        " " +
                        empresaActual.direccion?.provincia || "No disponible"}
                    </p>
                  </div>
                </li>
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://res.cloudinary.com/druvz15q9/image/upload/v1738771994/time_ja96um.svg"
                      alt="icono reloj"
                      className="icon-sidebar"
                      loading="lazy"
                    />
                    <p className="open-sans ms-2">
                      {empresaActual.horarios?.lunes_viernes +
                        empresaActual.horarios?.sabado +
                        empresaActual.horarios?.domingo || "No disponible"}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
