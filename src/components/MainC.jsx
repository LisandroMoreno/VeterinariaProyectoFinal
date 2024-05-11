import Carousel from "react-bootstrap/Carousel";
import Image from "./Image"; // Asegúrate de importar correctamente tu componente Image desde su ubicación correcta
import "../css/Carrusel.css";

const MainC = () => {
  return (
    <div className="container-fluid mb-3">
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
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
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
          </div>
          <div className="product-offer mb-30 productH">
            <Image
              className="img-fluid"
              urlImagen="https://cdn.ready-market.com.tw/78d8bdd7/Templates/pic/Dog-Toy-1.jpg"
              alternativo="Descripción de la imagen derecha 1"
              ancho={"100%"} // Ancho de la imagen, puedes ajustarlo según tus necesidades
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainC;
