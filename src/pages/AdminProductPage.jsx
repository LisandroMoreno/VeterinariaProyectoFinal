import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";
import TablaC from "../components/TablaC";
import { Button, Modal } from "react-bootstrap";

const AdminProductsPage = () => {
  titlePage("Lista de Productos");
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

  const validationSchema = Yup.object().shape({
    titulo: Yup.string()
      .required("El título es obligatorio")
      .min(3, "El título debe tener al menos 3 caracteres")
      .max(100, "El título no debe exceder los 100 caracteres"),
    precio: Yup.number()
      .required("El precio es obligatorio")
      .positive("El precio debe ser un valor positivo")
      .max(10000, "El precio no debe exceder los 10,000"),
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(500, "La descripción no debe exceder los 500 caracteres"),
    categoria: Yup.string().required("La categoría es obligatoria"),
    image: Yup.mixed().nullable(),
  });

  const handleClickEdit = async (values, { setSubmitting }) => {
    try {
      const updateProd = await clienteAxios.put(
        `/productos/${editProd._id}`,
        {
          titulo: values.titulo,
          precio: values.precio,
          descripcion: values.descripcion,
          categoria: values.categoria,
        },
        config
      );
      if (updateProd.status === 200 && image) {
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
      Swal.fire({
        title: "Error al actualizar el producto",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateProd = async (values, { setSubmitting }) => {
    try {
      const createProdRes = await clienteAxios.post(
        "/productos",
        {
          titulo: values.titulo,
          precio: values.precio,
          descripcion: values.descripcion,
          categoria: values.categoria,
        },
        config
      );

      const productId =
        createProdRes.data.newProduct?._id || createProdRes.data._id;

      if (createProdRes.status === 201 && newProd.image) {
        const formData = new FormData();
        formData.append("image", newProd.image);

        const addImageProduct = await clienteAxios.post(
          `/productos/addImage/${productId}`,
          formData,
          configImg
        );

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
      Swal.fire({
        title: "Error al crear el producto",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
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

  const columns = [
    { key: "_id", header: "ID" },
    { key: "titulo", header: "Titulo" },
    { key: "precio", header: "Precio" },
    { key: "categoria", header: "Categoria" },
    {
      key: "image",
      header: "Imagen",
      render: (row) => <img src={row.image} alt="" width={25} />,
    },
  ];

  useEffect(() => {
    getProductosAdmin();
  }, []);

  return (
    <>
      <h2 className="mt-4 text-center">Administracion de Productos</h2>
      <div className="d-flex justify-content-center ">
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Crear Producto
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="table-responsive w-100 mt-3">
          <TablaC
            columns={columns}
            data={products}
            handleEdit={editProduct}
            handleDelete={handleClickDel}
          />
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editProd}
            validationSchema={validationSchema}
            onSubmit={handleClickEdit}>
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Titulo
                  </label>
                  <Field
                    type="text"
                    name="titulo"
                    className={`form-control ${
                      errors.titulo && touched.titulo ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="titulo"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio
                  </label>
                  <Field
                    type="number"
                    name="precio"
                    className={`form-control ${
                      errors.precio && touched.precio ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="precio"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripcion
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    className={`form-control ${
                      errors.descripcion && touched.descripcion
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">
                    Categoria
                  </label>
                  <Field
                    as="select"
                    name="categoria"
                    className={`form-select ${
                      errors.categoria && touched.categoria ? "is-invalid" : ""
                    }`}>
                    <option value="">Selecciona una categoria</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Cuidados/Limpieza">Cuidados/Limpieza</option>
                  </Field>
                  <ErrorMessage
                    name="categoria"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="image"
                    className={`form-control ${
                      errors.image && touched.image ? "is-invalid" : ""
                    }`}
                    onChange={handleChangeImage}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    Editar Producto
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={newProd}
            validationSchema={validationSchema}
            onSubmit={handleCreateProd}>
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Titulo
                  </label>
                  <Field
                    type="text"
                    name="titulo"
                    className={`form-control ${
                      errors.titulo && touched.titulo ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="titulo"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio
                  </label>
                  <Field
                    type="number"
                    name="precio"
                    className={`form-control ${
                      errors.precio && touched.precio ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="precio"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripcion
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    className={`form-control ${
                      errors.descripcion && touched.descripcion
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">
                    Categoria
                  </label>
                  <Field
                    as="select"
                    name="categoria"
                    className={`form-select ${
                      errors.categoria && touched.categoria ? "is-invalid" : ""
                    }`}>
                    <option value="">Selecciona una categoria</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Cuidados/Limpieza">Cuidados/Limpieza</option>
                  </Field>
                  <ErrorMessage
                    name="categoria"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="image"
                    className={`form-control ${
                      errors.image && touched.image ? "is-invalid" : ""
                    }`}
                    onChange={handleChangeNewImage}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    Crear Producto
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProductsPage;
