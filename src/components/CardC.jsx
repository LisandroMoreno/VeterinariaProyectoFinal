import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/Card.css";
import clienteAxios, { config } from "../helpers/clienteAxios";

const CardC = ({
  idProd,
  titulo,
  image,
  precio,
  descripcion,
  getAllFavoritos,
}) => {
  const location = useLocation();
  const isDetalleFavorito = location.pathname.includes("detalleFavorito");

  const eliminarProducto = async (id) => {
    try {
      const response = await clienteAxios.delete(`/favoritos/${id}`, config);
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto ha sido eliminado de tus favoritos.",
      });
      getAllFavoritos();
    } catch (error) {
      mostrarError("Error al eliminar el producto de favoritos", error);
    }
  };

  const mostrarError = (titulo, error) => {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: "Hubo un problema al eliminar el producto de tus favoritos. Por favor, intenta nuevamente.",
      footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
    });
    console.error(titulo, error);
  };

  return (
    <Card className="card-vet text-center">
      <div className="card-img-top">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text>{precio}</Card.Text>
        <div>
          <a href={`/productos/${idProd}`} className="btn btn-card">
            Ver más
          </a>
          {isDetalleFavorito && (
            <Button
              onClick={() => eliminarProducto(idProd)}
              className="btn-card-borrar"
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardC;
