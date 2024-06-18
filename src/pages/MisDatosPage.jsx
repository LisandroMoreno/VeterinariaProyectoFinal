import { useState, useEffect } from "react";
import clienteAxios from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";

const MisDatosPage = () => {
  titlePage("Mis Datos");

  const id = JSON.parse(sessionStorage.getItem("id"));
  const [misDatos, setMisDatos] = useState({
    idUser: id,
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
  });

  const [mascotas, setMascotas] = useState([
    { nombreMascota: "", especie: "", raza: "" },
  ]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await clienteAxios.get(`/misDatos/${misDatos.idUser}`);
        if (response.data) {
          setMisDatos(response.data);
          setMascotas(response.data.mascota);
        }
      } catch (error) {
        console.error("Error al obtener los datos personales:", error);
      }
    };

    fetchDatos();
  }, [misDatos.idUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMisDatos({
      ...misDatos,
      [name]: value,
    });
  };

  const handleMascotaChange = (index, e) => {
    const { name, value } = e.target;
    const newMascotas = [...mascotas];
    newMascotas[index][name] = value;
    setMascotas(newMascotas);
  };

  const handleAddMascota = () => {
    setMascotas([...mascotas, { nombreMascota: "", especie: "", raza: "" }]);
  };

  const handleSubmitMisDatos = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(`/misDatos/${misDatos.idUser}`, {
        misDatos,
      });
      console.log("Datos personales guardados:", response.data);
    } catch (error) {
      console.error("Error al guardar los datos personales:", error);
    }
  };

  const handleSubmitMascota = async (index, e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post(`/misDatos/mascota`, {
        mascota: mascotas[index],
        idUser: misDatos.idUser,
      });
      console.log("Datos de la mascota guardados:", response.data);
    } catch (error) {
      console.error("Error al guardar los datos de la mascota:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-4">
          <h1>Datos de tu cuenta</h1>
        </div>
        <div className="mt-4">
          <button className="add-pet-button" onClick={handleAddMascota}>
            + Agregar Mascota
          </button>
        </div>

        <div className="mt-4">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmitMisDatos} className="user-form">
                <h2 className="mb-4">Datos Personales</h2>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={misDatos.nombre}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={misDatos.apellido}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="mail"
                  placeholder="Email"
                  value={misDatos.mail}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  value={misDatos.telefono}
                  onChange={handleInputChange}
                />
                <button type="submit">Guardar Cambios</button>
              </form>
            </div>

            <div className="col-12">
              {mascotas.map((mascota, index) => (
                <form
                  key={index}
                  onSubmit={(e) => handleSubmitMascota(index, e)}
                  className="pet-form"
                >
                  <h2 className="mb-4">Datos de tu Mascota</h2>
                  <input
                    type="text"
                    name="nombreMascota"
                    placeholder="Nombre"
                    value={mascota.nombreMascota}
                    onChange={(e) => handleMascotaChange(index, e)}
                  />
                  <input
                    type="text"
                    name="especie"
                    placeholder="Especie"
                    value={mascota.especie}
                    onChange={(e) => handleMascotaChange(index, e)}
                  />
                  <input
                    type="text"
                    name="raza"
                    placeholder="Raza"
                    value={mascota.raza}
                    onChange={(e) => handleMascotaChange(index, e)}
                  />
                  <div>
                    <button type="submit">Guardar Cambios</button>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MisDatosPage;
