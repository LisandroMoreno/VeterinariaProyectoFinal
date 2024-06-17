import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import moment from "moment-timezone";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/CrearTurno.css";
import { titlePage } from "../helpers/titlePages";

registerLocale("es", es);

const CrearTurno = () => {
  const [formData, setFormData] = useState({
    detalleCita: "",
    veterinario: "",
    mascota: "",
    fecha: new Date(),
    hora: "",
  });

  const [veterinarios, setVeterinarios] = useState([]);
  const [fotoVet, setFotoVet] = useState("");
  const [opcionesTiempoDisponibles, setOpcionesTiempoDisponibles] = useState(
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "veterinario") {
      const selectedVet = veterinarios.find((vet) => vet.nombre === value);
      setFotoVet(selectedVet?.foto || "");
      actualizarOpcionesDisponibles(formData.fecha, value);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fecha: date,
    }));
    actualizarOpcionesDisponibles(date, formData.veterinario);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaFormateada = moment(formData.fecha)
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");

    if (!formData.hora) {
      alert("Por favor, seleccione una hora válida.");
      return;
    }

    try {
      const response = await clienteAxios.post(
        "/turnos",
        {
          ...formData,
          fecha: fechaFormateada,
        },
        config
      );
      alert("Turno creado exitosamente");
      resetForm();
    } catch (err) {
      console.error("Error al crear el turno:", err);
      alert(err.response.data.message); // Muestra el mensaje de error del backend
    }
  };

  const resetForm = () => {
    setFormData({
      detalleCita: "",
      veterinario: "",
      mascota: "",
      fecha: new Date(),
      hora: "",
    });
    setFotoVet("");
    setOpcionesTiempoDisponibles([]);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 es domingo, 6 es sábado
  };

  const actualizarOpcionesDisponibles = async (fecha, veterinario) => {
    if (!veterinario || !fecha) return;

    const fechaFormateada = moment(fecha)
      .tz("America/Argentina/Buenos_Aires")
      .format("YYYY-MM-DD");

    try {
      const response = await clienteAxios.post(
        "/turnos/disponibles",
        { fecha: fechaFormateada, veterinario },
        config
      );
      setOpcionesTiempoDisponibles(response.data);
    } catch (err) {
      console.error("Error al obtener los turnos disponibles:", err);
    }
  };

  useEffect(() => {
    titlePage("Reserva de turnos");
    const fetchVeterinarios = async () => {
      try {
        const res = await clienteAxios.get(
          "/profesionales/profesionales",
          config
        );
        setVeterinarios(res.data);
        if (res.data.length > 0) {
          actualizarOpcionesDisponibles(formData.fecha, res.data[0].nombre);
        }
      } catch (error) {
        console.error("Error al obtener veterinarios:", error);
      }
    };

    fetchVeterinarios();
  }, []);

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
              <option value="" disabled>
                Seleccione la consulta
              </option>
              {["Consulta general", "Vacunación", "Cirugías", "Curaciones"].map(
                (detalle, index) => (
                  <option key={index} value={detalle}>
                    {detalle}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="veterinario">Veterinario</label>
            <select
              name="veterinario"
              value={formData.veterinario}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione el veterinario/a
              </option>
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
              <option value="" disabled>
                Seleccione la hora
              </option>
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
