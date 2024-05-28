import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import "../css/Contacto.css";
import { titlePage } from "../helpers/titlePages";

const Contacto = () => {
  titlePage("Contacto");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
  };

  return (
    <Container className="contacto-container mt-5">
      <Row>
        <Col md={6} className="form-container">
          <h2>Contáctanos</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                name="apellido"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje"
                name="mensaje"
                required
              />
            </Form.Group>

            <div className="button-container">
              <Button
                variant="primary"
                type="submit"
                className="button-custom mt-3">
                Enviar
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={6} className="info-container">
          <div className="social-icons">
            <a href="/*" className="social-item">
              <FaWhatsapp size={30} className="icon whatsapp-icon" />
              <span className="social-text">38145648789</span>
            </a>
            <a href="/*" className="social-item">
              <FaInstagram size={30} className="icon instagram-icon" />
              <span className="social-text">@PawsAndClaws</span>
            </a>
            <a href="/*" className="social-item">
              <FaFacebook size={30} className="icon facebook-icon" />
              <span className="social-text">@PawsAndClaws</span>
            </a>
          </div>
          <div className="map-container mt-3">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019531062352!2d-122.0856326846823!3d37.421999779822166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb6bff6396b1%3A0xc67f8d6dd6c80c62!2sGoogleplex!5e0!3m2!1ses!2s!4v1597356888900!5m2!1ses!2s"
              width="60%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
