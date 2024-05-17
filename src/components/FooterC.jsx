import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "./Image";
import "../css/FooterC.css";

const FooterC = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <>
      <footer className="bg">
        <div className="container-fluid text-center ">
          <div className="row justify-content-center">
            <div className="col-12 mt-2 col-md-6 col-lg-3 align-items-center d-flex justify-content-center">
              <NavLink to="/">
                <Image urlImagen={url} ancho="70vh" alternativo="logo" />
              </NavLink>
            </div>
            <div className="col-12 col-md-6 col-lg-3 align-items-center flex-column mt-5  ">
              <NavLink to="/" className="text-decoration-none">
                <h6 className="text-white footer-link">Inicio</h6>
              </NavLink>
              <NavLink to="/sobre-nosotros" className="text-decoration-none">
                <h6 className="text-white footer-link">Sobre Nosotros</h6>
              </NavLink>
              <NavLink to="/contacto" className="text-decoration-none">
                <h6 className="text-white footer-link">Contacto</h6>
              </NavLink>
              <NavLink
                to="/trabaja-con-nosotros"
                className="text-decoration-none ">
                <h6 className="text-white mb-5 footer-link">
                  Trabaja con Nosotros
                </h6>
              </NavLink>
            </div>
            <div className="col-12 col-md-6 col-lg-3 justify-content-center align-items-center d-flex flex-row ">
              <a
                href="https://www.facebook.com/RollingCodeSchool/"
                className="text-white fs-6 p-2 footer-link">
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/rollingcodeok"
                className="text-white fs-6 p-2 footer-link">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/rollingcodeschool/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                className="text-white fs-6 p-2 footer-link">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/3816342100"
                className="text-white fs-6 p-2 footer-link">
                <FaWhatsapp />
              </a>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-5  ">
              <iframe
                className="rounded-3"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949468!2d-65.20974192481181!3d-26.836578490026472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1700003312887!5m2!1ses!2sar"
                width="70%"
                height="60%"
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
