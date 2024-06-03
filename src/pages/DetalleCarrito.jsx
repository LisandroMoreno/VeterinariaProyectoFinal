import { Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { titlePage } from "../helpers/titlePages";
import { useEffect, useState } from "react";
import clienteAxios, { config } from "../helpers/clienteAxios";

const DetalleCarrito = () => {
  titlePage("Detalle de Carrito");

  const token = JSON.parse(sessionStorage.getItem("token")); // Obtén el token desde el almacenamiento de sesión
  const [carts, setCart] = useState([]); // Inicializa el estado con un array vacío

  const getAllCart = async () => {
    const getCart = await clienteAxios.get("/carritos", config);
    console.log(getCart.data.carrito.products);
    setCart(getCart.data.carrito.products);
  };
  useEffect(() => {
    getAllCart();
  }, []);
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
                    <th className="d-none d-md-table-cell">Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Foto</td>
                    <td>Comida de adulto</td>
                    <td className="d-none d-md-table-cell">RAZA</td>
                    <td>2</td>
                    <td>100</td>
                    <td>
                      <Button variant="danger">
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center d-none d-md-table-cell"
                    >
                      Total
                    </td>
                    <td colSpan={2} className="d-none d-md-table-cell">
                      300
                    </td>
                    <td
                      colSpan={4}
                      className="text-center d-table-cell d-md-none"
                    >
                      Total: 300
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
