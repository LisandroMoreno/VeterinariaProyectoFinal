import React from "react";
import "../css/SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <div>
      <div className="video-container">
        <iframe
          width="600"
          height="500"
          src="https://www.youtube.com/embed/3tlwxbX1x_o?si=uEyGri-4p1yLmqth"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="descripcion-general">
        <h1>
          <strong>Quienes somos</strong>
        </h1>
        <h4>
          En Veterinaria Patas y garras, nuestra pasión es el bienestar de tus
          queridas mascotas. Somos un equipo dedicado de profesionales
          apasionados por la salud y felicidad de los animales. Desde los
          traviesos cachorros hasta los leales compañeros de vida, estamos aquí
          para brindarles la mejor atención posible. Desde la selección
          meticulosa de tratamientos hasta la atención personalizada, trabajamos
          incansablemente para que cada visita a Veterinaria Patas y garras sea
          memorable y gratificante. Tu confianza en nosotros es nuestra mayor
          recompensa. <br />
          <br />
          🐾 ¡Confía en nosotros para cuidar a tus peludos amigos como si fueran
          parte de nuestra propia familia! 🐾 <br />
        </h4>
      </div>

      <div className="descripcion-individual">
        <div className="integrantes-container">
          <div className="integrante">
            <div className="circulo">
              <img
                src="./src/img/Rodrigo.jpg"
                alt="Foto-integrante1"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="Nombres">
              <strong>Paz, Rodrigo</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Hola, soy Rodrigo, tengo 23 años, padre de 3 gatos y una
                tortuga. Cursando la carrera de programación en UTN.
              </p>
            </div>
          </div>

          <div className="integrante">
            <div className="circulo">
              <img
                src="./src/img/Jose.png"
                alt="Foto-integrante2"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="Nombres">
              <strong>Fe, Jose Martin</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Hola, Mi nombre es Jose Martin Fe, tengo 27 años, soy padre de
                familia con una hermosa hija. Mi objetivo es lograr desarrollar
                y adquirir nuevos conocimientos en el ámbito de la programación.
              </p>
            </div>
          </div>

          <div className="integrante">
            <div className="circulo">
              <img
                src="./src/img/Lisandro.jpg"
                alt="Foto-integrante3"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="Nombres">
              <strong>Moreno, Lisandro</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Soy Lisandro Moreno, tengo 27 años. Actualmente estoy estudiando
                programación en rolling code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
