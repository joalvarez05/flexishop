import React from "react";
import "./footer.css";
import useEmpresaStore from "@/hooks/useEmpresaStore";
function Footer() {
  const empresaActual = useEmpresaStore((state) => state.empresaActual);
  // Reemplazar por un loader general para todo el sitio
  if (!empresaActual) {
    return <footer>Cargando empresa...</footer>;
  }
  return (
    <footer className="text-center bg-body-tertiary py-2">
      <div>
        <div>
          <p className="open-sans fw-medium texto-secundario">
            No pagues por adelantado sin conocer al local. Todos los ítems
            ofrecidos son responsabilidad de{" "}
            <span className="text-morado"> {empresaActual?.nombre}</span>.
          </p>
        </div>
        <div>
          Desarrollado por{" "}
          <span>
            <img
              src="https://res.cloudinary.com/druvz15q9/image/upload/v1738808093/logoNegrowithoutBg_za2vpn.png"
              alt="logo de uhmo"
              title="logo de uhmo"
              loading="lazy"
              className="avatar-img"
            />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
