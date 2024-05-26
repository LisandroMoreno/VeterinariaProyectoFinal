import React from "react";
import Card from "react-bootstrap/Card";
import "../css/Card.css";

const CardC = ({ idProd, titulo, image, precio, descripcion }) => {
  return (
    <Card className="card-vet text-center">
      <div className="card-img-top">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text>{precio}</Card.Text>
        <a href={`/productos/${idProd}`} className="btn-primary">
          Ver mas
        </a>
      </Card.Body>
    </Card>
  );
};

export default CardC;
