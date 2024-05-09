import React from "react";
import "../css/Pisadas.css"; // Archivo de estilos CSS para las pisadas
import Image from "./Image";

const Pisadas = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1715287763/istockphoto-1402818302-612x612_l58aos.jpg";
  return (
    <div className="pisadas-container">
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
      <div className="pisada">
        <Image urlImagen={url} ancho="75" alternativo="logo" />
      </div>
    </div>
  );
};

export default Pisadas;
