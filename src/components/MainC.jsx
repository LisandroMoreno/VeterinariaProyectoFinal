import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageC from "./ImageC";
import CardC from "./CardC";
import Pisadas from "./Pisadas";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { Col, Container, Row } from "react-bootstrap";
import clienteAxios from "../helpers/clienteAxios";
import "../css/Carrusel.css";
import "../css/Productos.css";
import "../css/ApiClima.css";
import "../css/HealthPlan.css";
import ApiClima from "./ApiClima";

const MainC = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Todas las categorias"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 10; // Número de productos por página

  const getProducts = async (categoria, page) => {
    try {
      let response;
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;

      if (categoria === "Todas las categorias") {
        response = await clienteAxios.get("/productos", {
          params: { skip, limit, page },
        });
      } else {
        response = await clienteAxios.get("/productos", {
          params: { categoria, skip, limit, page },
        });
      }

      const { products, count } = response.data;
      setProducts(products);
      setTotalPages(Math.ceil(count / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const handleCategoryClick = (categoria) => {
    setSelectedCategory(categoria);
    getProducts(categoria, 1); // cargar productos cuando cambia la categoría
  };

  const filteredProducts =
    selectedCategory === "Todas las categorias"
      ? products
      : products.filter((product) =>
          product.categoria
            .toLowerCase()
            .includes(selectedCategory.toLowerCase())
        );

  useEffect(() => {
    getProducts(selectedCategory, 1);
  }, [selectedCategory]);

  const handleButtonClick = () => {
    navigate("/planes");
  };

  return (
    <>
      <div className="ClimaSearch">
        <ApiClima />
      </div>

      <div className="text-center mt-2 mb-2">
        <h2>Veterinaria Patas y Garras, un lugar para cuidar a tu mascota</h2>
      </div>

      <div className="container-fluid mb-3 mt-2">
        <div className="row px-xl-5">
          <div className="col-lg-8 mb-30">
            <Carousel fade className="h-100 ">
              <Carousel.Item>
                <div className="productH2">
                  <ImageC
                    urlImagen="https://www.animalshealth.es/fileuploads/news/mesa-de-trabajo-11_790.jpg"
                    alternativo="Descripción de la primera imagen"
                    ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
                  />
                </div>
                <Carousel.Caption>
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 captionMW">
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Nuestros Profesionales
                      </h1>
                      <p className="mx-md-5 px-5">
                        Nuestros profesionales están comprometidos con la salud
                        y el bienestar de las mascotas. ¡Confía en ellos para el
                        cuidado de tus animales!
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInDown"
                        href="/reservaTurnos"
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="productH2">
                  <ImageC
                    urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1717648174/foto_modif_cvfkhr.jpg"
                    alternativo="Descripción de la segunda imagen"
                    ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
                  />
                </div>
                <Carousel.Caption>
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 captionMW">
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Planes para tu mascota
                      </h1>
                      <p className="mx-md-5 px-5">
                        El cuidado de tu mascota nos importa, es por eso que
                        ofrecemos planes accesibles para su bienestar
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInDown"
                        href="/planes"
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="productH2">
                  <ImageC
                    urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1717648485/foto_pet_jntf4t.png"
                    alternativo="Descripción de la tercera imagen"
                    ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
                  />
                </div>
                <Carousel.Caption>
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 captionMW">
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Pet Market
                      </h1>
                      <p className="mx-md-5 px-5">
                        Te ofrecemos nuestros productos para el cuidado y
                        bienestar de tu mascota
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInDown"
                        href="#products-section"
                      >
                        Ver más
                      </a>
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30 productH">
              <ImageC
                className="img-fluid"
                urlImagen="https://cdn.ready-market.com.tw/78d8bdd7/Templates/pic/Dog-Toy-1.jpg"
                alternativo="Descripción de la imagen derecha 1"
                ancho={"100%"}
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Descuento 20%</h6>
                <h3 className="text-white mb-3">Oferta especial</h3>
                <a href="*" className="btn btn-outline-light py-2 px-4 mt-3">
                  Ver más
                </a>
              </div>
            </div>
            <div className="product-offer mb-30 productH">
              <ImageC
                className="img-fluid"
                urlImagen="https://cdn.ready-market.com.tw/78d8bdd7/Templates/pic/Dog-Toy-1.jpg"
                alternativo="Descripción de la imagen derecha 2"
                ancho={"100%"}
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Descuento 20%</h6>
                <h3 className="text-white mb-3">Oferta especial</h3>
                <a href="*" className="btn btn-outline-light py-2 px-4 mt-3">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center">
                <Pisadas />
                PetMarket: Te ofrecemos nuestros productos para el cuidado y
                bienestar de tu mascota
              </h3>
            </div>
          </div>
        </div>
        <div
          className="container-fluid mb-30 mt-30 bg-btn"
          id="products-section"
        >
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button
                variant="light"
                className="btn-categoria"
                onClick={() => handleCategoryClick("Accesorios")}
              >
                Accesorios
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button
                variant="light"
                className="btn-categoria"
                onClick={() => handleCategoryClick("Alimentación")}
              >
                Alimentación
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button
                variant="light"
                className="btn-categoria"
                onClick={() => handleCategoryClick("Cuidados/Limpieza")}
              >
                Cuidados/Limpieza
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button
                variant="light"
                className="btn-categoria"
                onClick={() => handleCategoryClick("Todas las categorias")}
              >
                Todas las categorias
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Container className="mt-5">
            <Row className="justify-content-center text-center">
              {filteredProducts.map((product) => (
                <Col sm="12" md="6" lg="3" className="my-3" key={product._id}>
                  <CardC
                    idProd={product._id}
                    image={product.image}
                    titulo={product.titulo}
                    descripcion={product.descripcion}
                    precio={product.precio}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <div className="d-flex justify-content-center">
          <Pagination size="sm">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => getProducts(selectedCategory, index + 1)}
                linkClassName="custom-pagination-item"
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <div className="health-plan-container">
        <div className="health-plan-content">
          <h1>Plan de salud para animales</h1>
          <p>
            Ofrecemos un plan de salud integral para tus mascotas que incluye
            consultas, vacunas y mucho más.
          </p>
          <Button
            variant="primary"
            type="button"
            className="learn-more-button btnForm"
            onClick={handleButtonClick}
          >
            Saber más
          </Button>
        </div>
      </div>

      <div>
        <h5 className="text-black text-center mb-5 mt-5">
          Marcas con las que trabajamos
        </h5>
        <div className="container mt-3">
          <div className="row d-flex text-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2020/08/Royal_Canin_logo_PNG1.png"
                  alternativo="logo de Royal Canin"
                  ancho="25%"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2020/09/Pedigree_logo_PNG7.png"
                  alternativo="logo de Pedigree"
                  ancho="25%"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mt-4">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2020/09/Purina_logo_PNG3.png"
                  alternativo="logo de Purina"
                  ancho="25%"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2023/10/Eukanuba_logo_PNG5.png"
                  alternativo="logo de Eukanuba"
                  ancho="25%"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2021/03/Whiskas_logo_PNG7.png"
                  alternativo="logo de Whiskas"
                  ancho="25%"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="card-size">
                <ImageC
                  className="card-img-top"
                  urlImagen="https://1000logos.net/wp-content/uploads/2020/09/Friskies_logo_PNG7.png"
                  alternativo="logo de Friskies"
                  ancho="25%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainC;
