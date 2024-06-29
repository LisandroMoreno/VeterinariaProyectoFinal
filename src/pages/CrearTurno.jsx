import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import moment from "moment-timezone";
import clienteAxios, { config } from "../helpers/clienteAxios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/CrearTurno.css";
import { titlePage } from "../helpers/titlePages";

registerLocale("es", es);

const CrearTurno = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [fotoVet, setFotoVet] = useState("");
  const [opcionesTiempoDisponibles, setOpcionesTiempoDisponibles] = useState(
    []
  );

  const initialValues = {
    detalleCita: "",
    veterinario: "",
    mascota: "",
    fecha: new Date(),
    hora: "",
  };

  const validationSchema = Yup.object().shape({
    detalleCita: Yup.string().required("Seleccione el detalle de la cita"),
    veterinario: Yup.string().required("Seleccione un veterinario"),
    mascota: Yup.string().required("Ingrese el nombre de la mascota"),
    fecha: Yup.date().required("Seleccione una fecha"),
    hora: Yup.string().required("Seleccione una hora"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const fechaFormateada = moment(values.fecha)
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");

    try {
      await clienteAxios.post(
        "/turnos",
        {
          ...values,
          fecha: fechaFormateada,
        },
        config
      );
      Swal.fire({
        icon: "success",
        title: "Turno creado",
        text: "Turno creado exitosamente.",
      });
      resetForm();
      setFotoVet("");
      setOpcionesTiempoDisponibles([]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const actualizarOpcionesDisponibles = async (fecha, veterinario) => {
    if (!veterinario || !fecha) return;

    const fechaFormateada = moment(fecha)
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");

    try {
      const response = await clienteAxios.post(
        "/turnos/disponibles",
        { fecha: fechaFormateada, veterinario },
        config
      );
      setOpcionesTiempoDisponibles(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los turnos disponibles.",
      });
    }
  };

  useEffect(() => {
    titlePage("Reserva de turnos");
    const fetchVeterinarios = async () => {
      try {
        const res = await clienteAxios.get("/profesionales", config);
        setVeterinarios(res.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener veterinarios.",
        });
      }
    };

    fetchVeterinarios();
  }, []);

  return (
    <div className="crear-turno-container">
      <h1>Agendar Turno</h1>
      <div className="veterinario-info">
        {fotoVet && (
          <img
            src={fotoVet}
            alt={initialValues.veterinario}
            className="veterinario-foto"
          />
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="formulario">
              <div className="form-group">
                <label htmlFor="detalleCita">Detalle de la Cita</label>
                <Field
                  as="select"
                  name="detalleCita"
                  className={`form-control ${
                    touched.detalleCita && errors.detalleCita
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="" disabled>
                    Seleccione la consulta
                  </option>
                  {[
                    "Consulta general",
                    "Vacunación",
                    "Cirugías",
                    "Curaciones",
                  ].map((detalle, index) => (
                    <option key={index} value={detalle}>
                      {detalle}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="detalleCita"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="veterinario">Veterinario</label>
                <Field
                  as="select"
                  name="veterinario"
                  className={`form-control ${
                    touched.veterinario && errors.veterinario
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFieldValue("veterinario", value);
                    const selectedVet = veterinarios.find(
                      (vet) => vet.nombre === value
                    );
                    setFotoVet(selectedVet?.foto || "");
                    actualizarOpcionesDisponibles(values.fecha, value);
                  }}
                >
                  <option value="" disabled>
                    Seleccione el veterinario/a
                  </option>
                  {veterinarios.map((vet) => (
                    <option key={vet.nombre} value={vet.nombre}>
                      {vet.nombre}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="veterinario"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mascota">Mascota</label>
                <Field
                  type="text"
                  name="mascota"
                  className={`form-control ${
                    touched.mascota && errors.mascota ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="mascota"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <DatePicker
                  selected={values.fecha}
                  onChange={(date) => {
                    setFieldValue("fecha", date);
                    actualizarOpcionesDisponibles(date, values.veterinario);
                  }}
                  dateFormat="yyyy-MM-dd"
                  className={`form-control ${
                    touched.fecha && errors.fecha ? "is-invalid" : ""
                  }`}
                  locale="es"
                  minDate={new Date()}
                  filterDate={isWeekday}
                />
                <ErrorMessage
                  name="fecha"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <Field
                  as="select"
                  name="hora"
                  className={`form-control ${
                    touched.hora && errors.hora ? "is-invalid" : ""
                  }`}
                >
                  <option value="" disabled>
                    Seleccione la hora
                  </option>
                  {opcionesTiempoDisponibles.map((hora, index) => (
                    <option key={index} value={hora}>
                      {hora}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="hora"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <button type="submit">Agendar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CrearTurno;
