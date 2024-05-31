import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ImageC from "./ImageC";
import Pisadas from "./Pisadas";
import "../css/NavbarC.css";

const NavbarC = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";
  return (
    <>
      <div className="navbar-container">
        <div className="pisadas-container"></div>
        <Navbar expand="lg" className="bg fixed-top">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
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
                <Nav.Link as={Link} to="/" className="my-custom-link">
                  Inicio
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/sobreNosotros"
                  className="my-custom-link"
                >
                  Sobre Nosotros
                </Nav.Link>
                <NavDropdown title="Servicios" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/planes">
                    Planes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/productos">
                    Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/reservaTurnos">
                    Reserva de turnos
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="separator d-lg-none">
                <Nav.Link className="text-white"> </Nav.Link>
              </Nav>
              <Nav>
                {token && role === "usuario" ? (
                  <NavDropdown
                    title="Mi Cuenta"
                    id="account-nav-dropdown"
                    className="my-custom-link"
                  >
                    <NavDropdown.Item as={Link} to="/misReservas">
                      Mis Reservas
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/misDatos">
                      Mis Datos
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login" className="my-custom-link">
                      Iniciar Sesión
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/registro"
                      className="my-custom-link"
                    >
                      Registrarse
                    </Nav.Link>
                  </>
                )}
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
