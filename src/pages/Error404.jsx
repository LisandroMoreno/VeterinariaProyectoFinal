import React from "react";
import "../css/Error404.css";
import { titlePage } from "../helpers/titlePages";

const Error404 = () => {
  titlePage("Error404");
  const atras = () => {
    // Navega a la página anterior en el historial del navegador
    window.history.back();
  };

  return (
    <>
      <div className="error-container">
        <div className="img-error404">
          <h1>404</h1>
          <div className="linea"></div>
          <div>
            <h2>
              ¡OOPS! La pagina no está disponible en estos momentos, disculpe
              las molestias
            </h2>
          </div>
          <div className="volverBTN">
            <button type="button" className="btnForm" onClick={atras}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
