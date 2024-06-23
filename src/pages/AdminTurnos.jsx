import React, { useEffect, useState } from "react";
import TablaC from "../components/TablaC";
import "bootstrap/dist/css/bootstrap.min.css";
import clienteAxios, { config } from "../helpers/clienteAxios";
import Swal from "sweetalert2";

const AdminTurnosPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [usuarios, setUsuarios] = useState({});

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await clienteAxios.get(`/turnos/AdminTurnos/`, config);
        setTurnos(response.data);
      } catch (error) {
        console.error("Error fetching turnos:", error);
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
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
      console.error("Error deleting reserva:", error);
      Swal.fire("Error", "Hubo un problema al eliminar la reserva.", "error");
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
      idUser: turno.datosPersonales.idUser,
      nombre: `${turno.datosPersonales.nombre} ${turno.datosPersonales.apellido}`,
      telefono: `${turno.datosPersonales.telefono}`,
      detalleCita: reserva.detalleCita,
      veterinario: reserva.veterinario,
      mascota: reserva.mascota,
      fecha: new Date(reserva.fecha).toLocaleDateString(),
      hora: reserva.hora,
      _id: reserva._id,
    }))
  );

  return (
    <div className="container">
      <h1 className="mt-4">Lista de Turnos</h1>
      <div className="mt-5 table-responsive">
        <TablaC columns={columns} data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminTurnosPage;
