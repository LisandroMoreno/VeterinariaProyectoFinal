import React, { useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/AdminPageProfesionales.css";

const AdminPageProfesionales = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    foto: "",
    descripcion: "",
    horario: [
      { dia: "lunes", inicio: "09:00", fin: "17:00" },
      { dia: "martes", inicio: "09:00", fin: "17:00" },
      { dia: "miércoles", inicio: "09:00", fin: "17:00" },
      { dia: "jueves", inicio: "09:00", fin: "17:00" },
      { dia: "viernes", inicio: "09:00", fin: "17:00" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorario = formData.horario.map((horario, idx) => {
      if (idx === index) {
        return { ...horario, [field]: value };
      }
      return horario;
    });
    setFormData({ ...formData, horario: newHorario });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await clienteAxios.post("/profesionales", formData, config);
      console.log("Profesional creado:", res.data);
      alert("Profesional creado exitosamente");
      setFormData({
        nombre: "",
        especialidad: "",
        foto: "",
        descripcion: "",
        horario: [
          { dia: "lunes", inicio: "09:00", fin: "17:00" },
          { dia: "martes", inicio: "09:00", fin: "17:00" },
          { dia: "miércoles", inicio: "09:00", fin: "17:00" },
          { dia: "jueves", inicio: "09:00", fin: "17:00" },
          { dia: "viernes", inicio: "09:00", fin: "17:00" },
        ],
      });
    } catch (err) {
      console.error("Error al crear el profesional:", err);
      alert("Hubo un error al crear el profesional");
    }
  };

  return (
    <div className="crear-profesional-container">
      <h1>Crear Profesional</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidad">Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto">URL de la Foto</label>
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Horario de Trabajo</label>
          {formData.horario.map((horario, index) => (
            <div key={index} className="horario-item">
              <span>
                {horario.dia.charAt(0).toUpperCase() + horario.dia.slice(1)}
              </span>
              <input
                type="time"
                value={horario.inicio}
                onChange={(e) =>
                  handleHorarioChange(index, "inicio", e.target.value)
                }
                required
              />
              <input
                type="time"
                value={horario.fin}
                onChange={(e) =>
                  handleHorarioChange(index, "fin", e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <button type="submit">Crear Profesional</button>
      </form>
    </div>
  );
};

export default AdminPageProfesionales;
