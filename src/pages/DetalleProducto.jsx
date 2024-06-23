import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios, { config } from "../helpers/clienteAxios";
import ImageC from "../components/ImageC";
import Swal from "sweetalert2";
import { titlePage } from "../helpers/titlePages";
import "../css/DetalleProducto.css";

const DetalleProducto = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(0);

  const obtenerProducto = async () => {
    try {
      const response = await clienteAxios.get(`/api/productos/${params.id}`);
      setProduct(response.data.product);
      setPrecioTotal(response.data.product.precio);
      titlePage(`${response.data.product.titulo}`);
    } catch (error) {
      mostrarError("Error al obtener el producto", error);
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

  const agregarFavoritos = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const agregarProducto = await clienteAxios.post(
        `/favoritos/${params.id}`,
        { cantidad },
        config
      );

      if (agregarProducto.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado a favoritos",
          text: "El producto fue enviado a tus favoritos.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Producto no disponible",
          text: "El producto seleccionado no está disponible.",
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          icon: "warning",
          title: "Producto ya existe en favoritos",
          text: "Este producto ya está en tus favoritos.",
        });
      } else {
        mostrarError("Error al agregar el producto a favoritos", error);
      }
    }
  };

  const agregarCarrito = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (!token) {
      location.href = "/login";
      return;
    }

    try {
      const agregarProducto = await clienteAxios.post(
        `/carritos/${params.id}`,
        { cantidad },
        config
      );

      if (agregarProducto.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito",
          text: "El producto fue enviado a tu carrito.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Producto no disponible",
          text: "El producto seleccionado no está disponible.",
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          icon: "warning",
          title: "Producto ya existe en el carrito",
          text: "Este producto ya está en tu carrito.",
        });
      } else {
        mostrarError("Error al agregar el producto al carrito", error);
      }
    }
  };

  const mostrarError = (titulo, error) => {
    Swal.fire({
      icon: "error",
      title: titulo,
      text: "Hubo un problema al realizar esta acción. Por favor, intenta nuevamente.",
      footer: `<a href="mailto:soporte@PawsAndClaws.com">Contactar soporte</a>`,
    });
    console.error(titulo, error);
  };

  const handleComprar = () => {
    navigate("/*");
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
            <a onClick={agregarFavoritos}>
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
              <Button
                className="btn-customProduct mb-3"
                onClick={handleComprar}>
                Comprar
              </Button>
              <Button
                onClick={agregarCarrito}
                className="btn-customProduct mb-3">
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </div>
            <div className="mt-3">
              <p>
                <strong>Descripción:</strong>
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
