import React from "react";
import Image from "./ImageC";
import "../css/Pisadas.css";
import ImageC from "./ImageC";

const Pisadas = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1715298389/huellas_ptf3an.jpg";
  return (
    <div className="pisadas-container">
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada d-none d-sm-block">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
      <div className="pisada">
        <ImageC urlImagen={url} ancho="45" alternativo="logo" />
      </div>
    </div>
  );
};

export default Pisadas;
