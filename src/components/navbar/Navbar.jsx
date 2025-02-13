import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useParams } from "react-router-dom";
import empresaData from "@/data/empresa.json";
import useEmpresaStore from "@/hooks/useEmpresaStore";
import { BsCart3, BsTelephone, BsGeoAlt } from "react-icons/bs";
import { FaWhatsapp, FaInstagram, FaRegClock } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import ContactInfo from "@/components/navbar/Contacto.jsx";

const Navbar = () => {
  const { id } = useParams();
  const empresaActual = useEmpresaStore((state) => state.empresaActual);
  const setEmpresaActual = useEmpresaStore((state) => state.setEmpresaActual);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const empresaLocal = localStorage.getItem("empresaActual");

    if (empresaLocal) {
      setEmpresaActual(JSON.parse(empresaLocal));
      setIsLoading(false);
      return;
    }

    if (id) {
      const empresaEncontrada = empresaData.find(
        (item) => item.empresa.id === id
      );
      if (empresaEncontrada) {
        localStorage.setItem(
          "empresaActual",
          JSON.stringify(empresaEncontrada.empresa)
        );
        setEmpresaActual(empresaEncontrada.empresa);
      }
    }

    setIsLoading(false);
  }, [id, setEmpresaActual]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { nombre, contacto, direccion, horarios, redes_sociales, logo } =
    empresaActual;

  return (
    <>
      <div className="lavanda-str pt-1 d-flex justify-content-center align-items-center hide-on-mobile-md">
        <span className="fs-5 py-1 fw-medium open-sans lettering-space">
          Vender sin comisiones nunca ha sido tan fácil
        </span>
      </div>
      <header className="underline-nav" id="top">
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
              <div className="ms-5">
                <button
                  type="button"
                  className="btn btn-dark sm-hidden open-sans fw-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#infoModal"
                >
                  Acerca de <span className="fw-bold">{nombre}</span>
                </button>

                <div
                  className="modal fade"
                  id="infoModal"
                  tabIndex="-1"
                  aria-labelledby="infoModalLabel"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                      <div className="modal-header">
                        <h5 className="modal-title" id="infoModalLabel">
                          Sobre Nosotros
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <ul className="list-unstyled">
                          <li>
                            <strong>📍 Dirección:</strong> {direccion.calle}
                          </li>
                          <li>
                            <strong>🏙️ Ciudad:</strong> {direccion.ciudad}
                          </li>
                          <li>
                            <strong>📞 Teléfono:</strong> {contacto.telefono}
                          </li>
                          <li>
                            <strong>📧 Email:</strong> {contacto.email}
                          </li>
                          <li>
                            <strong>🕒 Horarios:</strong> Lunes a viernes:{" "}
                            <span>{horarios.lunes_viernes} </span>
                            Sabado:
                            <span>{horarios.sabado} </span>
                            Domingo:
                            <span> {horarios.domingo}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="logo-brand">
                <img
                  src={logo || <RxAvatar />}
                  title={nombre || "logo"}
                  alt={`logo de ${nombre || "empresa"}`}
                  style={{ maxWidth: "50px", borderRadius: "50%" }}
                />
              </div>
            </div>
            <div>
              <Link to="/carrito" className="mx-4 position-relative">
                <BsCart3 color="black" size={24} aria-label="Ir al carrito" />
                <div className="d-inline relojito">
                  <span className="text-morado fw-bold">30:00</span>
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
                  <h2 className="titulo text-center oswald">{nombre}</h2>
                </li>
                <ContactInfo
                  icon={<FaWhatsapp />}
                  label="WhatsApp"
                  value={contacto?.whatsapp}
                />
                <ContactInfo
                  icon={<BsTelephone />}
                  label="Teléfono"
                  value={contacto?.telefono}
                />
                <ContactInfo
                  icon={<FaInstagram />}
                  label="Instagram"
                  value={redes_sociales?.instagram}
                />
                <ContactInfo
                  icon={<BsGeoAlt />}
                  label="Dirección"
                  value={direccion?.calle + " " + direccion?.provincia}
                />
                <li className="nav-item hide-on-desktop mt-3">
                  <div className="d-flex align-items-center">
                    {<FaRegClock size={32} />}
                    <p className="open-sans ms-2">
                      Lunes a viernes: {horarios.lunes_viernes}
                    </p>
                    <p className="open-sans ms-2">Sabado: {horarios.sabado}</p>
                    <p className="open-sans ms-2">
                      Domingo: {horarios.domingo}
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
};

export default Navbar;
