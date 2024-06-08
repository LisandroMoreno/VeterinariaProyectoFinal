import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/ProfesionalesPage.css";

const ProfesionalesPage = () => {
  const token = sessionStorage.getItem("token");

  return (
    <div className="descripcion-Profesionales">
      <div className="Profesionales-container">
        <div className="profesional">
          <div className="Circulo">
            <img
              src="../src/img/Profesional1.jpg"
              alt="Foto-integrante1"
              className="img-fluid"
            />
          </div>
          <div className="info-Profesional">
            <h5 className="NombreProfesional">
              <strong>Dra. Maria Ana Rodriguez</strong>
              <p>Tareas:</p>
            </h5>
            <div className="ProfesionalDescripcion">
              <p className="Descripcion">
                ● Examinar a los animales y comprobar su estado de salud. <br />
                <br />
                ● Diagnosticar enfermedades y establecer el mejor tratamiento.
                <br /> <br />
                ● Realizar intervenciones quirurgicos, como cirugias de
                estirilización y demas. <br /> <br />
                ● Asesorar a los propietarios de mascotas sobre nutricion y
                cuidados generales <br />
              </p>
              <Link to="/Turnos">
                <Button variant="primary" className="button-custom mt-3">
                  Reservar turno
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="profesional">
          <div className="Circulo">
            <img
              src="../src/img/Profesional2.jpg"
              alt="Foto-integrante2"
              className="img-fluid"
            />
          </div>
          <div className="info-Profesional">
            <h5 className="NombreProfesional">
              <strong>Dr. Juan Pedro Torasso</strong>
              <p>Tareas: </p>
            </h5>
            <div className="ProfesionalDescripcion">
              <p className="Descripcion">
                ● Tratar lesiones y enfermedades mediante la limpieza de
                heridas. <br /> <br />
                ● Asistir en los partos y brindar una autentica seguridad.
                <br /> <br />
                ● Realizar intervenciones en quirurgicas dentales, oftamologicas
                y ortopedicas. <br /> <br />
                ● Asesorar a los propietarios de mascotas sobre enfermedades y
                tratamientos. <br />
              </p>
              <Link to={token ? "/Turnos" : "/login"}>
                <Button variant="primary" className="button-custom mt-3">
                  Reservar turno
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesionalesPage;
