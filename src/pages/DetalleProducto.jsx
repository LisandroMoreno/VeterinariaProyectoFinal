import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { titlePage } from "../helpers/titlePages";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios, { config } from "../helpers/clienteAxios";
import ImageC from "../components/ImageC";
import "../css/DetalleProducto.css";

const DetalleProducto = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(0);

  const obtenerProducto = async () => {
    try {
      const response = await clienteAxios.get(`/productos/${params.id}`);
      setProduct(response.data.product);
      setPrecioTotal(response.data.product.precio);
      titlePage(`${response.data.product.titulo}`);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, [params.id]);

  const actualizarCantidad = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    setCantidad(nuevaCantidad);
    setPrecioTotal(nuevaCantidad * product.precio);
  };

  const agregarFavoritos = () => {
    // Lógica para agregar a favoritos
    console.log("Agregado a favoritos:", product.titulo);
  };

  const agregarCarrito = async (req, res) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      try {
        const agregarProducto = await clienteAxios.post(
          `/carritos/${params.id}`,
          {},
          config
        );
        console.log(agregarProducto);

        switch (agregarProducto.status) {
          case 200:
            alert("Producto enviado a Carrito");
            break;
          case 422:
            alert("El Producto ya está en el Carrito");
            break;
          default:
            alert("El Producto ya no está disponible");
            break;
        }
      } catch (error) {
        console.error("Error al agregar el producto al carrito", error);
        alert("Error al agregar el producto al carrito");
      }
    } else {
      location.href = "/login";
    }
  };

  return (
    <Container className="container-main">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs="12" md="6">
          <div className="image-container">
            <ImageC
              urlImagen={product.image}
              alternativo={product.descripcion}
            />
          </div>
        </Col>
        <Col xs="12" md="6">
          <div className="text-end mt-4">
            <a href="" onClick={agregarFavoritos}>
              <i className="fa-solid fa-heart fa-2x icono-favorito"></i>
            </a>
          </div>

          <div className="product-details">
            <h2>{product.titulo}</h2>
            <p className="mt-3">
              <strong>Precio: $</strong> {precioTotal.toFixed(2)}
            </p>

            <div className="buttons-container">
              <InputGroup className="w-50 mb-3">
                <InputGroup.Text>Cantidad</InputGroup.Text>
                <FormControl
                  type="number"
                  value={cantidad}
                  min="1"
                  onChange={actualizarCantidad}
                />
              </InputGroup>
              <Button className="btn-customProduct mb-3">Comprar</Button>
              <Button
                onClick={agregarCarrito}
                className="btn-customProduct mb-3"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </div>
            <div className="mt-3">
              <p>
                <strong>Descripcion:</strong>
              </p>
              <p>{product.descripcion}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleProducto;
