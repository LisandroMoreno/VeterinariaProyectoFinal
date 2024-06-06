import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TurnosList = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/turnos`);
        setTurnos(response.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div>
      <h1>Lista de Turnos</h1>
      <ul>
        {turnos.map(turno => (
          <li key={turno._id}>
            <strong>{turno.mascota}</strong> con {turno.veterinario} el {new Date(turno.fecha).toLocaleDateString()} a las {turno.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnosList;