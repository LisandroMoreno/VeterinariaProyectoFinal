import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Card.css";

const CardC = ({ idProd, titulo, image, precio, descripcion }) => {
  return (
    <Card className="text-center">
      <div className="card-img-top">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text>{precio}</Card.Text>
        <Button variant="primary">Ver más</Button>
      </Card.Body>
    </Card>
  );
};

export default CardC;
