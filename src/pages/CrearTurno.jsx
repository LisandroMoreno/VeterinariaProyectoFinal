import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import '../css/CrearTurno.css';

registerLocale('es', es);

const veterinarios = [
  { nombre: 'Dra. Maria Rodriguez', foto: '../src/img/Profesional1.jpg' },
  { nombre: 'Dr. Juan Perez Torasso', foto: '../src/img/Profesional2.jpg' }
];

const detallesCita = [
  'Consulta de rutina',
  'Vacunación',
  'Cirugía menor'
];

const generarOpcionesTiempo = () => {
  const opciones = [];
  const inicio = 9 * 60; // 9:00 AM en minutos
  const fin = 17 * 60; // 5:00 PM en minutos
  for (let i = inicio; i < fin; i += 20) {
    const horas = Math.floor(i / 60);
    const minutos = i % 60;
    const horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    opciones.push(horaFormateada);
  }
  return opciones;
};

const opcionesTiempo = generarOpcionesTiempo();

const CrearTurno = ({ agregarTurno }) => {
  const [formData, setFormData] = useState({
    detalleCita: detallesCita[0],
    veterinario: veterinarios[0].nombre,
    mascota: '',
    fecha: new Date(),
    hora: opcionesTiempo[0]
  });

  const [fotoVet, setFotoVet] = useState(veterinarios[0].foto);
  const [turnosSeleccionados, setTurnosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/turnos`);
        const turnos = res.data.map(turno => turno.hora);
        setTurnosSeleccionados(turnos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTurnos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'veterinario') {
      const selectedVet = veterinarios.find(vet => vet.nombre === value);
      setFotoVet(selectedVet.foto);
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/turnos`, formData);
    agregarTurno(res.data);
    setFormData({
      detalleCita: detallesCita[0],
      veterinario: veterinarios[0].nombre,
      mascota: '',
      fecha: new Date(),
      hora: opcionesTiempo[0]
    });
    setFotoVet(veterinarios[0].foto);
    setTurnosSeleccionados([...turnosSeleccionados, formData.hora]);
  } catch (err) {
    console.error('Error al crear el turno:', err);
  }
};

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 es domingo, 6 es sábado
  };

  const opcionesTiempoDisponibles = opcionesTiempo.filter(hora => !turnosSeleccionados.includes(hora));

  return (
    <div className="crear-turno-container">
      <div className="veterinario-info">
        <img src={fotoVet} alt={formData.veterinario} className="veterinario-foto" />
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label htmlFor="detalleCita">Detalle de la Cita</label>
            <select name="detalleCita" value={formData.detalleCita} onChange={handleChange}>
              {detallesCita.map((detalle, index) => (
                <option key={index} value={detalle}>{detalle}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="veterinario">Veterinario</label>
            <select name="veterinario" value={formData.veterinario} onChange={handleChange}>
              {veterinarios.map((vet) => (
                <option key={vet.nombre} value={vet.nombre}>{vet.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mascota">Mascota</label>
            <input
              type="text"
              name="mascota"
              value={formData.mascota}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <DatePicker
              selected={formData.fecha}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="date-picker"
              locale="es"
              minDate={new Date()}  // Deshabilitar fechas anteriores a hoy
              filterDate={isWeekday} // Deshabilitar sábados y domingos
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <select name="hora" value={formData.hora} onChange={handleChange}>
              {opcionesTiempoDisponibles.map((hora, index) => (
                <option key={index} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
          
          <button type="submit">Agendar</button>
        </form>
      </div>
    </div>
  );
};

export default CrearTurno;