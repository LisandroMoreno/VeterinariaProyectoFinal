import Image from "./Image";
import Pisadas from "./Pisadas";

const FooterC = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <>
      <footer className="bg">
        <div className="container-fluid  text-center mt-3">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-3 align-items-center mt-5 mb-5">
              <a href="./index.html">
                <Image urlImagen={url} ancho="100" alternativo="logo" />
              </a>
            </div>
            <div className="col-12 col-md-6 col-lg-3 align-items-center flex-column mt-5">
              <a className="text-decoration-none" href="./index.html">
                <h4 className="text-white">Inicio</h4>
              </a>
              <a className="text-decoration-none " href="./html/Error404.html">
                <h4 className="text-white">Sobre Nosotros</h4>
              </a>
              <a
                href="#"
                className="text-decoration-none "
                data-bs-toggle="modal"
                data-bs-target="#contactoModal">
                <h4 className="text-white">Contacto</h4>
              </a>
              <a
                href="#"
                className="text-decoration-none "
                data-bs-toggle="modal"
                data-bs-target="#contactoModal">
                <h4 className="text-white">Trabaja con Nosotros</h4>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-3 align-items-center d-flex flex-md-column justify-content-center align-items-center">
              <a href="https://www.facebook.com/RollingCodeSchool/">
                <i className="fab fa-facebook text-white fs-3 m-2"></i>
              </a>
              <a href="https://www.instagram.com/rollingcodeschool/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==">
                <i className="fab fa-instagram text-white fs-3 m-3"></i>
              </a>
              <a href="https://wa.me/3816342100">
                <i className="fab fa-whatsapp text-white fs-3 m-2"></i>
              </a>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-5 mb-5">
              <iframe
                className="rounded-3"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949468!2d-65.20974192481181!3d-26.836578490026472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1700003312887!5m2!1ses!2sar"
                width="300"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterC;

/* <footer>
      <div class="container-fluid bg-black text-center mt-3">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 col-lg-3 align-items-center mt-5 mb-5">
            <a href="./index.html"
              ><img
                class="align-items-center mt-3"
                src="https://drive.google.com/uc?export=download&id=1NAdT8t1RODj4sLnJcEHD2EgtfyPtZXLm"
                alt="Logo Mil Coronas"
                width="250"
            /></a>
          </div>
          <div
            class="col-12 col-md-6 col-lg-3 align-items-center flex-column mt-5">
            <a class="text-decoration-none" href="./index.html"
              ><h4 class="text-white">Tienda Online</h4></a
            >
            <a class="text-decoration-none m-3" href="./html/Error404.html"
              ><h4 class="text-white">Centro de Ayuda</h4></a
            >
            <a
              href="#"
              class="text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#contactoModal">
              <h4 class="text-white">Contacto</h4>
            </a>

           
          </div>
          <div class="col-12 col-md-6 col-lg-3 mt-5 mb-5">
            <iframe
              class="rounded-3"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949468!2d-65.20974192481181!3d-26.836578490026472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1700003312887!5m2!1ses!2sar"
              width="300"
              height="150"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div
            class="col-12 col-md-6 col-lg-3 align-items-center d-flex flex-md-column justify-content-center align-items-center">
            <a href="https://www.facebook.com/RollingCodeSchool/"
              ><i class="fa-brands fa-facebook text-white fs-3 m-2"></i
            ></a>
            <a
              href="https://www.instagram.com/rollingcodeschool/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
              ><i class="fa-brands fa-instagram text-white fs-3 m-3"></i
            ></a>
            <a href="https://wa.me/3816342100"
              ><i class="fa-brands fa-whatsapp text-white fs-3 m-2"></i
            ></a>
          </div>
        </div>
      </div>
    </footer> */
