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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await clienteAxios.get("/misDatos", config);
      const pacientesData = response.data.map((paciente) => ({
        ...paciente,
        ...paciente.mascotas[0], 
      }));
      setData(pacientesData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleEdit = (paciente) => {
    setCurrentPaciente(paciente);
    setShow(true);
    setSelectedMascotaIndex(0); 
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

      const values = {
        idUser: formData.get("idUser"),
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        mail: formData.get("mail"),
        telefono: formData.get("telefono"),
        nombreMascota: formData.get("nombreMascota"),
        especie: formData.get("especie"),
        raza: formData.get("raza"),
      };

      if (currentPaciente) {
        
        const mascotas = currentPaciente.mascotas.map((mascota, index) => ({
          ...mascota,
          nombreMascota:
            index === selectedMascotaIndex
              ? values.nombreMascota
              : mascota.nombreMascota,
          especie:
            index === selectedMascotaIndex ? values.especie : mascota.especie,
          raza: index === selectedMascotaIndex ? values.raza : mascota.raza,
        }));

        await clienteAxios.put(`/misDatos/${currentPaciente._id}/modificar`, {
          idUser: currentPaciente.idUser,
          ...currentPaciente,
          mascotas,
        });
      } else {
        
        await clienteAxios.post(`/misDatos`, {
          idUser: values.idUser,
          ...values,
          mascotas: [
            {
              nombreMascota: values.nombreMascota,
              especie: values.especie,
              raza: values.raza,
            },
          ],
        });
      }
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
    const mascota = currentPaciente.mascotas[index];
    setCurrentPaciente((prevPaciente) => ({
      ...prevPaciente,
      nombreMascota: mascota.nombreMascota,
      especie: mascota.especie,
      raza: mascota.raza,
    }));
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
      <h1>Administrar Pacientes</h1>
      <TablaC columns={columns} data={data} handleEdit={handleEdit} />
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
                value={currentPaciente ? currentPaciente.idUser : ""}
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
              <Form.Group controlId="mascotaId">
                <Form.Label>Seleccionar Mascota</Form.Label>
                <Form.Control
                  as="select"
                  name="mascotaId"
                  onChange={handleSelectMascota}
                  value={selectedMascotaIndex}
                  required
                >
                  {currentPaciente.mascotas.map((mascota, index) => (
                    <option key={mascota._id} value={index}>
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
                value={currentPaciente ? currentPaciente.nombreMascota : ""}
                onChange={(e) =>
                  setCurrentPaciente({
                    ...currentPaciente,
                    nombreMascota: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="especie">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                name="especie"
                placeholder="Especie"
                value={currentPaciente ? currentPaciente.especie : ""}
                onChange={(e) =>
                  setCurrentPaciente({
                    ...currentPaciente,
                    especie: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="raza">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                placeholder="Raza"
                value={currentPaciente ? currentPaciente.raza : ""}
                onChange={(e) =>
                  setCurrentPaciente({
                    ...currentPaciente,
                    raza: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPagePacientes;
