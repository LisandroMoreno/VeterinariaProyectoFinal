import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";

const AdminPageComentarios = () => {
  titlePage("Lista de comentarios");
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPendientesComentarios = async () => {
    try {
      const response = await clienteAxios.get(
        "/comentarios/pendientes",
        config
      );
      setComentarios(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los comentarios pendientes:", error);
      setError("Error al obtener los comentarios pendientes");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendientesComentarios();
  }, []);

  const aprobarComentario = async (id) => {
    try {
      const response = await clienteAxios.patch(
        `/comentarios/${id}/aprobar`,
        {},
        config
      );
      if (response.status === 200) {
        console.log("Comentario aprobado:", response.data);
        setComentarios(
          comentarios.filter((comentario) => comentario._id !== id)
        );
      } else {
        throw new Error("Error al aprobar el comentario");
      }
    } catch (error) {
      console.error("Error al aprobar el comentario:", error);
      Swal.fire("Error", "Hubo un problema al aprobar el comentario.", "error");
    }
  };

  const rechazarComentario = async (id) => {
    try {
      const response = await clienteAxios.delete(
        `/comentarios/${id}/rechazar`,
        config
      );
      if (response.status === 200) {
        console.log("Comentario rechazado y eliminado:", response.data);
        setComentarios(
          comentarios.filter((comentario) => comentario._id !== id)
        );
      } else {
        throw new Error("Error al rechazar el comentario");
      }
    } catch (error) {
      console.error("Error al rechazar el comentario:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al rechazar el comentario.",
        "error"
      );
    }
  };

  const handleAprobarComentario = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez aprobado, el comentario será visible para todos los usuarios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aprobar",
    }).then((result) => {
      if (result.isConfirmed) {
        aprobarComentario(id);
        Swal.fire("Aprobado", "El comentario ha sido aprobado.", "success");
      }
    });
  };

  const handleRechazarComentario = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez rechazado, el comentario será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, rechazar",
    }).then((result) => {
      if (result.isConfirmed) {
        rechazarComentario(id);
        Swal.fire("Rechazado", "El comentario ha sido rechazado.", "success");
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center">Cargando comentarios pendientes...</div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Gestionar Comentarios Pendientes</h2>
      <div className="row">
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div key={comentario._id} className="col-md-4 mb-4">
              <div className="card p-3">
                <ReactStars
                  count={5}
                  value={comentario.rating}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
                <p>{comentario.comentario}</p>
                <p>
                  <small>{new Date(comentario.fecha).toLocaleString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => handleAprobarComentario(comentario._id)}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRechazarComentario(comentario._id)}
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay comentarios pendientes</p>
        )}
      </div>
    </div>
  );
};

export default AdminPageComentarios;
