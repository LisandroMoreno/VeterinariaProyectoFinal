import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";

const AdminProductsPage = () => {
  titlePage("Productos");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editProd, setEditProd] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });
  const [image, setImage] = useState();

  const editProduct = (product) => {
    setEditProd(product);
    setShow(true);
  };

  const handleChangeImage = (ev) => {
    setImage(ev.target.files[0]);
  };

  const handleChange = (ev) => {
    setEditProd({ ...editProd, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();

      const formData = new FormData();
      formData.append("titulo", editProd.titulo);
      formData.append("precio", editProd.precio);
      formData.append("descripcion", editProd.descripcion);
      formData.append("categoria", editProd.categoria);
      formData.append("image", image);

      const updateProd = await clienteAxios.put(
        `/productos/${editProd._id}`,
        formData,
        config
      );

      if (updateProd.status === 200) {
        handleClose();
        alert("Producto actualizado");
        location.reload();
      }

      const addImageProd = await clienteAxios.post(
        `/productos/addImage/${editProd._id}`,
        formData,
        configImg
      );

      if (addImageProd.status === 200) {
        handleClose();
        location.reload();
      }

      console.log(updateProd);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductosAdmin = async () => {
    const allProducts = await clienteAxios.get("/productos/admin");
    setProducts(allProducts.data.products);
  };

  const handleClose = () => setShow(false);

  const handleClickDel = async (idProd) => {
    try {
      const confirmDel = confirm(
        "Estas seguro de que quieres eliminar este producto?"
      );

      if (confirmDel) {
        const delProd = await clienteAxios.delete(
          `/productos/${idProd}`,
          config
        );
        if (delProd.status === 200) {
          handleClose();
          alert("Producto eliminado");
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductosAdmin();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="w-75 mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Imagen</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.titulo}</td>
                <td>{product.precio}</td>
                <td>{product.descripcion}</td>
                <td>{product.categoria}</td>
                <td className="text-center">
                  <img src={product.image} alt="" width={25} />
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => editProduct(product)}>
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Titulo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="titulo"
                            value={editProd.titulo}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter email"
                            name="precio"
                            value={editProd.precio}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Descripcion</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="descripcion"
                            value={editProd.descripcion}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Categoria</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="categoria"
                            value={editProd.categoria}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="file"
                            placeholder="Enter email"
                            name="image"
                            onChange={handleChangeImage}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClick}>
                          Guardar
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDel(product._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminProductsPage;
