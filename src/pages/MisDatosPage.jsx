import { useState, useEffect } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";
import "../css/MisDatos.css";
import { Link } from "react-router-dom";

const MisDatosPage = () => {
  titlePage("Mis Datos");

  const id = JSON.parse(sessionStorage.getItem("id"));
  const [misDatos, setMisDatos] = useState({
    idUser: id,
    datosPersonales: {
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
    },
    mascotas: [],
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await clienteAxios.get(
          `/misDatos/${misDatos.idUser}`,
          config
        );
        if (response.data) {
          setMisDatos({
            ...misDatos,
            datosPersonales: response.data.datosPersonales,
            mascotas: response.data.mascotas || [],
          });
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
      datosPersonales: {
        ...misDatos.datosPersonales,
        [name]: value,
      },
    });
  };

  const handleMascotaChange = (index, e) => {
    const { name, value } = e.target;
    const newMascotas = [...misDatos.mascotas];
    newMascotas[index][name] = value;
    setMisDatos({
      ...misDatos,
      mascotas: newMascotas,
    });
  };

  const handleAddMascota = () => {
    setMisDatos({
      ...misDatos,
      mascotas: [
        ...misDatos.mascotas,
        { nombreMascota: "", especie: "", raza: "" },
      ],
    });
  };

  const handleDeleteMascota = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar mascota",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const mascota = misDatos.mascotas[index];
          if (!mascota._id) {
            const newMascotas = [...misDatos.mascotas];
            newMascotas.splice(index, 1);
            setMisDatos({ ...misDatos, mascotas: newMascotas });
            Swal.fire(
              "Eliminado",
              "El formulario ha sido eliminado correctamente",
              "success"
            );
          } else {
            const response = await clienteAxios.delete(
              `/misDatos/mascota/${mascota._id}`,
              config
            );
            console.log("Mascota eliminada:", response.data);

            const newMascotas = [...misDatos.mascotas];
            newMascotas.splice(index, 1);
            setMisDatos({ ...misDatos, mascotas: newMascotas });

            Swal.fire(
              "¡Eliminado!",
              "La mascota ha sido eliminada correctamente",
              "success"
            );
          }
        } catch (error) {
          console.error("Error al eliminar la mascota:", error);
          Swal.fire("Error", "Hubo un error al eliminar la mascota", "error");
        }
      }
    });
  };

  const handleSubmitMisDatos = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(
        `/misDatos/${misDatos.idUser}`,

        {
          ...misDatos,
        },
        config
      );
      console.log("Datos personales guardados:", response.data);

      Swal.fire({
        icon: "success",
        title: "¡Datos personales guardados!",
        text: "Se han guardado exitosamente los datos personales.",
      });
    } catch (error) {
      console.error("Error al guardar los datos personales:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar los datos personales.",
      });
    }
  };

  const handleSubmitMascota = async (index, e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post(
        `/misDatos/mascota`,
        {
          idUser: misDatos.idUser,
          mascota: misDatos.mascotas[index],
        },
        config
      );
      console.log("Datos de la mascota guardados:", response.data);

      const updatedMascotas = [...misDatos.mascotas];
      updatedMascotas[index] = response.data;
      setMisDatos({ ...misDatos, mascotas: updatedMascotas });

      Swal.fire({
        icon: "success",
        title: "¡Datos de la mascota guardados!",
        text: "Se han guardado exitosamente los datos de la mascota.",
      });
    } catch (error) {
      console.error("Error al guardar los datos de la mascota:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar los datos de la mascota.",
      });
    }
  };

  const getRazasPorEspecie = (especie) => {
    const razasGato = ["Mestizo", "Persa", "Siamés", "Maine Coon", "Bengala"];
    const razasPerro = [
      "Mestizo",
      "Labrador",
      "Pastor Alemán",
      "Bulldog",
      "Beagle",
    ];
    return especie === "Gato"
      ? razasGato
      : especie === "Perro"
      ? razasPerro
      : [];
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h1>Datos de tu cuenta</h1>
      </div>
      <div className="mt-4">
        <button className="btn-customMisDatos" onClick={handleAddMascota}>
          + Agregar Mascota
        </button>
      </div>

      <div className="mt-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <form onSubmit={handleSubmitMisDatos} className="user-form">
              <h2 className="mb-4">Datos Personales</h2>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={misDatos.datosPersonales.nombre}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={misDatos.datosPersonales.apellido}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="email"
                name="mail"
                placeholder="Email"
                value={misDatos.datosPersonales.mail}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={misDatos.datosPersonales.telefono}
                onChange={handleInputChange}
                className="form-control mb-2"
              />
              <button type="submit" className="btn-customMisDatos mb-2">
                Guardar Cambios
              </button>
            </form>
          </div>

          {misDatos.mascotas.map((mascota, index) => (
            <div key={index} className="col-12 col-md-6">
              <form
                onSubmit={(e) => handleSubmitMascota(index, e)}
                className="pet-form"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-4">Datos de tu Mascota</h2>
                  <div className="text-end mb-4">
                    <Link onClick={() => handleDeleteMascota(index)}>
                      <i className="fa-solid fa-trash fa-lg icono-borrado"></i>
                    </Link>
                  </div>
                </div>

                <input
                  type="text"
                  name="nombreMascota"
                  placeholder="Nombre"
                  value={mascota.nombreMascota}
                  onChange={(e) => handleMascotaChange(index, e)}
                  className="form-control mb-2"
                />
                <select
                  name="especie"
                  value={mascota.especie}
                  onChange={(e) => handleMascotaChange(index, e)}
                  className="form-select mb-2"
                >
                  <option value="">Selecciona una especie</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                </select>
                <select
                  name="raza"
                  value={mascota.raza}
                  onChange={(e) => handleMascotaChange(index, e)}
                  className="form-select mb-2"
                >
                  <option value="">Selecciona una raza</option>
                  {getRazasPorEspecie(mascota.especie).map((raza, idx) => (
                    <option key={idx} value={raza}>
                      {raza}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn-customMisDatos mb-2">
                  Guardar Cambios
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisDatosPage;
