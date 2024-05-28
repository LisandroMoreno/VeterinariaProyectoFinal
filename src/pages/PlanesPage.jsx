import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/PlanesPage.css";
import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Completa el campo vacío")
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    .matches(/^[a-zA-Z]+$/, "El nombre de usuario solo puede contener letras."),
  email: yup
    .string()
    .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
    .required("Completa el campo vacío"),
  asunto: yup.string().required("Selecciona un asunto"),
  mensaje: yup
    .string()
    .required("Completa el campo vacío")
    .min(10, "Mínimo 10 caracteres"),
});

const PlanesPage = () => {
  titlePage("Planes");

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
    // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
  };

  return (
    <>
      <div className="descripcion-Planes">
        <div className="Planes-container">
          <div className="Plan">
            <div className="Cuadro">
              <img
                src="./src/img/Plan1.avif"
                alt="Foto-integrante1"
                className="img-fluid"
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
                Costo Mensual: $xxxx
              </p>
              <Button variant="primary" className="button-custom mt-3">
                Adquirir
              </Button>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <img
                src="./src/img/Plan2.jpg"
                alt="Foto-integrante2"
                className="img-fluid"
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
                Costo Mensual: $xxxx
              </p>
              <Button variant="primary" className="button-custom mt-3">
                Adquirir
              </Button>
            </div>
          </div>

          <div className="Plan">
            <div className="Cuadro">
              <img
                src="./src/img/Plan3.png"
                alt="Foto-integrante3"
                className="img-fluid"
              />
            </div>
            <h5 className="NombrePlan">
              <strong>
                Plan “Adultos”
                <p>(Mascotas de más de 10 años)</p>
              </strong>
            </h5>
            <div className="PlanDescripcion">
              <p className="Descripcion">
                ● Vacunas y Desparasitación: Protege a las mascotas jóvenes
                contra enfermedades y parásitos. <br /> <br />
                ● Atención Especializada: Enfoque en la salud de órganos vitales
                y prevención de enfermedades. <br /> <br />
                ● Análisis Clínicos Regulares: Monitoreo de la función renal,
                hepática y cardíaca. <br /> <br />
                ● Descuentos en Medicamentos: Ayuda a los dueños a acceder a
                tratamientos necesarios. <br /> <br />
                Costo Mensual: $xxxx
              </p>
              <Button variant="primary" className="button-custom mt-3">
                Adquirir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="formulario-container">
        <h2>Envianos tu consulta</h2>
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
      </div>
    </>
  );
};

export default PlanesPage;
