import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import "../css/Contacto.css";
import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import clienteAxios from "../helpers/clienteAxios";

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Completa el campo vacío")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras."),
  apellido: yup
    .string()
    .required("Completa el campo vacío")
    .min(2, "Mínimo 2 caracteres")
    .max(15, "Máximo 15 caracteres")
    .matches(/^[a-zA-Z]+$/, "El apellido solo puede contener letras."),
  email: yup
    .string()
    .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
    .required("Completa el campo vacío"),
  mensaje: yup
    .string()
    .required("Completa el campo vacío")
    .min(10, "Mínimo 10 caracteres"),
});

const Contacto = () => {
  titlePage("Contacto");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await clienteAxios.post("/contact/send", values);

      if ((response.status = 200)) {
        setAlertMessage("Consulta enviada correctamente");
        setAlertVariant("success");
        resetForm();
      } else {
        setAlertMessage("Error al enviar la consulta");
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage("Error al enviar la consulta");
      setAlertVariant("danger");
    }

    setShowAlert(true);
    setSubmitting(false);

    // Ocultar la alerta después de 3 segundos y recargar la página
    setTimeout(() => {
      setShowAlert(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <Container className="contacto-container mt-5">
      <Row>
        <Col md={6} className="form-container">
          <h2>Contáctanos</h2>
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Formik
            initialValues={{ nombre: "", apellido: "", email: "", mensaje: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    isInvalid={touched.nombre && !!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu apellido"
                    name="apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    isInvalid={touched.apellido && !!errors.apellido}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe tu mensaje"
                    name="mensaje"
                    value={values.mensaje}
                    onChange={handleChange}
                    isInvalid={touched.mensaje && !!errors.mensaje}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mensaje}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="button-container">
                  <Button
                    variant="primary"
                    type="submit"
                    className="button-custom mt-3"
                    disabled={isSubmitting}
                  >
                    Enviar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>

        <Col md={6} className="info-container">
          <div className="social-icons">
            <a href="/*" className="social-item">
              <FaWhatsapp size={30} className="icon whatsapp-icon" />
              <span className="social-text">38145648789</span>
            </a>
            <a href="/*" className="social-item">
              <FaInstagram size={30} className="icon instagram-icon" />
              <span className="social-text">@PatasyGarras</span>
            </a>
            <a href="/*" className="social-item">
              <FaFacebook size={30} className="icon facebook-icon" />
              <span className="social-text">@PatasyGarras</span>
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
              tabIndex="0"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
