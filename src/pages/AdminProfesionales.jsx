import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";
import TablaC from "../components/TablaC";
import { Button, Modal, Spinner } from "react-bootstrap";

const AdminProfesionalesPage = () => {
  titlePage("Lista de Profesionales");
  const [profesionales, setProfesionales] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [editProf, setEditProf] = useState({
    _id: "",
    nombre: "",
    especialidad: "",
    descripcion: "",
    horario: [],
  });
  const [image, setImage] = useState(null);
  const [newProf, setNewProf] = useState({
    nombre: "",
    especialidad: "",
    descripcion: "",
    horario: [],
    image: "",
  });

  const editProfesional = (profesional) => {
    setEditProf(profesional);
    setShowEditModal(true);
  };

  const handleChangeImage = (ev) => {
    setImage(ev.target.files[0]);
  };

  const handleChangeNewImage = (ev) => {
    setNewProf({ ...newProf, image: ev.target.files[0] });
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre no debe exceder los 100 caracteres"),
    especialidad: Yup.string()
      .required("La especialidad es obligatoria")
      .min(3, "La especialidad debe tener al menos 3 caracteres")
      .max(100, "La especialidad no debe exceder los 100 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(500, "La descripción no debe exceder los 500 caracteres"),
    horario: Yup.array().of(
      Yup.object().shape({
        dia: Yup.string().required("El día es obligatorio"),
        inicio: Yup.string().required("La hora de inicio es obligatoria"),
        fin: Yup.string().required("La hora de fin es obligatoria"),
      })
    ),
    image: Yup.mixed().nullable(),
  });

  const handleClickEdit = async (values, { setSubmitting }) => {
    try {
      const updateProf = await clienteAxios.put(
        `/profesionales/${editProf._id}`,
        {
          nombre: values.nombre,
          especialidad: values.especialidad,
          descripcion: values.descripcion,
          horario: values.horario,
        },
        config
      );
      if (updateProf.status === 200 && image) {
        const formData = new FormData();
        formData.append("image", image);

        const addImageProfesional = await clienteAxios.post(
          `/profesionales/addImage/${updateProf.data.actualizarProf._id}`,
          formData,
          configImg
        );

        if (addImageProfesional.status === 200) {
          handleCloseEditModal();
          Swal.fire({
            title: "Profesional actualizado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              getProfesionalesAdmin();
            }, 1000);
          });
        }
      } else {
        handleCloseEditModal();
        Swal.fire({
          title: "Profesional actualizado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            getProfesionalesAdmin();
          }, 1000);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al actualizar el profesional",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          getProfesionalesAdmin();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateProf = async (values, { setSubmitting }) => {
    try {
      const createProfRes = await clienteAxios.post(
        "/profesionales",
        {
          nombre: values.nombre,
          especialidad: values.especialidad,
          descripcion: values.descripcion,
          horario: values.horario,
        },
        config
      );

      const profesionalId = createProfRes.data.profesionalGuardado?._id;

      if (!profesionalId) {
        throw new Error("No se pudo obtener el ID del profesional");
      }

      if (createProfRes.status === 201 && newProf.image) {
        const formData = new FormData();
        formData.append("image", newProf.image);

        const addImageProfesional = await clienteAxios.post(
          `/profesionales/addImage/${profesionalId}`,
          formData,
          configImg
        );

        if (addImageProfesional.status === 200) {
          handleCloseCreateModal();
          Swal.fire({
            title: "Profesional creado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              getProfesionalesAdmin();
            }, 1000);
          });
        }
      } else {
        handleCloseCreateModal();
        Swal.fire({
          title: "Profesional creado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            getProfesionalesAdmin();
          }, 1000);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al crear el profesional",
        text: error.message,
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          getProfesionalesAdmin();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getProfesionalesAdmin = async () => {
    try {
      const allProfesionales = await clienteAxios.get("/profesionales");
      setProfesionales(allProfesionales.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleClickDel = async (idProf) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro que quieres eliminar este profesional?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const delProf = await clienteAxios.delete(
          `/profesionales/${idProf}`,
          config
        );
        if (delProf.status === 200) {
          handleCloseEditModal();
          Swal.fire({
            title: "Profesional eliminado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              getProfesionalesAdmin();
            }, 1000);
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar el profesional",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          getProfesionalesAdmin();
        }, 1000);
      });
    }
  };

  const columns = [
    { key: "_id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "especialidad", header: "Especialidad" },
    {
      key: "image",
      header: "Imagen",
      render: (row) => <img src={row.image} alt="" width={25} />,
    },
  ];

  useEffect(() => {
    getProfesionalesAdmin();
  }, []);

  return (
    <>
      <h2 className="mt-4 text-center">Administracion de Profesionales</h2>
      <div className="d-flex justify-content-center ">
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Crear Profesional
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" role="status" className="my-4" />
          </div>
        ) : (
          <div className="table-responsive w-100 mt-3">
            <TablaC
              columns={columns}
              data={profesionales}
              handleEdit={editProfesional}
              handleDelete={handleClickDel}
            />
          </div>
        )}
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editProf}
            validationSchema={validationSchema}
            onSubmit={handleClickEdit}>
            {({ isSubmitting, values }) => (
              <Form encType="multipart/form-data">
                <div className="form-group mb-2">
                  <label htmlFor="nombre">Nombre</label>
                  <Field
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="especialidad">Especialidad</label>
                  <Field
                    type="text"
                    id="especialidad"
                    name="especialidad"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="especialidad"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="descripcion">Descripción</label>
                  <Field
                    as="textarea"
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="image">Imagen</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleChangeImage}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Horario</label>
                  <FieldArray name="horario">
                    {({ remove, push }) => (
                      <div>
                        {values.horario.length > 0 &&
                          values.horario.map((horario, index) => (
                            <div
                              className="d-flex mb-2 align-items-center"
                              key={index}>
                              <Field
                                name={`horario.${index}.dia`}
                                placeholder="Día"
                                className="form-control me-2"
                              />
                              <Field
                                name={`horario.${index}.inicio`}
                                placeholder="Inicio"
                                className="form-control me-2"
                              />
                              <Field
                                name={`horario.${index}.fin`}
                                placeholder="Fin"
                                className="form-control me-2"
                              />
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => remove(index)}>
                                X
                              </button>
                              <ErrorMessage
                                name={`horario.${index}.dia`}
                                component="div"
                                className="text-danger"
                              />
                              <ErrorMessage
                                name={`horario.${index}.inicio`}
                                component="div"
                                className="text-danger"
                              />
                              <ErrorMessage
                                name={`horario.${index}.fin`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            push({ dia: "", inicio: "", fin: "" })
                          }>
                          Agregar Horario
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={newProf}
            validationSchema={validationSchema}
            onSubmit={handleCreateProf}>
            {({ isSubmitting, values }) => (
              <Form encType="multipart/form-data">
                <div className="form-group mb-2">
                  <label htmlFor="nombre">Nombre</label>
                  <Field
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="especialidad">Especialidad</label>
                  <Field
                    type="text"
                    id="especialidad"
                    name="especialidad"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="especialidad"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="descripcion">Descripción</label>
                  <Field
                    as="textarea"
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="image">Imagen</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleChangeNewImage}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Horario</label>
                  <FieldArray name="horario">
                    {({ remove, push }) => (
                      <div>
                        {values.horario.length > 0 &&
                          values.horario.map((horario, index) => (
                            <div
                              className="d-flex mb-2 align-items-center"
                              key={index}>
                              <Field
                                name={`horario.${index}.dia`}
                                placeholder="Día"
                                className="form-control me-2"
                              />
                              <Field
                                name={`horario.${index}.inicio`}
                                placeholder="Inicio"
                                className="form-control me-2"
                              />
                              <Field
                                name={`horario.${index}.fin`}
                                placeholder="Fin"
                                className="form-control me-2"
                              />
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => remove(index)}>
                                X
                              </button>
                              <ErrorMessage
                                name={`horario.${index}.dia`}
                                component="div"
                                className="text-danger"
                              />
                              <ErrorMessage
                                name={`horario.${index}.inicio`}
                                component="div"
                                className="text-danger"
                              />
                              <ErrorMessage
                                name={`horario.${index}.fin`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          ))}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            push({ dia: "", inicio: "", fin: "" })
                          }>
                          Agregar Horario
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProfesionalesPage;
