import ImageC from "./ImageC";
import Pisadas from "./Pisadas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";

const NavbarC = () => {
  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <>
      <div className="navbar-container">
        <div className="pisadas-container"></div>
        <Navbar expand="lg" className="bg fixed-top">
          <Container fluid>
            <Navbar.Brand href="/">
              <ImageC urlImagen={url} ancho="50" alternativo="logo" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="custom-border"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="separator d-lg-none mt-4" />
              <Nav.Link className="text-white"> </Nav.Link>
              <Nav className="me-auto">
                <Nav.Link href="/" className="my-custom-link">
                  Inicio
                </Nav.Link>
                <Nav.Link href="/sobreNosotros" className="my-custom-link">
                  Sobre Nosotros
                </Nav.Link>
                <NavDropdown title="Servicios" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/planes">Planes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/productos">
                    Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/reservaTurnos">
                    Reserva de turnos
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="separator d-lg-none">
                <Nav.Link className="text-white"> </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login" className="my-custom-link">
                  Iniciar Sesion
                </Nav.Link>
                <Nav.Link href="/registro" className="my-custom-link">
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
