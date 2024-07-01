/* import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../css/PlanesPage.css";
import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ImageC from "../components/ImageC";

titlePage("Planes");

const validationSchema = yup.object().shape({
  nombre: yup
  .string()
  .required("Completa el campo vacío")
  .min(2, "Mínimo 2 caracteres")
  .max(50, "Máximo 50 caracteres")
  .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras."),
  email: yup
    .string()
    .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
    .required("Completa el campo vacío"),
  asunto: yup.string().required("Selecciona un asunto"),
  mensaje: yup
    .string()
    .required("Completa el campo vacío")
    .min(10, "Mínimo 10 caracteres")
    .max(500, "Máximo 500 caracteres"),
});

const PlanesPage = () => {
  titlePage("Planes");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:3001/api/planes/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setAlertMessage("Consulta enviada correctamente.");
        setAlertVariant("success");
        actions.resetForm();
      } else {
        setAlertMessage("Error al enviar la consulta");
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage("Error al enviar la consulta");
      setAlertVariant("danger");
    }

    setShowAlert(true);
    actions.setSubmitting(false);

    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <div className="descripcion-Planes">
        <div className="Planes-container">
          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667564/Plan1_e3jth6.avif"
                alternativo="Logo Plan inicial"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>Plan “Primeros Pasos”</strong>
              <p>(Mascotas de 0 a 5 años)</p>
            </h5>

            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Consultas Preventivas: Exámenes médicos regulares para
                detectar problemas de salud temprano. <br /> <br />
                ● Vacunas y Desparasitación: Protege a las mascotas jóvenes
                contra enfermedades y parásitos. <br /> <br />
                ● Asesoramiento Nutricional: Recomendaciones personalizadas para
                una dieta saludable. <br /> <br />
                ● Descuentos en Productos: Ofertas especiales en alimentos,
                juguetes y accesorios. <br /> <br />
                Costo Mensual: $3.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667565/Plan2_oxqskf.jpg"
                alternativo="Logo Plan Madurando"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>
                Plan “Madurando”
                <p>(Mascotas de 5 a 10 años)</p>
              </strong>
            </h5>
            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Vacunas y Desparasitación: Protege a las mascotas jóvenes
                contra enfermedades y parásitos. <br /> <br />
                ● Control Geriátrico: Evaluaciones específicas para detectar
                problemas relacionados con la edad. <br /> <br />
                ● Tratamientos Crónicos: Manejo de enfermedades crónicas como la
                artritis o la diabetes. <br /> <br />
                ● Descuentos en Cirugías Electivas: Beneficios para
                procedimientos como la esterilización. <br /> <br />
                Costo Mensual: $5.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667565/Plan3_tist0s.png"
                alternativo="Logo Plan Adulto"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>
                Plan “Adultos”
                <p>(Mascotas de 10 años)</p>
              </strong>
            </h5>
            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Vacunas y Desparasitación: Protege a las mascotas adultas
                contra enfermedades y parásitos. <br /> <br />
                ● Atención Especializada: Enfoque en la salud de órganos vitales
                y prevención de enfermedades. <br /> <br />
                ● Análisis Clínicos Regulares: Monitoreo de la función renal,
                hepática y cardíaca. <br /> <br />
                ● Descuentos en Medicamentos: Ayuda a los dueños a acceder a
                tratamientos necesarios. <br /> <br />
                Costo Mensual: $7.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="formulario-container">
        <h2>Envianos tu consulta</h2>
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
          initialValues={{ nombre: "", email: "", asunto: "", mensaje: "" }}
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
                  minLength={2}
                  maxLength={50}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
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
                  maxLength={50}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Asunto</Form.Label>
                <Form.Select
                  name="asunto"
                  value={values.asunto}
                  onChange={handleChange}
                  isInvalid={touched.asunto && !!errors.asunto}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Primeros Pasos">Plan "Primeros pasos"</option>
                  <option value="Madurando">Plan "Madurando"</option>
                  <option value="Adultos">Plan "Adultos"</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.asunto}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Escribe tu mensaje"
                  name="mensaje"
                  value={values.mensaje}
                  onChange={handleChange}
                  isInvalid={touched.mensaje && !!errors.mensaje}
                  minLength={10}
                  maxLength={500}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mensaje}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="button-custom"
              >
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PlanesPage;
 */

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../css/PlanesPage.css";
import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ImageC from "../components/ImageC";

