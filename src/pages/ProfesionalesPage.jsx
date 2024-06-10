import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../css/ProfesionalesPage.css";
import { titlePage } from "../helpers/titlePages";
import clienteAxios from "../helpers/clienteAxios";

titlePage("Profesionales");

const ProfesionalesPage = () => {
  const token = sessionStorage.getItem("token");
  const [profesionales, setProfesionales] = useState([]);

  const getProfesionales = async () => {
    try {
      const obtenerProfesionales = await clienteAxios.get(
        "/profesionales/profesionales"
      );
      setProfesionales(obtenerProfesionales.data);
    } catch (error) {
      console.error("Error al obtener los profesionales:", error);
    }
  };

  useEffect(() => {
    getProfesionales();
  }, []);

  return (
    <>
      <div className="descripcion-Profesionales container">
        <h2 className="text-center my-4">
          Elige tu turno con nuestros veterinarios
        </h2>
        <div className="row">
          {profesionales.map((profesional) => (
            <div
              key={profesional._id}
              className="profesional col-lg-6 d-flex flex-column align-items-center"
            >
              <div className="Circulo">
                <img
                  src={profesional.foto}
                  alt={`Foto de ${profesional.nombre}`}
                  className="img-fluid"
                />
              </div>
              <div className="info-Profesional flex-grow-1 d-flex flex-column">
                <h5 className="NombreProfesional">
                  <strong>{profesional.nombre}</strong>
                </h5>
                <p>
                  <strong>Especialidad:</strong> {profesional.especialidad}
                </p>
                <div className="ProfesionalDescripcion flex-grow-1">
                  <ul className="Descripcion">
                    {profesional.descripcion
                      .split("● ")
                      .map(
                        (item, index) =>
                          item.trim() && <li key={index}>{item.trim()}</li>
                      )}
                  </ul>
                  <div className="Horario">
                    <strong>Horario:</strong>
                    <ul className="mt-4">
                      {profesional.horario.map((dia, index) => (
                        <li key={index}>
                          {dia.dia}: {dia.inicio} - {dia.fin}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link to={token ? "/Turnos" : "/login"}>
                    <Button variant="primary" className="button-custom">
                      Reservar turno
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfesionalesPage;
