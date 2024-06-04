import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../css/Card.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const CardC = ({ idProd, titulo, image, precio, descripcion, getAllCart }) => {
  const location = useLocation();
  const isDetalleFavorito = location.pathname.includes("detalleFavorito");

  const eliminarProducto = async (id) => {
    try {
      const response = await clienteAxios.delete(`/favoritos/${id}`, config);
      console.log("Producto eliminado:", response.data);
      // Actualiza el estado favs eliminando el producto
      getAllCart(); // Llama a getAllCart para actualizar los favoritos en DetalleFavorito
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <Card className="card-vet text-center">
      <div className="card-img-top">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text>{precio}</Card.Text>
        <div>
          <a href={`/productos/${idProd}`} className="btn btn-card">
            Ver más
          </a>
          {isDetalleFavorito && (
            <Button
              onClick={() => eliminarProducto(idProd)}
              className="btn-card-borrar"
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardC;
