import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrearTurno from '../pages/CrearTurno';
import TurnosList from '../pages/TurnosList';

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/turnos`);
      setTurnos(res.data);
    };
    fetchTurnos();
  }, []);

  const agregarTurno = (nuevoTurno) => {
    setTurnos([...turnos, nuevoTurno]);
  };

  const eliminarTurno = (id) => {
    setTurnos(turnos.filter((turno) => turno._id !== id));
  };

  return (
    <div className="container">
      <h1>Gestión de Turnos</h1>
      <CrearTurno agregarTurno={agregarTurno} />
      <TurnosList turnos={turnos} eliminarTurno={eliminarTurno} />
    </div>
  );
};

export default TurnosPage;