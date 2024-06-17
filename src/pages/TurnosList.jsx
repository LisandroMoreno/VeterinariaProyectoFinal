import React, { useEffect, useState } from "react";
import axios from "axios";
import clienteAxios, { config } from "../helpers/clienteAxios";

const TurnosList = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await clienteAxios.get("/turnos", config);
        setTurnos(response.data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div>
      <h1>Lista de Turnos</h1>
      <ul>
        {turnos.map((turno) => (
          <li key={turno._id}>
            <strong>{turno.mascota}</strong> con {turno.veterinario} el{" "}
            {new Date(turno.fecha).toLocaleDateString()} a las {turno.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnosList;
