import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import ImageC from "./ImageC";
import "../css/FooterC.css";
import { Nav } from "react-bootstrap";

const FooterC = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <footer className="bg">
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          <div className="col-12 mt-2 col-md-6 col-lg-3 align-items-center d-flex justify-content-center">
            <Link to="/">
              <ImageC urlImagen={url} ancho="100vh" alternativo="logo" />
            </Link>
          </div>

          <Nav className="col-12 col-md-6 col-lg-3 align-items-center flex-column mt-3 nav-menu">
            <Nav.Link as={Link} to="/" className="my-custom-link">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/sobreNosotros" className="my-custom-link">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="my-custom-link">
              Contactanos
            </Nav.Link>
            <Nav.Link as={Link} to="/*" className="my-custom-link">
              Trabaja con nosotros
            </Nav.Link>
          </Nav>

          <div className="col-12 col-md-6 col-lg-3 justify-content-center align-items-center d-flex flex-column">
            <h6 className="mt-4">Redes Sociales</h6>
            <div className="d-flex flex-row footer-link">
              <a
                href="https://www.facebook.com/RollingCodeSchool/"
                className="text-white social-icon p-2"
                target="_blank"
                rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/rollingcodeok"
                className="text-white social-icon p-2 footer-link"
                target="_blank"
                rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/rollingcodeschool/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                className="text-white social-icon p-2 footer-link"
                target="_blank"
                rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/3816342100"
                className="text-white social-icon p-2 footer-link"
                target="_blank"
                rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mt-3">
            <div className="text-white">
              <h6 className="mb-3 text-black">Información de Contacto</h6>
              <p>Dirección: Gral. Paz 576</p>
              <p>Teléfono: +1234567890</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 ">
            <div className="text-white">
              <p>© Todos los derechos reservados Patas y Garras</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterC;
