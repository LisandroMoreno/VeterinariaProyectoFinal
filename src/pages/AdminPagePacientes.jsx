import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import clienteAxios, { config } from "../helpers/clienteAxios";
import TablaC from "../components/TablaC";
import { titlePage } from "../helpers/titlePages";

const AdminPagePacientes = () => {
  titlePage("Lista de Pacientes");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);
  const [selectedMascotaIndex, setSelectedMascotaIndex] = useState(0);
  const [razasPorEspecie, setRazasPorEspecie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentPaciente && currentPaciente.mascotas) {
      setCurrentPaciente((prevPaciente) => ({
        ...prevPaciente,
        ...currentPaciente.mascotas[selectedMascotaIndex],
      }));
    }
  }, [selectedMascotaIndex]);

  useEffect(() => {
    if (currentPaciente) {
      setRazasPorEspecie(
        getRazasPorEspecie(
          currentPaciente.mascotas[selectedMascotaIndex]?.especie || ""
        )
      );
    }
  }, [currentPaciente, selectedMascotaIndex]);

  const fetchData = async () => {
    try {
      const response = await clienteAxios.get("/misDatos", config);
      const pacientesData = response.data.map((paciente) => ({
        ...paciente.datosPersonales,
        idUser: paciente.idUser,
        mascotas: paciente.mascotas || [],
        nombreMascota: paciente.mascotas[0]?.nombreMascota || "",
        especie: paciente.mascotas[0]?.especie || "",
        raza: paciente.mascotas[0]?.raza || "",
      }));
      setData(pacientesData);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error al obtener los datos",
        error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (paciente) => {
    setCurrentPaciente(paciente);
    setShow(true);
    setSelectedMascotaIndex(0);
    setRazasPorEspecie(getRazasPorEspecie(paciente.mascotas[0]?.especie || ""));
    formik.setValues({
      nombre: paciente.nombre || "",
      apellido: paciente.apellido || "",
      mail: paciente.mail || "",
      telefono: paciente.telefono || "",
      nombreMascota: paciente.mascotas[0]?.nombreMascota || "",
      especie: paciente.mascotas[0]?.especie || "",
      raza: paciente.mascotas[0]?.raza || "",
    });
  };

  const handleClose = () => {
    setShow(false);
    setCurrentPaciente(null);
    setSelectedMascotaIndex(0);
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "Mínimo 2 caracteres")
      .max(30, "Máximo 30 caracteres")
      .matches(
        /^[a-zA-Z\s]+$/,
        "El nombre solo puede contener letras y espacios."
      ),
    apellido: Yup.string()
      .required("El apellido es obligatorio")
      .min(2, "Mínimo 2 caracteres")
      .max(30, "Máximo 30 caracteres")
      .matches(
        /^[a-zA-Z\s]+$/,
        "El apellido solo puede contener letras y espacios"
      ),
    mail: Yup.string()
      .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
      .required("El email es obligatorio")
      .min(8, "Mínimo 8 caracteres")
      .max(50, "Máximo 50 caracteres"),
    telefono: Yup.number()
      .required("El teléfono es obligatorio")
      .positive("El numero debe ser un valor positivo"),
    nombreMascota: Yup.string()
      .required("El nombre de la mascota es obligatorio")
      .min(3, "Mínimo 3 caracteres")
      .max(30, "Máximo 30 caracteres"),
    especie: Yup.string().required("La especie es obligatoria"),
    raza: Yup.string().required("La raza es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
      nombreMascota: "",
      especie: "",
      raza: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const datosPersonales = {
          nombre: values.nombre,
          apellido: values.apellido,
          mail: values.mail,
          telefono: values.telefono,
        };

        const mascota = {
          _id: currentPaciente.mascotas[selectedMascotaIndex]?._id,
          nombreMascota: values.nombreMascota,
          especie: values.especie,
          raza: values.raza,
        };

        await clienteAxios.put(
          `/misDatos/${currentPaciente.idUser}/modificar`,
          {
            datosPersonales,
            mascota,
          },
          config
        );

        handleClose();
        fetchData();
        Swal.fire("Guardado!", "El paciente ha sido guardado.", "success");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Hubo un error al guardar el paciente.",
          error,
          icon: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSelectMascota = (e) => {
    const index = parseInt(e.target.value, 10);
    setSelectedMascotaIndex(index);
    setRazasPorEspecie(
      getRazasPorEspecie(currentPaciente.mascotas[index]?.especie || "")
    );
    formik.setValues({
      ...formik.values,
      nombreMascota: currentPaciente.mascotas[index]?.nombreMascota || "",
      especie: currentPaciente.mascotas[index]?.especie || "",
      raza: currentPaciente.mascotas[index]?.raza || "",
    });
  };

  const handleSelectEspecie = (e) => {
    const especieSeleccionada = e.target.value;

    const razas = getRazasPorEspecie(especieSeleccionada);
    setRazasPorEspecie(razas);

    formik.setFieldValue("especie", especieSeleccionada);
    formik.setFieldValue("raza", "");
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
  const columns = [
    { key: "idUser", header: "ID USUARIO" },
    { key: "nombre", header: "Nombre" },
    { key: "apellido", header: "Apellido" },
    { key: "mail", header: "Correo" },
    { key: "telefono", header: "Teléfono" },
    { key: "nombreMascota", header: "Mascota" },
    { key: "especie", header: "Especie" },
    { key: "raza", header: "Raza" },
  ];

  return (
    <div>
      <h2 className="mt-3">Administrar Pacientes</h2>
      <div className="table-responsive w-100 mt-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" role="status" className="my-4" />
          </div>
        ) : (
          <TablaC columns={columns} data={data} handleEdit={handleEdit} />
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPaciente ? "Editar Paciente" : "Agregar Paciente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                minLength={2}
                maxLength={30}
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                isInvalid={formik.touched.nombre && !!formik.errors.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                minLength={2}
                maxLength={30}
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                isInvalid={formik.touched.apellido && !!formik.errors.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="mail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                minLength={8}
                maxLength={50}
                type="email"
                name="mail"
                placeholder="Correo"
                value={formik.values.mail}
                onChange={formik.handleChange}
                isInvalid={formik.touched.mail && !!formik.errors.mail}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.mail}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                placeholder="Teléfono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                isInvalid={formik.touched.telefono && !!formik.errors.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            {currentPaciente && currentPaciente.mascotas && (
              <Form.Group controlId="select-mascota">
                <Form.Label>Seleccionar Mascota</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedMascotaIndex}
                  onChange={handleSelectMascota}
                >
                  {currentPaciente.mascotas.map((mascota, index) => (
                    <option key={index} value={index}>
                      {mascota.nombreMascota}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="nombreMascota">
              <Form.Label>Nombre Mascota</Form.Label>
              <Form.Control
                minLength={3}
                maxLength={30}
                type="text"
                name="nombreMascota"
                placeholder="Nombre Mascota"
                value={formik.values.nombreMascota}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.nombreMascota && !!formik.errors.nombreMascota
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nombreMascota}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="especie">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                as="select"
                name="especie"
                value={formik.values.especie}
                onChange={(e) => {
                  handleSelectEspecie(e);
                  formik.handleChange(e);
                }}
                isInvalid={formik.touched.especie && !!formik.errors.especie}
              >
                <option value="">Selecciona una especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.especie}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="raza">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                as="select"
                name="raza"
                value={formik.values.raza}
                onChange={formik.handleChange}
                isInvalid={formik.touched.raza && !!formik.errors.raza}
              >
                <option value="">Selecciona una raza</option>
                {razasPorEspecie.map((raza) => (
                  <option key={raza} value={raza}>
                    {raza}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.raza}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="success"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPagePacientes;
