import React from "react";
import Image from "./Image";
import "../css/Pisadas.css"; // Archivo de estilos CSS para las pisadas

const Pisadas = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1715298389/huellas_ptf3an.jpg";
  return (
    <div className="pisadas-container">
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="50" alternativo="logo" />
      </div>
    </div>
  );
};

export default Pisadas;
