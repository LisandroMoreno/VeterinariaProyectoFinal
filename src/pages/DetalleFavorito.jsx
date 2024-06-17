import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import clienteAxios, { config } from "../helpers/clienteAxios";
import CardC from "../components/CardC";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";

const DetalleFavorito = () => {
  titlePage(`Detalle de Favoritos`);

  const [favs, setFavs] = useState([]);

  const getAllFavoritos = async () => {
    try {
      const response = await clienteAxios.get(`/favoritos`, config);
      setFavs(response.data.favorito.products);
    } catch (error) {
      mostrarError("Error al obtener los favoritos", error);
    }
  };

  useEffect(() => {
    getAllFavoritos();
  }, []);

  const mostrarError = (titulo, error) => {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: "Hubo un problema al obtener la información de tus favoritos. Por favor, intenta nuevamente.",
      footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
    });
    console.error(titulo, error);
  };

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
                getAllFavoritos={getAllFavoritos}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DetalleFavorito;