titlePage("Planes");

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Completa el campo vacío")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras."),
  email: yup
    .string()
    .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
    .required("Completa el campo vacío"),
  asunto: yup.string().required("Selecciona un asunto"),
  mensaje: yup
    .string()
    .required("Completa el campo vacío")
    .min(10, "Mínimo 10 caracteres")
    .max(500, "Máximo 500 caracteres"),
});

const PlanesPage = () => {
  titlePage("Planes");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:3001/api/planes/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setAlertMessage("Consulta enviada correctamente.");
        setAlertVariant("success");
        actions.resetForm();
      } else {
        setAlertMessage("Error al enviar la consulta");
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage("Error al enviar la consulta");
      setAlertVariant("danger");
    }

    setShowAlert(true);
    actions.setSubmitting(false);

    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <div className="descripcion-Planes">
        <div className="Planes-container">
          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667564/Plan1_e3jth6.avif"
                alternativo="Logo Plan inicial"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>Plan “Primeros Pasos”</strong>
              <p>(Mascotas de 0 a 5 años)</p>
            </h5>

            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Consultas Preventivas: Exámenes médicos regulares para
                detectar problemas de salud temprano. <br /> <br />
                ● Vacunas y Desparasitación: Protege a las mascotas jóvenes
                contra enfermedades y parásitos. <br /> <br />
                ● Asesoramiento Nutricional: Recomendaciones personalizadas para
                una dieta saludable. <br /> <br />
                ● Descuentos en Productos: Ofertas especiales en alimentos,
                juguetes y accesorios. <br /> <br />
                Costo Mensual: $3.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667565/Plan2_oxqskf.jpg"
                alternativo="Logo Plan Madurando"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>
                Plan “Madurando”
                <p>(Mascotas de 5 a 10 años)</p>
              </strong>
            </h5>
            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Vacunas y Desparasitación: Protege a las mascotas jóvenes
                contra enfermedades y parásitos. <br /> <br />
                ● Control Geriátrico: Evaluaciones específicas para detectar
                problemas relacionados con la edad. <br /> <br />
                ● Tratamientos Crónicos: Manejo de enfermedades crónicas como la
                artritis o la diabetes. <br /> <br />
                ● Descuentos en Cirugías Electivas: Beneficios para
                procedimientos como la esterilización. <br /> <br />
                Costo Mensual: $5.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <ImageC
                urlImagen="https://res.cloudinary.com/duexhxoyy/image/upload/v1719667565/Plan3_tist0s.png"
                alternativo="Logo Plan Adulto"
                ancho={"100%"}
              />
            </div>
            <h5 className="NombrePlan">
              <strong>
                Plan “Adultos”
                <p>(Mascotas de 10 años)</p>
              </strong>
            </h5>
            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Vacunas y Desparasitación: Protege a las mascotas adultas
                contra enfermedades y parásitos. <br /> <br />
                ● Atención Especializada: Enfoque en la salud de órganos vitales
                y prevención de enfermedades. <br /> <br />
                ● Análisis Clínicos Regulares: Monitoreo de la función renal,
                hepática y cardíaca. <br /> <br />
                ● Descuentos en Medicamentos: Ayuda a los dueños a acceder a
                tratamientos necesarios. <br /> <br />
                Costo Mensual: $7.000
              </p>
              <Link to="/*">
                <Button variant="primary" className="button-custom mt-3">
                  Adquirir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="formulario-container">
        <h2>Envianos tu consulta</h2>
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
          initialValues={{ nombre: "", email: "", asunto: "", mensaje: "" }}
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
                  minLength={2}
                  maxLength={50}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
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
                  maxLength={50}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Asunto</Form.Label>
                <Form.Select
                  name="asunto"
                  value={values.asunto}
                  onChange={handleChange}
                  isInvalid={touched.asunto && !!errors.asunto}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Primeros Pasos">Plan "Primeros pasos"</option>
                  <option value="Madurando">Plan "Madurando"</option>
                  <option value="Adultos">Plan "Adultos"</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.asunto}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Escribe tu mensaje"
                  name="mensaje"
                  value={values.mensaje}
                  onChange={handleChange}
                  isInvalid={touched.mensaje && !!errors.mensaje}
                  minLength={10}
                  maxLength={500}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mensaje}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="button-container">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="button-custom"
                >
                  Enviar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PlanesPage;
