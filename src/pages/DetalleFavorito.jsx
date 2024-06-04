import React, { useEffect, useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";
import CardC from "../components/CardC";
import { Col, Container, Row } from "react-bootstrap";
import { titlePage } from "../helpers/titlePages";

const DetalleFavorito = () => {
  titlePage(`Detalle de Favoritos`);

  const [favs, setFavs] = useState([]); // Inicializa el estado con un array vacío

  const getAllCart = async () => {
    try {
      const getFavs = await clienteAxios.get(`/favoritos`, config);
      console.log(getFavs.data.favorito.products);
      setFavs(getFavs.data.favorito.products);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <div className="mt-3 mx-3">
        <h4>Resumen de tus favoritos</h4>
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center text-center">
          {favs.map((product) => (
            <Col sm="12" md="6" lg="3" className="my-3" key={product._id}>
              <CardC
                idProd={product._id}
                image={product.image}
                titulo={product.titulo}
                descripcion={product.descripcion}
                precio={product.precio}
                getAllCart={getAllCart} // Pasa getAllCart como prop
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DetalleFavorito;
