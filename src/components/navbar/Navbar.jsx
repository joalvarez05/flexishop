import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useParams } from "react-router-dom";
import empresaData from "@/data/empresa.json";
import useEmpresaStore from "@/hooks/useEmpresaStore";
import { BsCart3 } from "react-icons/bs";

function Navbar() {
  const { id } = useParams();
  const empresaActual = useEmpresaStore((state) => state.empresaActual);
  const setEmpresaActual = useEmpresaStore((state) => state.setEmpresaActual);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificamos si ya tenemos la información en localStorage
    const empresaLocal = localStorage.getItem("empresaActual");

    if (empresaLocal) {
      // Si existe, lo seteamos en el estado global
      setEmpresaActual(JSON.parse(empresaLocal));
      setIsLoading(false);
      return;
    }

    // Si no hay en localStorage, buscamos por ID
    if (id) {
      const empresaEncontrada = empresaData.find(
        (item) => item.empresa.id === id
      );
      if (empresaEncontrada) {
        // Guardamos la empresa en localStorage
        localStorage.setItem(
          "empresaActual",
          JSON.stringify(empresaEncontrada.empresa)
        );
        // Seteamos la empresa en el estado global
        setEmpresaActual(empresaEncontrada.empresa);
      }
    }

    setIsLoading(false);
  }, [id, setEmpresaActual]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="lavanda-str pt-1 d-flex justify-content-center align-items-center hide-on-mobile-md">
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
                aria-label="Desplegar modal"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="logo-brand">
                <img
                  src={
                    empresaActual?.logo ||
                    "https://res.cloudinary.com/druvz15q9/image/upload/v1738764741/person-circle-outline_dq7h9q.svg"
                  }
                  title={empresaActual?.nombre || "logo"}
                  alt={`logo de ${empresaActual?.nombre || "empresa"}`}
                  style={{ maxWidth: "44px", borderRadius: "50%" }}
                />
              </div>
            </div>

            <div>
              <img
                src="https://res.cloudinary.com/druvz15q9/image/upload/v1738764741/person-circle-outline_dq7h9q.svg"
                alt="Avatar"
                className="avatar-img"
                title="avatar"
              />
              <Link to="/carrito" className="mx-4 position-relative">
                <BsCart3 color="black" size={24} />
                <div className="d-inline relojito">
                  <span className="text-morado fw-bold">
                    20:00
                  </span>
                </div>
              </Link>
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
                aria-label="Cerrar modal"
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
                      title="whatsapp"
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
                      title="telefono"
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
                      title="instagram"
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
                      title="reloj"
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
