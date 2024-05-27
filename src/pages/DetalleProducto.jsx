import { Col, Container, Row, Button } from "react-bootstrap";
import { titlePage } from "../helpers/titlePages";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../helpers/clienteAxios";
import ImageC from "../components/ImageC";
import "../css/DetalleProducto.css";

titlePage("Detalle de Producto");

const DetalleProducto = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  const obtenerProducto = async () => {
    try {
      const response = await clienteAxios.get(`/productos/${params.id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, [params.id]);

  const agregarFavoritos = () => {
    // Lógica para agregar a favoritos
    console.log("Agregado a favoritos:", product.titulo);
  };

  const agregarCarrito = () => {
    // Lógica para agregar al carrito
    console.log("Agregado al carrito:", product.titulo);
  };

  return (
    <Container className="container-main">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs="12" md="6">
          <div className="image-container">
            <ImageC
              urlImagen={product.image}
              alternativo={product.descripcion}
            />
          </div>
        </Col>
        <Col xs="12" md="6">
          <div className="product-details">
            <h2>{product.titulo}</h2>
            <p>{product.descripcion}</p>
            <p>${product.precio}</p>
            <div className="buttons-container">
              <Button
                variant="primary"
                onClick={agregarFavoritos}
                className="mt-2"
              >
                Agregar a favoritos
              </Button>
              <Button
                variant="primary"
                onClick={agregarCarrito}
                className="mt-2"
              >
                Agregar al Carrito
              </Button>
            </div>
            <div>
              <Button className="mt-2 producto">Comprar</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleProducto;
