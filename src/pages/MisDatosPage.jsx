import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";
import "../css/MisDatos.css";

const MisDatosPage = () => {
  titlePage("Mis Datos");

  const id = JSON.parse(sessionStorage.getItem("id"));
  const [misDatos, setMisDatos] = useState({
    idUser: id,
    datosPersonales: {
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
    },
    mascotas: [],
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await clienteAxios.get(
          `/misDatos/${misDatos.idUser}`,
          config
        );
        if (response.data) {
          setMisDatos((prevMisDatos) => ({
            ...prevMisDatos,
            datosPersonales: response.data.datosPersonales || {
              nombre: "",
              apellido: "",
              mail: "",
              telefono: "",
            },
            mascotas: response.data.mascotas || [],
          }));
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un problema al cargar los datos personales",
          "error"
        );
      }
    };

    fetchDatos();
  }, [misDatos.idUser]);
  const handleAddMascota = () => {
    setMisDatos({
      ...misDatos,
      mascotas: [
        ...misDatos.mascotas,
        { nombreMascota: "", especie: "", raza: "" },
      ],
    });
  };

  const handleDeleteMascota = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar mascota",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const mascota = misDatos.mascotas[index];
          if (!mascota._id) {
            const newMascotas = [...misDatos.mascotas];
            newMascotas.splice(index, 1);
            setMisDatos({ ...misDatos, mascotas: newMascotas });
            Swal.fire(
              "Eliminado",
              "El formulario ha sido eliminado correctamente",
              "success"
            );
          } else {
            const response = await clienteAxios.delete(
              `/misDatos/mascota/${mascota._id}`,
              config
            );

            const newMascotas = [...misDatos.mascotas];
            newMascotas.splice(index, 1);
            setMisDatos({ ...misDatos, mascotas: newMascotas });

            Swal.fire(
              "¡Eliminado!",
              "La mascota ha sido eliminada correctamente",
              "success"
            );
          }
        } catch (error) {
          Swal.fire("Error", "Hubo un error al eliminar la mascota", error);
        }
      }
    });
  };

  const handleSubmitMisDatos = async (values) => {
    try {
      const response = await clienteAxios.put(
        `/misDatos/${misDatos.idUser}`,
        {
          ...misDatos,
          datosPersonales: values,
        },
        config
      );

      Swal.fire({
        icon: "success",
        title: "¡Datos personales guardados!",
        text: "Se han guardado exitosamente los datos personales.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar los datos personales.",
        error,
      });
    }
  };

  const handleSubmitMascota = async (index, values) => {
    try {
      const response = await clienteAxios.post(
        `/misDatos/mascota`,
        {
          idUser: misDatos.idUser,
          mascota: values,
        },
        config
      );

      const updatedMascotas = [...misDatos.mascotas];
      updatedMascotas[index] = response.data;
      setMisDatos({ ...misDatos, mascotas: updatedMascotas });

      Swal.fire({
        icon: "success",
        title: "¡Datos de la mascota guardados!",
        text: "Se han guardado exitosamente los datos de la mascota.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar los datos de la mascota.",
        error,
      });
    }
  };

  const getRazasPorEspecie = (especie) => {
    const razasGato = ["Mestizo", "Persa", "Siamés", "Maine Coon", "Bengala"];
    const razasPerro = [
      "Mestizo",
      "Labrador",
      "Pastor Alemán",
      "Bulldog",
      "Beagle",
    ];
    return especie === "Gato"
      ? razasGato
      : especie === "Perro"
      ? razasPerro
      : [];
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .required("El nombre es requerido")
      .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras."),
    apellido: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .required("El apellido es requerido")
      .matches(/^[a-zA-Z\s]+$/, "El apellido solo puede contener letras."),
    mail: Yup.string()
      .email("Email inválido")
      .required("El email es requerido")
      .max(50, "El email no puede tener más de 50 caracteres"),
    telefono: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, "Teléfono inválido")
      .min(10, "El teléfono debe tener al menos 10 caracteres")
      .max(15, "El teléfono no puede tener más de 15 caracteres")
      .required("El teléfono es requerido"),
  });

  const validationSchemaMascota = Yup.object().shape({
    nombreMascota: Yup.string()
      .required("Nombre es requerido")
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras."),
    especie: Yup.string().required("Especie es requerida"),
    raza: Yup.string().required("Raza es requerida"),
  });

  return (
    <div className="container">
      <div className="mt-4">
        <h1>Datos de tu cuenta</h1>
      </div>
      <div className="mt-4">
        <button className="btn-customMisDatos" onClick={handleAddMascota}>
          + Agregar Mascota
        </button>
      </div>

      <div className="mt-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <Formik
              initialValues={misDatos.datosPersonales}
              validationSchema={validationSchema}
              onSubmit={handleSubmitMisDatos}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="user-form">
                  <h2 className="mb-4">Datos Personales</h2>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      className={`form-control ${
                        errors.nombre && touched.nombre ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="apellido"
                      placeholder="Apellido"
                      className={`form-control ${
                        errors.apellido && touched.apellido ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="apellido"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="email"
                      name="mail"
                      placeholder="Email"
                      className={`form-control ${
                        errors.mail && touched.mail ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="mail"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="telefono"
                      placeholder="Teléfono"
                      className={`form-control ${
                        errors.telefono && touched.telefono ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="telefono"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button type="submit" className="btn-customMisDatos">
                    Guardar Datos Personales
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="row">
          {misDatos.mascotas.map((mascota, index) => (
            <div className="col-12 col-md-6" key={index}>
              <Formik
                initialValues={mascota}
                validationSchema={validationSchemaMascota}
                onSubmit={(values) => handleSubmitMascota(index, values)}
                enableReinitialize
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form className="pet-form">
                    <h2 className="mb-4">Mascota {index + 1}</h2>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="nombreMascota"
                        placeholder="Nombre Mascota"
                        className={`form-control ${
                          errors.nombreMascota && touched.nombreMascota
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="nombreMascota"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        as="select"
                        name="especie"
                        className={`form-control ${
                          errors.especie && touched.especie ? "is-invalid" : ""
                        }`}
                        onChange={(e) => {
                          setFieldValue("especie", e.target.value);
                          setFieldValue("raza", "");
                        }}
                      >
                        <option value="">Seleccionar Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                      </Field>
                      <ErrorMessage
                        name="especie"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        as="select"
                        name="raza"
                        className={`form-control ${
                          errors.raza && touched.raza ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Seleccionar Raza</option>
                        {getRazasPorEspecie(values.especie).map((raza) => (
                          <option key={raza} value={raza}>
                            {raza}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="raza"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <button type="submit" className="btn-customMisDatos">
                        Guardar Mascota
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn-customDelete mt-3"
                        onClick={() => handleDeleteMascota(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisDatosPage;
