import Image from "./Image";
import CardC from "./CardC";
import Pisadas from "./Pisadas";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "../css/Carrusel.css";
import "../css/Productos.css";
import "../css/ApiClima.css";

const MainC = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const allProducts = await clienteAxios.get("/productos");
    console.log(allProducts);
    setProducts(allProducts.data.getAllProductos);
  };

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );

    const [apiData, setApiData] = useState({});
    const [state, setState] = useState("San Miguel de Tucuman");

    const apiKey = "232e32153bfe7c18c89ebc060432d510";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    function kelvinToCelsius(kelvin) {
      return kelvin - 273.15;
    }

    const getWeatherIconClass = (iconCode) => {
      const iconMap = {
        "01d": "wi-day-sunny",
        "01n": "wi-night-clear",
        "02d": "wi-day-cloudy",
        "02n": "wi-night-alt-cloudy",
        "03d": "wi-cloud",
        "03n": "wi-cloud",
        "04d": "wi-cloudy",
        "04n": "wi-cloudy",
        "09d": "wi-showers",
        "09n": "wi-showers",
        "10d": "wi-day-rain",
        "10n": "wi-night-alt-rain",
        "11d": "wi-thunderstorm",
        "11n": "wi-thunderstorm",
        "13d": "wi-snow",
        "13n": "wi-snow",
        "50d": "wi-fog",
        "50n": "wi-fog",
      };
      return iconMap[iconCode] || "wi-na";
    };

    useEffect(() => {
      getProducts();
    }, []);

    useEffect(() => {
      axios
        .get(apiUrl)
        .then((response) => {
          setApiData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }, [state]);

    return (
      <>
        <Container-fluid>
          <Row>
            <Col sm="12" md="6" lg="4">
              <div className="mt-3 mb-3">
                <div id="weatherWrapper">
                  <div className="weatherCard">
                    <div className="currentTemp">
                      <span className="temp">
                        {apiData.main &&
                          kelvinToCelsius(apiData.main.temp).toFixed(1)}
                        °C
                      </span>
                      <span className="location">{state}</span>
                    </div>
                    <div className="currentWeather">
                      <span className="conditions">
                        {apiData.weather && (
                          <i
                            className={`wi ${getWeatherIconClass(
                              apiData.weather[0].icon
                            )}`}
                          ></i>
                        )}
                      </span>
                      <div className="info">
                        {apiData.main && (
                          <span>
                            {kelvinToCelsius(apiData.main.temp_min).toFixed(1)}
                            °C /{" "}
                            {kelvinToCelsius(apiData.main.temp_max).toFixed(1)}
                            °C
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container-fluid>

        <div className="text-center mt-2 mb-2">
          <h2>Veterinaria Patas y Garras, un lugar para cuidar a tu mascota</h2>
        </div>

        <div className="container-fluid mb-3 mt-2">
          <div className="row px-xl-5">
            <div className="col-lg-8 mb-30">
              <Carousel fade className="h-100 ">
                <Carousel.Item>
                  <div className="productH2">
                    <Image
                      urlImagen="https://cdn.euroinnova.edu.es/img/subidasEditor/curso-1612925686.webp"
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
                          Nuestros profesionales están comprometidos con la
                          salud y el bienestar de las mascotas. ¡Confía en ellos
                          para el cuidado de tus animales!
                        </p>
                        <a
                          className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInDown"
                          href="/profesionales"
                        >
                          Ver más
                        </a>
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="productH2">
                    <Image
                      urlImagen="https://www.animalshealth.es/fileuploads/news/mesa-de-trabajo-11_790.jpg"
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
                          href="/detallePlanes"
                        >
                          Ver más
                        </a>
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="productH2">
                    <Image
                      urlImagen="https://www.animalshealth.es/fileuploads/news/mesa-de-trabajo-11_790.jpg"
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
                          href="#"
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
                <Image
                  className="img-fluid"
                  urlImagen="https://cdn.ready-market.com.tw/78d8bdd7/Templates/pic/Dog-Toy-1.jpg"
                  alternativo="Descripción de la imagen derecha 1"
                  ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
                />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">Descuento 20%</h6>
                  <h3 className="text-white mb-3">Oferta especial</h3>
                  <a href="#" className="btn btn-outline-light py-2 px-4 mt-3">
                    Ver más
                  </a>
                </div>
              </div>
              <div className="product-offer mb-30 productH">
                <Image
                  className="img-fluid"
                  urlImagen="https://cdn.ready-market.com.tw/78d8bdd7/Templates/pic/Dog-Toy-1.jpg"
                  alternativo="Descripción de la imagen derecha 2"
                  ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
                />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">Descuento 20%</h6>
                  <h3 className="text-white mb-3">Oferta especial</h3>
                  <a href="#" className="btn btn-outline-light py-2 px-4 mt-3">
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

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
        <div className="container-fluid mb-30 mt-30 bg-btn">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-2 mtButton  mb-30 d-flex justify-content-center">
              <Button variant="light" className=" btn-categoria">
                Accesorios
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton  mb-30 d-flex justify-content-center">
              <Button variant="light" className=" btn-categoria">
                Alimentación
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button variant="light" className=" btn-categoria">
                Cuidados/Limpieza
              </Button>
            </div>
            <div className="col-12 col-md-2 mtButton mb-30 d-flex justify-content-center">
              <Button variant="light" className="btn-categoria">
                Todas las categorias
              </Button>
            </div>
          </div>
        </div>

        <Container className="mt-5">
          <Row className="justify-content-center text-center">
            {products.map((product) => (
              <Col sm="12" md="6" lg="4" className="my-3" key={product._id}>
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

        <div>
          <h5 className="text-black text-center mb-5 mt-5">
            Marcas con las que trabajamos
          </h5>
          <div className="container mt-3">
            <div className="row d-flex text-center">
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card-size">
                  <Image
                    className="card-img-top"
                    urlImagen="https://1000logos.net/wp-content/uploads/2020/08/Royal_Canin_logo_PNG1.png"
                    alternativo="logo de Royal Canin"
                    ancho="25%"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card-size">
                  <Image
                    className="card-img-top"
                    urlImagen="https://1000logos.net/wp-content/uploads/2020/09/Pedigree_logo_PNG7.png"
                    alternativo="logo de Pedigree"
                    ancho="25%"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-4 mt-4">
                <div className="card-size">
                  <Image
                    className="card-img-top"
                    urlImagen="https://1000logos.net/wp-content/uploads/2020/09/Purina_logo_PNG3.png"
                    alternativo="logo de Purina"
                    ancho="25%"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card-size">
                  <Image
                    className="card-img-top"
                    urlImagen="https://1000logos.net/wp-content/uploads/2023/10/Eukanuba_logo_PNG5.png"
                    alternativo="logo de Eukanuba"
                    ancho="25%"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card-size">
                  <Image
                    className="card-img-top"
                    urlImagen="https://1000logos.net/wp-content/uploads/2021/03/Whiskas_logo_PNG7.png"
                    alternativo="logo de Whiskas"
                    ancho="25%"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card-size">
                  <Image
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
  }
};
export default MainC;
