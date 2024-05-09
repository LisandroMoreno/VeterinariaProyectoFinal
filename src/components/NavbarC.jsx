import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "./Image";
import "../css/NavbarC.css";
import Pisadas from "./Pisadas";

const NavbarC = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg fixed-top">
          <Container fluid>
            <Navbar.Brand href="#home">
              <Image urlImagen={url} ancho="50" alternativo="logo" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="custom-border"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="separator d-lg-none mt-4">
                {" "}
                <Nav.Link className="text-white"> </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link href="#home" className="text-white">
                  Inicio
                </Nav.Link>
                <Nav.Link href="#link" className="text-white">
                  Sobre Nosotros
                </Nav.Link>
                <NavDropdown title="Servicios" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Planes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">
                    Reserva de turnos
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="separator d-lg-none">
                {" "}
                <Nav.Link className="text-white"> </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#home" className="text-white">
                  Iniciar Sesion
                </Nav.Link>
                <Nav.Link href="#link" className="text-white">
                  Registrarse
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Pisadas />
    </>
  );
};

export default NavbarC;
