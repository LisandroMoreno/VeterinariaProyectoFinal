import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { titlePage } from "../helpers/titlePages";
import { useEffect, useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";

const DetalleCarrito = () => {
  titlePage("Detalle de Carrito");

  const token = JSON.parse(sessionStorage.getItem("token")); // Obtén el token desde el almacenamiento de sesión
  const [carts, setCart] = useState([]); // Inicializa el estado con un array vacío

  const getAllCart = async () => {
    try {
      const getCart = await clienteAxios.get("/carritos", config);
      console.log(getCart.data.cart.products);
      setCart(getCart.data.cart.products);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
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
      console.log("Actualización de cantidad:", response.data);
      // Actualiza la cantidad en el estado carts
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
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const response = await clienteAxios.delete(`/carritos/${id}`, config);
      console.log("Producto eliminado:", response.data);
      // Actualiza el estado carts eliminando el producto
      setCart((prevCarts) =>
        prevCarts.filter((cartItem) => cartItem._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

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
                          src={
                            product.image || "https://via.placeholder.com/150"
                          }
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
              <Button className="">Pagar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetalleCarrito;
