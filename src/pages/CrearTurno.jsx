import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/CrearTurno.css";
import { titlePage } from "../helpers/titlePages";

registerLocale("es", es);

titlePage("Reserva de turnos");

const veterinarios = [
  { nombre: "Seleccione el veterinario", foto: "" },
  { nombre: "Dra. Maria Rodriguez", foto: "../src/img/Profesional1.jpg" },
  { nombre: "Dr. Juan Perez Torasso", foto: "../src/img/Profesional2.jpg" },
];

const detallesCita = [
  "Seleccione la consulta",
  "Consulta de rutina",
  "Vacunación",
  "Cirugía menor",
];

const generarOpcionesTiempo = () => {
  const opciones = [];
  const inicio = 9 * 60; // 9:00 AM en minutos
  const fin = 17 * 60; // 5:00 PM en minutos
  for (let i = inicio; i < fin; i += 20) {
    const horas = Math.floor(i / 60);
    const minutos = i % 60;
    const horaFormateada = `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
    opciones.push(horaFormateada);
  }
  return opciones;
};

const opcionesTiempo = generarOpcionesTiempo();

const CrearTurno = () => {
  const [formData, setFormData] = useState({
    detalleCita: "Seleccione la consulta",
    veterinario: "Seleccione el veterinario",
    mascota: "",
    fecha: new Date(),
    hora: opcionesTiempo[0],
  });

  const [fotoVet, setFotoVet] = useState("");
  const [turnosSeleccionados, setTurnosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await clienteAxios.get("/turnos", config);
        const turnos = res.data.map((turno) => turno.reservas);
        const flattenTurnos = [].concat.apply([], turnos);
        setTurnosSeleccionados(flattenTurnos);
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
      [name]: value,
    });

    if (name === "veterinario") {
      const selectedVet = veterinarios.find((vet) => vet.nombre === value);
      setFotoVet(selectedVet ? selectedVet.foto : "");
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await clienteAxios.post("/turnos", formData, config);
      setFormData({
        detalleCita: "Seleccione la consulta",
        veterinario: "Seleccione el veterinario",
        mascota: "",
        fecha: new Date(),
        hora: opcionesTiempo[0],
      });
      setFotoVet("");
      setTurnosSeleccionados([...turnosSeleccionados, formData]);
      alert("Turno creado exitosamente");
    } catch (err) {
      console.error("Error al crear el turno:", err);
      alert("Hubo un error al crear el turno");
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 es domingo, 6 es sábado
  };

  const obtenerTurnosVet = (veterinario, fecha) => {
    return turnosSeleccionados
      .filter(
        (reserva) =>
          reserva.veterinario === veterinario &&
          new Date(reserva.fecha).toDateString() ===
            new Date(fecha).toDateString()
      )
      .map((reserva) => reserva.hora);
  };

  const opcionesTiempoDisponibles = opcionesTiempo.filter(
    (hora) =>
      !obtenerTurnosVet(formData.veterinario, formData.fecha).includes(hora)
  );

  return (
    <div className="crear-turno-container">
      <h1>Agendar Turno</h1>
      <div className="veterinario-info">
        {fotoVet && (
          <img
            src={fotoVet}
            alt={formData.veterinario}
            className="veterinario-foto"
          />
        )}
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label htmlFor="detalleCita">Detalle de la Cita</label>
            <select
              name="detalleCita"
              value={formData.detalleCita}
              onChange={handleChange}
            >
              {detallesCita.map((detalle, index) => (
                <option key={index} value={detalle}>
                  {detalle}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="veterinario">Veterinario</label>
            <select
              name="veterinario"
              value={formData.veterinario}
              onChange={handleChange}
            >
              {veterinarios.map((vet) => (
                <option key={vet.nombre} value={vet.nombre}>
                  {vet.nombre}
                </option>
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
              minDate={new Date()} // Deshabilitar fechas anteriores a hoy
              filterDate={isWeekday} // Deshabilitar sábados y domingos
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <select name="hora" value={formData.hora} onChange={handleChange}>
              {opcionesTiempoDisponibles.map((hora, index) => (
                <option key={index} value={hora}>
                  {hora}
                </option>
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
