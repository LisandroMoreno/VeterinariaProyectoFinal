import React from 'react';
import "../css/Error404.css";

const Error404 = () => {
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
          <h2>¡ENCONTRASTE UN PERRITO!</h2>
        </div>
        <div>
          <h3 className="mbT">
            <button
              className="w-100 btnForm mt-3" variant="primary"
              onClick={atras}
            >
              CLICKEA AQUÍ
            </button>
            PARA ADOPTARLO
          </h3>
        </div>
        <div>
        <button className="w-100 btnForm mt-3" variant="primary" onClick={atras}>Volver</button>
        </div>
      </div>
    </div> 
    </>
  );
}

export default Error404;