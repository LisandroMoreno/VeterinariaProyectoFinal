import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { titlePage } from "../helpers/titlePages";
import { useEffect, useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/DetalleCarrito.css";

const DetalleCarrito = () => {
  titlePage("Detalle de Carrito");

  const navigate = useNavigate();

  const [carts, setCart] = useState([]);

  const getAllCart = async () => {
    try {
      const getCart = await clienteAxios.get("/carritos", config);
      setCart(getCart.data.cart.products);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar el carrito",
        text: "Hubo un problema al obtener la información de tu carrito. Por favor, intenta nuevamente. Si el problema persiste, contacta a nuestro soporte técnico.",
        footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
      });
      registrarError("Error al obtener el carrito:", error);
    }
  };

  const handlePagar = () => {
    navigate("/*");
  };

  useEffect(() => {
    getAllCart();
  }, []);

  const actualizarCantidad = async (id, cantidad) => {
    try {
      const response = await clienteAxios.put(
        `/carritos/${id}`,
        { cantidad },
        config
      );
      setCart((prevCarts) =>
        prevCarts.map((cartItem) => {
          if (cartItem._id === id) {
            return {
              ...cartItem,
              cantidad: parseInt(cantidad),
            };
          }
          return cartItem;
        })
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la cantidad",
        text: "No se pudo actualizar la cantidad del producto. Por favor, intenta nuevamente.",
        footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
      });
      registrarError("Error al actualizar la cantidad del producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await clienteAxios.delete(`/carritos/${id}`, config);
      setCart((prevCarts) =>
        prevCarts.filter((cartItem) => cartItem._id !== id)
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar el producto",
        text: "No se pudo eliminar el producto del carrito. Por favor, intenta nuevamente.",
        footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
      });
      registrarError("Error al eliminar el producto del carrito:", error);
    }
  };

  const registrarError = (mensaje, error) => {};

  return (
    <>
      <div className="mt-3 mx-3">
        <h4>Resumen de tus productos</h4>
      </div>
      <Container className="mt-4">
        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th className="d-none d-md-table-cell">Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.image || ""}
                          alt={product.titulo}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{product.titulo}</td>
                      <td className="d-none d-md-table-cell">
                        {product.descripcion || "-"}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.cantidad || 1}
                          min="1"
                          onChange={(e) =>
                            actualizarCantidad(product._id, e.target.value)
                          }
                        />
                      </td>
                      <td>${product.precio || 0}</td>
                      <td>
                        ${(product.precio || 0) * (product.cantidad || 1)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => eliminarProducto(product._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center d-none d-md-table-cell"
                    >
                      Total
                    </td>
                    <td colSpan={2} className="d-none d-md-table-cell">
                      $
                      {carts.reduce(
                        (acc, curr) =>
                          acc + (curr.precio || 0) * (curr.cantidad || 1),
                        0
                      )}
                    </td>
                    <td
                      colSpan={3}
                      className="text-center d-table-cell d-md-none"
                    >
                      Total: $
                      {carts.reduce(
                        (acc, curr) =>
                          acc + (curr.precio || 0) * (curr.cantidad || 1),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center justify-content-md-end my-3">
              <Button className="btnForm" onClick={handlePagar}>
                Pagar
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetalleCarrito;
