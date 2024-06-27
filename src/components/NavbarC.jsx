import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ImageC from "./ImageC";
import Pisadas from "./Pisadas";
import "../css/NavbarC.css"; // Asegúrate de que el CSS esté correctamente importado

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = JSON.parse(sessionStorage.getItem("role"));

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  const url =
    "https://res.cloudinary.com/duexhxoyy/image/upload/v1714683325/hek6sf6ymtztchwpq7sr.jpg";

  return (
    <>
      <div className="navbar-container">
        <div className="pisadas-container"></div>
        <Navbar expand="lg" className="bg fixed-top">
          <Container fluid className="d-flex align-items-center">
            <Navbar.Brand
              as={Link}
              to={role === "admin" ? "/home-adminLog" : "/"}
              className="me-auto"
            >
              <ImageC urlImagen={url} ancho="50" alternativo="logo" />
            </Navbar.Brand>
            {token && role === "user" && (
              <div className="d-flex justify-content-center mx-2 order-lg-2 d-lg-none d-block">
                <NavLink to="/detalleCarrito" className="my-custom-link me-4">
                  <i className="fa-solid fa-cart-shopping fa-2x"></i>
                </NavLink>
                <NavLink to="/detalleFavorito" className="my-custom-link">
                  <i className="fa-solid fa-heart fa-2x"></i>
                </NavLink>
              </div>
            )}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="custom-border ms-auto order-3"
            />
            <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2">
              <Nav className="separator d-lg-none mt-4" />
              <NavLink className="text-white"> </NavLink>
              <Nav className="me-auto">
                {!token || role !== "admin" ? (
                  <>
                    <NavLink to="/" className="my-custom-link nav-link">
                      Inicio
                    </NavLink>
                    <NavLink
                      to="/sobreNosotros"
                      className="my-custom-link nav-link"
                    >
                      Sobre Nosotros
                    </NavLink>
                    <NavLink to="/contacto" className="my-custom-link nav-link">
                      Contactanos
                    </NavLink>
                    <NavDropdown title="Servicios" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/planes">
                        Planes
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/profesionales">
                        Reserva de turnos
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <NavLink to="/" className="my-custom-link nav-link">
                      Inicio
                    </NavLink>
                    <NavLink
                      to="/pacientes"
                      className="my-custom-link nav-link"
                    >
                      Pacientes
                    </NavLink>
                    <NavLink
                      to="/AdminTurnos"
                      className="my-custom-link nav-link"
                    >
                      Turnos
                    </NavLink>
                    <NavLink
                      to="/productos"
                      className="my-custom-link nav-link"
                    >
                      Productos
                    </NavLink>
                    <NavLink to="/usuarios" className="my-custom-link nav-link">
                      Usuarios
                    </NavLink>
                  </>
                )}
              </Nav>
              <Nav className="separator d-lg-none">
                <NavLink className="text-white"> </NavLink>
              </Nav>
              <Nav className="d-flex d-lg-none">
                {token && role === "user" && (
                  <NavDropdown
                    title="Mi Cuenta"
                    id="account-nav-dropdown"
                    className="my-custom-link me-5 nav-link"
                  >
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
                )}
                {!token && (
                  <>
                    <NavLink to="/login" className="my-custom-link nav-link">
                      Iniciar Sesión
                    </NavLink>
                    <NavLink to="/registro" className="my-custom-link nav-link">
                      Registrarse
                    </NavLink>
                  </>
                )}
              </Nav>
              <Nav className="d-none d-lg-flex">
                {token && role === "user" ? (
                  <>
                    <NavLink
                      to="/detalleCarrito"
                      className="my-custom-link nav-link me-2"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </NavLink>

                    <NavLink
                      to="/detalleFavorito"
                      className="my-custom-link nav-link me-2"
                    >
                      <i className="fa-solid fa-heart fa-1x"></i>
                    </NavLink>

                    <NavDropdown
                      title="Mi Cuenta"
                      id="account-nav-dropdown"
                      className="my-custom-link nav-link me-5"
                    >
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
                    <NavLink
                      to="/"
                      className="my-custom-link nav-link"
                      onClick={cerrarSesion}
                    >
                      Cerrar Sesion
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="my-custom-link nav-link">
                      Iniciar Sesión
                    </NavLink>
                    <NavLink to="/registro" className="my-custom-link nav-link">
                      Registrarse
                    </NavLink>
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
