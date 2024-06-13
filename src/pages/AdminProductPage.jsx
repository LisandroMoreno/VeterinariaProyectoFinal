import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";

const AdminProductsPage = () => {
  titlePage("Productos");
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProd, setEditProd] = useState({
    _id: "",
    titulo: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });
  const [image, setImage] = useState();
  const [newProd, setNewProd] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    categoria: "",
    image: "",
  });

  const editProduct = (product) => {
    setEditProd(product);
    setShowEditModal(true);
  };

  const handleChangeImage = (ev) => {
    setImage(ev.target.files[0]);
  };

  const handleChange = (ev) => {
    setEditProd({ ...editProd, [ev.target.name]: ev.target.value });
  };

  const handleChangeNew = (ev) => {
    setNewProd({ ...newProd, [ev.target.name]: ev.target.value });
  };

  const handleClickEdit = async (ev) => {
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
        handleCloseEditModal();
        Swal.fire({
          title: "Producto actualizado",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }

      const addImageProd = await clienteAxios.post(
        `/productos/addImage/${editProd._id}`,
        formData,
        configImg
      );

      if (addImageProd.status === 200) {
        handleCloseEditModal();
        location.reload();
      }
    } catch (error) {
      console.error("Error al añadir imagen", error);
    }
  };

  const getProductosAdmin = async () => {
    const allProducts = await clienteAxios.get("/productos/admin");
    setProducts(allProducts.data.products);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);

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
          handleCloseEditModal();
          Swal.fire({
            title: "Producto eliminado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const handleCreateProd = async (ev) => {
    try {
      ev.preventDefault();

      const formData = new FormData();
      formData.append("titulo", newProd.titulo);
      formData.append("precio", newProd.precio);
      formData.append("descripcion", newProd.descripcion);
      formData.append("categoria", newProd.categoria);
      formData.append("image", newProd.image);

      const createProdRes = await clienteAxios.post(
        "/productos",
        formData,
        config
      );

      if (createProdRes.status === 201) {
        handleCloseCreateModal();
        Swal.fire({
          title: "Producto creado",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };

  useEffect(() => {
    getProductosAdmin();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Crear Producto
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="table-responsive w-100 mt-3">
          <Table striped bordered hover>
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
                      variant="warning"
                      onClick={() => editProduct(product)}>
                      Editar
                    </Button>

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
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el titulo"
                name="titulo"
                value={editProd.titulo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                name="precio"
                value={editProd.precio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripcion"
                name="descripcion"
                value={editProd.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categoria</Form.Label>

              <Form.Select
                name="categoria"
                value={editProd.categoria}
                onChange={handleChange}>
                <option value="">Selecciona una categoria</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Cuidados/Limpieza">Cuidados/Limpieza</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                placeholder="Seleccione una imagen"
                name="image"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClickEdit}>
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el titulo"
                name="titulo"
                value={newProd.titulo}
                onChange={handleChangeNew}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                name="precio"
                value={newProd.precio}
                onChange={handleChangeNew}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripcion"
                name="descripcion"
                value={newProd.descripcion}
                onChange={handleChangeNew}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categoria</Form.Label>

              <Form.Select
                name="categoria"
                value={newProd.categoria}
                onChange={handleChangeNew}>
                <option value="">Selecciona una categoria</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Cuidados/Limpieza">Cuidados/Limpieza</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                placeholder="Seleccione una imagen"
                name="image"
                onChange={(e) =>
                  setNewProd({ ...newProd, image: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleCreateProd}>
              Crear Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProductsPage;
