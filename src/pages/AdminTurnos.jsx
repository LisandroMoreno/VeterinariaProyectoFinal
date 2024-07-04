import React, { useEffect, useState } from "react";
import TablaC from "../components/TablaC";
import "bootstrap/dist/css/bootstrap.min.css";
import clienteAxios, { config } from "../helpers/clienteAxios";
import Swal from "sweetalert2";
import { titlePage } from "../helpers/titlePages";
import Spinner from "react-bootstrap/Spinner";

const AdminTurnosPage = () => {
  titlePage("Lista de Turnos");
  const [turnos, setTurnos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTurnos = async () => {
      setIsLoading(true);
      try {
        const response = await clienteAxios.get(`/turnos/AdminTurnos`, config);
        setTurnos(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al obtener turnos",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTurnos();
  }, []);

  const handleDelete = async (idReserva) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        await clienteAxios.delete(`/turnos/AdminTurnos/${idReserva}`, config);
        setTurnos((prevTurnos) =>
          prevTurnos.map((turno) => ({
            ...turno,
            reservas: turno.reservas.filter(
              (reserva) => reserva._id !== idReserva
            ),
          }))
        );

        Swal.fire("Eliminado!", "La reserva ha sido eliminada.", "success");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar la reserva.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: "idUser", header: "ID Usuario" },
    { key: "nombre", header: "Nombre" },
    { key: "telefono", header: "Telefono" },
    { key: "detalleCita", header: "Detalle de la Cita" },
    { key: "veterinario", header: "Veterinario" },
    { key: "mascota", header: "Mascota" },
    { key: "fecha", header: "Fecha" },
    { key: "hora", header: "Hora" },
  ];

  const data = turnos.flatMap((turno) =>
    turno.reservas.map((reserva) => ({
      idUser: turno.idUser || "sin datos",
      nombre: turno.datosPersonales
        ? `${turno.datosPersonales.nombre || "sin datos"} ${
            turno.datosPersonales.apellido || ""
          }`
        : "sin datos",
      telefono: turno.datosPersonales?.telefono || "sin datos",
      detalleCita: reserva.detalleCita || "sin datos",
      veterinario: reserva.veterinario || "sin datos",
      mascota: reserva.mascota || "sin datos",
      fecha: new Date(reserva.fecha).toISOString().slice(0, 10),
      hora: reserva.hora || "sin datos",
      _id: reserva._id,
    }))
  );

  return (
    <div className="container">
      <h1 className="mt-4">Lista de Turnos</h1>
      <div className="mt-5 table-responsive">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" role="status" className="my-4" />
          </div>
        ) : (
          <TablaC columns={columns} data={data} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default AdminTurnosPage;
