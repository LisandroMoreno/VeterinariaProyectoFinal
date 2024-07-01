/* import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Pagination } from "react-bootstrap";
import "../css/ProfesionalesPage.css";
import { titlePage } from "../helpers/titlePages";
import clienteAxios from "../helpers/clienteAxios";
import ReactStars from "react-rating-stars-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ProfesionalesPage = () => {
  const token = sessionStorage.getItem("token");
  const [profesionales, setProfesionales] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProfesionales = async () => {
    try {
      const obtenerProfesionales = await clienteAxios.get("/profesionales");
      setProfesionales(obtenerProfesionales.data);
    } catch (error) {
      console.error("Error al obtener los profesionales:", error);
    }
  };

  const getComentarios = async (page = 1) => {
    try {
      const response = await clienteAxios.get("/comentarios", {
        params: { page, limit: 9 },
      });
      setComentarios(response.data.comentarios);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comentario: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "La calificación debe ser al menos 1")
        .max(5, "La calificación debe ser como máximo 5")
        .required("La calificación es obligatoria"),
      comentario: Yup.string()
        .min(10, "El comentario debe tener al menos 10 caracteres")
        .max(500, "El comentario puede tener hasta 500 caracteres")
        .required("El comentario es obligatorio"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await clienteAxios.post("/comentarios", {
          usuario: "Nombre del Usuario",
          rating: values.rating,
          comentario: values.comentario,
        });

        console.log("Comentario enviado:", response.data);

        resetForm();
        getComentarios(currentPage);

        Swal.fire({
          title: "Comentario enviado",
          text: "Su comentario será revisado y publicado en 24 horas.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
      }
    },
  });

  useEffect(() => {
    titlePage("Profesionales");
    getProfesionales();
    getComentarios();
  }, []);

  return (
    <>
      <div className="descripcion-Profesionales container">
        <h2 className="text-center my-4">
          Elige tu turno con nuestros veterinarios
        </h2>
        <div className="row">
          {profesionales.map((profesional) => (
            <div
              key={profesional._id}
              className="profesional col-lg-6 d-flex flex-column align-items-center"
            >
              <div className="Circulo">
                <img
                  src={profesional.foto}
                  alt={`Foto de ${profesional.nombre}`}
                  className="img-fluid"
                />
              </div>
              <div className="info-Profesional flex-grow-1 d-flex flex-column">
                <h5 className="NombreProfesional">
                  <strong>{profesional.nombre}</strong>
                </h5>
                <p>
                  <strong>Especialidad:</strong> {profesional.especialidad}
                </p>
                <div className="ProfesionalDescripcion flex-grow-1">
                  <ul className="Descripcion">
                    {profesional.descripcion
                      .split("● ")
                      .map(
                        (item, index) =>
                          item.trim() && <li key={index}>{item.trim()}</li>
                      )}
                  </ul>
                  <div className="Horario">
                    <strong>Horario:</strong>
                    <ul className="mt-4">
                      {profesional.horario.map((dia, index) => (
                        <li key={index}>
                          {dia.dia}: {dia.inicio} - {dia.fin}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to={token ? "/Turnos" : "/login"}>
                    <Button variant="primary" className="button-custom">
                      Reservar turno
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reseñas container mt-5">
        <h3 className="text-center">Reseñas de nuestros clientes</h3>
        <div className="row">
          {comentarios.length > 0 ? (
            comentarios.map((comentario) => (
              <div key={comentario._id} className="col-md-4">
                <div className="resena">
                  <ReactStars
                    count={5}
                    value={comentario.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p>{comentario.comentario}</p>
                  <p>
                    <small>{new Date(comentario.fecha).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay reseñas disponibles</p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination size="sm">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => getComentarios(index + 1)}
                linkClassName="custom-pagination-item"
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <div className="comentarios container mt-5">
        <h3 className="text-center">Deja tu reseña</h3>
        {token ? (
          <div className="row">
            <div className="col-12">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="rating">
                  <Form.Label>Calificación</Form.Label>
                  <div>
                    <ReactStars
                      count={5}
                      onChange={(newRating) =>
                        formik.setFieldValue("rating", newRating)
                      }
                      size={40}
                      activeColor="#ffd700"
                    />
                    {formik.touched.rating && formik.errors.rating ? (
                      <div className="text-danger">{formik.errors.rating}</div>
                    ) : null}
                  </div>
                </Form.Group>
                <Form.Group controlId="comentario">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formik.values.comentario}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Escribe tu comentario aquí..."
                  />
                  {formik.touched.comentario && formik.errors.comentario ? (
                    <div className="text-danger">
                      {formik.errors.comentario}
                    </div>
                  ) : null}
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="button-custom"
                    type="submit"
                  >
                    Enviar comentario
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">
            Necesitas estar <Link to="/login">logueado</Link> para poder dejar
            una reseña.
          </p>
        )}
      </div>
    </>
  );
};

export default ProfesionalesPage;
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Pagination } from "react-bootstrap";
import "../css/ProfesionalesPage.css";
import { titlePage } from "../helpers/titlePages";
import clienteAxios from "../helpers/clienteAxios";
import ReactStars from "react-rating-stars-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ProfesionalesPage = () => {
  const token = sessionStorage.getItem("token");
  const [profesionales, setProfesionales] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProfesionales = async () => {
    try {
      const obtenerProfesionales = await clienteAxios.get("/profesionales");
      setProfesionales(obtenerProfesionales.data);
    } catch (error) {
      console.error("Error al obtener los profesionales:", error);
    }
  };

  const getComentarios = async (page = 1) => {
    try {
      const response = await clienteAxios.get("/comentarios", {
        params: { page, limit: 9 },
      });
      setComentarios(response.data.comentarios);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comentario: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "La calificación debe ser al menos 1")
        .max(5, "La calificación debe ser como máximo 5")
        .required("La calificación es obligatoria"),
      comentario: Yup.string()
        .min(10, "El comentario debe tener al menos 10 caracteres")
        .max(500, "El comentario puede tener hasta 500 caracteres")
        .required("El comentario es obligatorio"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await clienteAxios.post("/comentarios", {
          usuario: "Nombre del Usuario",
          rating: values.rating,
          comentario: values.comentario,
        });

        console.log("Comentario enviado:", response.data);

        resetForm();
        getComentarios(currentPage);

        Swal.fire({
          title: "Comentario enviado",
          text: "Su comentario será revisado y publicado en 24 horas.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
      }
    },
  });

  useEffect(() => {
    titlePage("Profesionales");
    getProfesionales();
    getComentarios();
  }, []);

  return (
    <>
      <div className="descripcion-Profesionales container">
        <h2 className="text-center my-4">
          Elige tu turno con nuestros veterinarios
        </h2>
        <div className="row">
          {profesionales.map((profesional) => (
            <div
              key={profesional._id}
              className="profesional col-lg-6 d-flex flex-column align-items-center"
            >
              <div className="Circulo">
                <img
                  src={profesional.foto}
                  alt={`Foto de ${profesional.nombre}`}
                  className="img-fluid"
                />
              </div>
              <div className="info-Profesional flex-grow-1 d-flex flex-column">
                <h5 className="NombreProfesional">
                  <strong>{profesional.nombre}</strong>
                </h5>
                <p>
                  <strong>Especialidad:</strong> {profesional.especialidad}
                </p>
                <div className="ProfesionalDescripcion flex-grow-1">
                  <ul className="Descripcion">
                    {profesional.descripcion
                      .split("● ")
                      .map(
                        (item, index) =>
                          item.trim() && <li key={index}>{item.trim()}</li>
                      )}
                  </ul>
                  <div className="Horario">
                    <strong>Horario:</strong>
                    <ul className="mt-4">
                      {profesional.horario.map((dia, index) => (
                        <li key={index}>
                          {dia.dia}: {dia.inicio} - {dia.fin}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to={token ? "/Turnos" : "/login"}>
                    <Button variant="primary" className="button-custom">
                      Reservar turno
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reseñas container mt-5">
        <h3 className="text-center">Reseñas de nuestros clientes</h3>
        <div className="row">
          {comentarios.length > 0 ? (
            comentarios.map((comentario) => (
              <div key={comentario._id} className="col-md-4">
                <div className="resena">
                  <ReactStars
                    count={5}
                    value={comentario.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p>{comentario.comentario}</p>
                  <p>
                    <small>{new Date(comentario.fecha).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay reseñas disponibles</p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination size="sm">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => getComentarios(index + 1)}
                linkClassName="custom-pagination-item"
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <div className="comentarios container mt-5">
        <h3 className="text-center">Deja tu reseña</h3>
        {token ? (
          <div className="row">
            <div className="col-12">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="rating">
                  <Form.Label>Calificación</Form.Label>
                  <div>
                    <ReactStars
                      count={5}
                      onChange={(newRating) =>
                        formik.setFieldValue("rating", newRating)
                      }
                      size={40}
                      activeColor="#ffd700"
                    />
                    {formik.touched.rating && formik.errors.rating ? (
                      <div className="text-danger">{formik.errors.rating}</div>
                    ) : null}
                  </div>
                </Form.Group>
                <Form.Group controlId="comentario">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formik.values.comentario}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Escribe tu comentario aquí..."
                    className={
                      formik.submitCount > 0 && formik.errors.comentario
                        ? "is-invalid"
                        : ""
                    }
                  />
                  {formik.submitCount > 0 && formik.errors.comentario ? (
                    <div className="text-danger">
                      {formik.errors.comentario}
                    </div>
                  ) : null}
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="button-custom"
                    type="submit"
                  >
                    Enviar comentario
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">
            Necesitas estar <Link to="/login">logueado</Link> para poder dejar
            una reseña.
          </p>
        )}
      </div>
    </>
  );
};

export default ProfesionalesPage;

