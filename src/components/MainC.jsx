import Carousel from "react-bootstrap/Carousel";
import Image from "./Image"; // Asegúrate de importar correctamente tu componente Image desde su ubicación correcta
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import CardC from "./CardC";
import "../css/Carrusel.css";
import "../css/Productos.css";
import Pisadas from "./Pisadas";

const MainC = () => {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="container-fluid mt-30">
        <div className="row px-xl-5 ">
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
                        Nuestros profesionales están comprometidos con la salud
                        y el bienestar de las mascotas. ¡Confía en ellos para el
                        cuidado de tus animales!
                      </p>
                      <a
                        className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInDown"
                        href="/profesionales">
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
                        href="/detallePlanes">
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
                        href="#">
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <CardC />
          </div>
          <div className="d-flex justify-content-center mt-30">
            <Pagination size="sm">{items}</Pagination>
          </div>
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
};

export default MainC;
