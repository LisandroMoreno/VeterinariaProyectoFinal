import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios, { config } from "../helpers/clienteAxios";
import TablaC from "../components/TablaC";

const AdminPagePacientes = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);
  const [selectedMascotaIndex, setSelectedMascotaIndex] = useState(0);
  const [razasPorEspecie, setRazasPorEspecie] = useState([]);

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
      console.error("Error fetching data", error);
    }
  };

  const handleEdit = (paciente) => {
    setCurrentPaciente(paciente);
    setShow(true);
    setSelectedMascotaIndex(0); // Inicia editando la primera mascota por defecto
    setRazasPorEspecie(getRazasPorEspecie(paciente.mascotas[0]?.especie || ""));
  };

  const handleClose = () => {
    setShow(false);
    setCurrentPaciente(null);
    setSelectedMascotaIndex(0);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const form = event.target;
      const formData = new FormData(form);

      const datosPersonales = {
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        mail: formData.get("mail"),
        telefono: formData.get("telefono"),
      };

      const mascota = {
        _id: currentPaciente.mascotas[selectedMascotaIndex]?._id,
        nombreMascota: formData.get("nombreMascota"),
        especie: formData.get("especie"),
        raza: formData.get("raza"),
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
      console.error("Error saving paciente", error);
      Swal.fire("Error!", "Hubo un error al guardar el paciente.", "error");
    }
  };

  const handleSelectMascota = (e) => {
    const index = parseInt(e.target.value, 10);
    setSelectedMascotaIndex(index);
    setRazasPorEspecie(
      getRazasPorEspecie(currentPaciente.mascotas[index]?.especie || "")
    );
  };

  const handleSelectEspecie = (e) => {
    const especieSeleccionada = e.target.value;
    setCurrentPaciente((prevPaciente) => ({
      ...prevPaciente,
      mascotas: prevPaciente.mascotas.map((mascota, idx) =>
        idx === selectedMascotaIndex
          ? { ...mascota, especie: especieSeleccionada, raza: "" } // Reinicia la raza al cambiar especie
          : mascota
      ),
    }));
    setRazasPorEspecie(getRazasPorEspecie(especieSeleccionada));
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
        <TablaC columns={columns} data={data} handleEdit={handleEdit} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPaciente ? "Editar Paciente" : "Agregar Paciente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="idUser">
              <Form.Control
                type="hidden"
                name="idUser"
                defaultValue={currentPaciente ? currentPaciente.idUser : ""}
              />
            </Form.Group>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                defaultValue={currentPaciente ? currentPaciente.nombre : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Apellido"
                defaultValue={currentPaciente ? currentPaciente.apellido : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="mail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="Correo"
                defaultValue={currentPaciente ? currentPaciente.mail : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Teléfono"
                defaultValue={currentPaciente ? currentPaciente.telefono : ""}
                required
              />
            </Form.Group>
            {currentPaciente && currentPaciente.mascotas.length > 1 && (
              <Form.Group controlId="selectMascota">
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
                type="text"
                name="nombreMascota"
                placeholder="Nombre Mascota"
                value={
                  currentPaciente
                    ? currentPaciente.mascotas[selectedMascotaIndex]
                        ?.nombreMascota
                    : ""
                }
                onChange={(e) =>
                  setCurrentPaciente({
                    ...currentPaciente,
                    mascotas: currentPaciente.mascotas.map((mascota, idx) =>
                      idx === selectedMascotaIndex
                        ? { ...mascota, nombreMascota: e.target.value }
                        : mascota
                    ),
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="especie">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                as="select"
                name="especie"
                value={
                  currentPaciente?.mascotas[selectedMascotaIndex]?.especie || ""
                }
                onChange={handleSelectEspecie}
                required
              >
                <option value="">Seleccionar Especie</option>
                <option value="Gato">Gato</option>
                <option value="Perro">Perro</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="raza">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                as="select"
                name="raza"
                value={
                  currentPaciente?.mascotas[selectedMascotaIndex]?.raza || ""
                }
                onChange={(e) =>
                  setCurrentPaciente((prevPaciente) => ({
                    ...prevPaciente,
                    mascotas: prevPaciente.mascotas.map((mascota, idx) =>
                      idx === selectedMascotaIndex
                        ? { ...mascota, raza: e.target.value }
                        : mascota
                    ),
                  }))
                }
                required
              >
                <option value="">Seleccionar Raza</option>
                {razasPorEspecie.map((raza, index) => (
                  <option key={index} value={raza}>
                    {raza}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="mt-5">
              <Button variant="primary" type="submit" className="ml-2">
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
