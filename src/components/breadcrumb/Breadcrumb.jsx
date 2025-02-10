import React from "react";

function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-decoration-none">
          <span className="titulo">Home</span>
        </li>
        <li
          className="breadcrumb-item texto-secundario"
          aria-current="page"
        >
          Library
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
