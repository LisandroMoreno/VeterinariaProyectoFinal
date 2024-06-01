import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ImageC from "./ImageC";
import Pisadas from "./Pisadas";
import "../css/NavbarC.css";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/"); // Redirige a la página de inicio
  };

  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";

  return (
    <>
      <div className="navbar-container">
        <div className="pisadas-container"></div>
        <Navbar expand="lg" className="bg fixed-top">
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to={role === "admin" ? "/home-adminLog" : "/"}>
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
                {!token || role !== "admin" ? (
                  <>
                    <Nav.Link as={Link} to="/" className="my-custom-link">
                      Inicio
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/sobreNosotros"
                      className="my-custom-link">
                      Sobre Nosotros
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/contacto"
                      className="my-custom-link">
                      Contactanos
                    </Nav.Link>
                    <NavDropdown title="Servicios" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/planes">
                        Planes
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/reservaTurnos">
                        Reserva de turnos
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/pacientes"
                      className="my-custom-link">
                      Pacientes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/turnos" className="my-custom-link">
                      Turnos
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/productos"
                      className="my-custom-link">
                      Productos
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/usuarios"
                      className="my-custom-link">
                      Usuarios
                    </Nav.Link>
                  </>
                )}
              </Nav>
              <Nav className="separator d-lg-none">
                <Nav.Link className="text-white"> </Nav.Link>
              </Nav>
              <Nav>
                {token && role === "user" ? (
                  <>
                    <div className="d-flex align-items-center d-none d-lg-flex">
                      <Nav.Link
                        as={Link}
                        to="/detalleCarrito"
                        className="my-custom-link me-2">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </Nav.Link>

                      <Nav.Link
                        as={Link}
                        to="/detalleFavorito"
                        className="my-custom-link me-2">
                        <i className="fa-solid fa-heart fa-1x "></i>
                      </Nav.Link>
                    </div>

                    <NavDropdown
                      title="Mi Cuenta"
                      id="account-nav-dropdown"
                      className="my-custom-link me-5">
                      <NavDropdown.Item as={Link} to="/misReservas">
                        Mis Reservas
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/misDatos">
                        Mis Datos
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/" onClick={cerrarSesion}>
                        Cerrar Sesión
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : token && role === "admin" ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/"
                      className="my-custom-link"
                      onClick={cerrarSesion}>
                      Cerrar Sesion
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login" className="my-custom-link">
                      Iniciar Sesión
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/registro"
                      className="my-custom-link">
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
