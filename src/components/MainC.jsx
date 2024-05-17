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
      <div>
        <h5 className="text-black text-center mb-5 mt-5 ">
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
            <div className="col-lg-4 col-md-6 mb-4 ">
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
            <div className="col-lg-4 col-md-6 mb-3 ">
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
    </div>
  );
};

export default MainC;
