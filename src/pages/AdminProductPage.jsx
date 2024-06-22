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
  const [image, setImage] = useState(null);
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

  const handleChangeNewImage = (ev) => {
    setNewProd({ ...newProd, image: ev.target.files[0] });
  };

  const handleChange = (ev) => {
    setEditProd({ ...editProd, [ev.target.name]: ev.target.value });
  };

  const handleChangeNew = (ev) => {
    setNewProd({ ...newProd, [ev.target.name]: ev.target.value });
  };

  const handleClickEdit = async (ev) => {
    ev.preventDefault();
    try {
      const updateProd = await clienteAxios.put(
        `/productos/${editProd._id}`,
        {
          titulo: editProd.titulo,
          precio: editProd.precio,
          descripcion: editProd.descripcion,
          categoria: editProd.categoria,
        },
        config
      );
      console.log(updateProd);
      console.log(image);
      if (updateProd.status === 200 && image) {
        console.log("entra en el if");
        const formData = new FormData();
        formData.append("image", image);

        const addImageProduct = await clienteAxios.post(
          `/productos/addImage/${updateProd.data.updateProduct._id}`,
          formData,
          configImg
        );

        if (addImageProduct.status === 200) {
          handleCloseEditModal();
          Swal.fire({
            title: "Producto actualizado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      } else {
        console.log("entra en el else");
        handleCloseEditModal();
        Swal.fire({
          title: "Producto actualizado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      Swal.fire({
        title: "Error al actualizar el producto",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
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
      const result = await Swal.fire({
        title: "¿Estás seguro que quieres eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
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
      Swal.fire({
        title: "Error al eliminar el producto",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    }
  };

  const handleCreateProd = async (ev) => {
    ev.preventDefault();
    try {
      // Crear el producto sin imagen primero
      const createProdRes = await clienteAxios.post(
        "/productos",
        {
          titulo: newProd.titulo,
          precio: newProd.precio,
          descripcion: newProd.descripcion,
          categoria: newProd.categoria,
        },
        config
      );

      console.log("Respuesta de creación del producto:", createProdRes);
      console.log("Estado de respuesta:", createProdRes.status);
      console.log("Datos de respuesta:", createProdRes.data);

      // Asegurarse de obtener el ID del producto correctamente
      const productId =
        createProdRes.data.newProduct?._id || createProdRes.data._id;

      console.log("ID del producto creado:", productId);
      console.log("Imagen:", newProd.image);

      // Verificar si el producto se creó correctamente y si hay una imagen para subir
      if (createProdRes.status === 201 && newProd.image) {
        console.log("Entrando en el bloque de subida de imagen");

        const formData = new FormData();
        formData.append("image", newProd.image);
        console.log("FormData con imagen:", formData.get("image"));

        // Subir la imagen para el producto creado
        const addImageProduct = await clienteAxios.post(
          `/productos/addImage/${productId}`,
          formData,
          configImg
        );

        console.log("Respuesta de añadir imagen:", addImageProduct);

        // Verificar si la imagen se subió correctamente
        if (addImageProduct.status === 200) {
          handleCloseCreateModal();
          Swal.fire({
            title: "Producto creado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      } else {
        console.log("Entrando en el bloque de producto creado sin imagen");
        handleCloseCreateModal();
        Swal.fire({
          title: "Producto creado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      console.error("Error al crear el producto", error);
      Swal.fire({
        title: "Error al crear el producto",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
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
                placeholder="Ingrese titulo"
                name="titulo"
                value={editProd.titulo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese precio"
                name="precio"
                value={editProd.precio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese descripcion"
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
                placeholder="Ingrese imagen"
                name="image"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClickEdit}>
              Editar Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese titulo"
                name="titulo"
                value={newProd.titulo}
                onChange={handleChangeNew}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese precio"
                name="precio"
                value={newProd.precio}
                onChange={handleChangeNew}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese descripcion"
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
                onChange={handleChangeNewImage}
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
