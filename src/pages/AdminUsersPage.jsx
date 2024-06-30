import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import TablaC from "../components/TablaC";

const AdminUsersPage = () => {
  titlePage("Lista de Usuarios");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const getUsers = async () => {
    try {
      const allUsers = await clienteAxios.get("/users", config);
      setUsers(allUsers.data.getUsers);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  const handleClose = () => setShow(false);

  const editUser = (user) => {
    setUserEdit(user);
    formik.setValues({
      nombreUsuario: user.nombreUsuario,
      emailUsuario: user.emailUsuario,
      role: user.role,
    });
    setShow(true);
  };

  const validationSchema = Yup.object({
    nombreUsuario: Yup.string()
      .required("El usuario es obligatorio")
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "El nombre de usuario solo puede contener letras y números."
      ),
    emailUsuario: Yup.string()
      .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com")
      .required("El email es obligatorio")
      .min(8, "Mínimo 8 caracteres")
      .max(50, "Máximo 50 caracteres"),
    role: Yup.string().required("El rol es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      nombreUsuario: "",
      emailUsuario: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsSubmitting(true);
      try {
        const updateUser = await clienteAxios.put(
          `/users/${userEdit._id}`,
          values,
          config
        );
        if (updateUser.status === 200) {
          handleClose();
          Swal.fire({
            title: "Usuario actualizado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      } catch (error) {
        console.error("Error al actualizar el usuario", error);
        Swal.fire({
          title: "Error al actualizar el usuario",
          icon: "error",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickDel = async (idUser) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro que quieres eliminar este usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const deleteUser = await clienteAxios.delete(
          `/users/users/${idUser}`,
          config
        );

        if (deleteUser.status === 200) {
          Swal.fire({
            title: "Usuario eliminado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      }
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      Swal.fire({
        title: "Error al eliminar el usuario",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    }
  };

  const handleClickStatus = async (idUser) => {
    try {
      const resultStatus = await Swal.fire({
        title: "¿Estás seguro que quieres cambiar el estado del usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cambiarlo",
        cancelButtonText: "Cancelar",
      });

      if (resultStatus.isConfirmed) {
        const statusUser = await clienteAxios.delete(
          `/users/${idUser}`,
          config
        );

        if (statusUser.status === 200) {
          Swal.fire({
            title: "Estado del usuario actualizado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              getUsers();
            }, 1000);
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
      Swal.fire({
        title: "Error al actualizar el estado del usuario",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "user":
        return "Usuario";
      default:
        return "";
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { key: "_id", header: "ID" },
    { key: "nombreUsuario", header: "Usuario" },
    { key: "emailUsuario", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <>
      <h2 className="mt-4 text-center">Administración de Usuarios</h2>
      <div className="d-flex justify-content-center">
        <div className="table-responsive w-100 mt-5">
          <TablaC
            columns={columns}
            data={users}
            handleDelete={handleClickDel}
            handleClickStatus={handleClickStatus}
            handleEdit={editUser}
            getRoleLabel={getRoleLabel}
          />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Por Ej: usuario123"
                value={formik.values.nombreUsuario}
                onChange={formik.handleChange}
                name="nombreUsuario"
                minLength={3}
                maxLength={15}
                isInvalid={
                  !!formik.errors.nombreUsuario && formik.touched.nombreUsuario
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nombreUsuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={formik.values.emailUsuario}
                placeholder="Por EJ: usuario@gmail.com"
                name="emailUsuario"
                minLength={8}
                maxLength={50}
                onChange={formik.handleChange}
                isInvalid={
                  !!formik.errors.emailUsuario && formik.touched.emailUsuario
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.emailUsuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.role && formik.touched.role}>
                <option value="">Selecciona un role</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.role}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="success" type="submit" disabled={isSubmitting}>
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminUsersPage;
