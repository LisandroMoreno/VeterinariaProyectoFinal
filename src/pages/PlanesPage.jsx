import React from "react";
import "../css/PlanesPage.css";

const PlanesPage = () => {
  return (
    <>
      <div className="descripcion-Planes">
        <div className="Planes-container">
          <div className="Plan">
            <div className="circulo">
              <img
                src="./src/img/Rodrigo.jpg"
                alt="Foto-integrante1"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="NombrePlan">
              <strong>Plan Básico</strong>
            </h5>
            <div className="Plan">
              <p className="Descripcion">
                Consultas veterinarias: 2 consultas anuales gratuitas Vacunas
                básicas: Incluye vacunas contra la rabia, parvovirus, y
                distemper Desparasitaciones: 2 desparasitaciones anuales
                Revisión dental: 1 revisión anual Descuento en medicamentos: 10%
                de descuento en medicamentos y tratamientos adicionales Asesoría
                telefónica: 24/7 para emergencias y consultas básicas
              </p>
            </div>
          </div>

          <div className="Plan">
            <div className="circulo">
              <img
                src="./src/img/Jose.png"
                alt="Foto-integrante2"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="NombrePlan">
              <strong>Plan Intermedio</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Consultas veterinarias: 4 consultas anuales gratuitas Vacunas
                completas: Incluye todas las vacunas del plan básico más vacunas
                contra leptospirosis, bordetella, y hepatitis Desparasitaciones:
                4 desparasitaciones anuales Revisión dental: 2 revisiones
                anuales, incluyendo limpieza Análisis de laboratorio: 2 análisis
                completos al año (sangre, orina, etc.) Descuento en
                medicamentos: 20% de descuento en medicamentos y tratamientos
                adicionales Asesoría telefónica: 24/7 para emergencias y
                consultas avanzadas
              </p>
            </div>
          </div>

          <div className="Plan">
            <div className="circulo">
              <img
                src="./src/img/Lisandro.jpg"
                alt="Foto-integrante3"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="NombrePlan">
              <strong>Plan Premium</strong>
            </h5>
            <div className="Plan">
              <p className="Descripcion">
                Consultas veterinarias: Consultas ilimitadas Vacunas completas:
                Incluye todas las vacunas necesarias según la especie y edad de
                la mascota Desparasitaciones: Desparasitaciones ilimitadas
                Revisión dental: Revisiones y limpiezas dentales ilimitadas
                Análisis de laboratorio: Análisis completos ilimitados (sangre,
                orina, etc.) Tratamientos preventivos: Incluye tratamiento para
                pulgas, garrapatas, y enfermedades del corazón Cirugías menores:
                Cobertura de cirugías menores (hasta un límite anual de $1,000)
                Hospitalización: Cobertura de hospitalización (hasta un límite
                anual de $2,500) Descuento en medicamentos: 30% de descuento en
                medicamentos y tratamientos adicionales Asesoría telefónica:
                24/7 para emergencias y consultas completas
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanesPage;
