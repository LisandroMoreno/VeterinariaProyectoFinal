import React from 'react'
import "../css/SobreNosotros.css"; 

const SobreNosotros = () => {
  return (
    < >
        <div className="descripcion-individual">
      {/* Contenedor principal con flexbox */}
      <div className="row integrantes-container col-8 col-md-4 col-lg-3">
        {/* Integrante 1 */}
          <div className="integrante">
            <div className="circulo">
              <img
                src="../img/Javier.png"
                alt="Foto-integrante1"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="Nombres">
              <strong>Paz, Rodrigo</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Hola, soy Javier, tengo 29 años. Soy de Jujuy, Argentina y
                estudio Ingeniería Eléctrica en la UNT junto con programación.
                Me gusta mucho la música y los videojuegos.
              </p>
            </div>
        </div>

        {/* Integrante 2 */}
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
                Hola, soy Javier, tengo 29 años. Soy de Jujuy, Argentina y
                estudio Ingeniería Eléctrica en la UNT junto con programación.
                Me gusta mucho la música y los videojuegos.
              </p>
            </div>
          </div>


        {/* Integrante 3 */}
          <div className="integrante">
            <div className="circulo">
              <img
                src="../img/Felix.png"
                alt="Foto-integrante3"
                className="img-fluid rounded-circle"
              />
            </div>
            <h5 className="Nombres">
              <strong>Moreno, Lisandro</strong>
            </h5>
            <div className="">
              <p className="Descripcion">
                Hola, soy Javier, tengo 29 años. Soy de Jujuy, Argentina y
                estudio Ingeniería Eléctrica en la UNT junto con programación.
                Me gusta mucho la música y los videojuegos.
              </p>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default SobreNosotros