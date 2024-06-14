import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";

const AdminUsersPage = () => {
  titlePage("Usuarios");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const getUsers = async () => {
    const allUsers = await clienteAxios.get("/users", config);
    setUsers(allUsers.data.getUsers);
  };

  const handleClose = () => setShow(false);

  const editUser = (user) => {
    setUserEdit(user);
    setShow(true);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const updateUser = await clienteAxios.put(
        `/users/${userEdit._id}`,
        {
          nombreUsuario: userEdit.nombreUsuario,
          role: userEdit.role,
          emailUsuario: userEdit.emailUsuario,
        },
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
    }
  };

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
      const confirmAction = confirm(
        `Estás seguro de que quieres modificar el estado de este usuario?`
      );

      if (confirmAction) {
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="table-responsive w-100 mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Role</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.emailUsuario}</td>
                  <td>{user.role === "user" ? "Usuario" : "Administrador"}</td>

                  <td>
                    <Button variant="warning" onClick={() => editUser(user)}>
                      Editar
                    </Button>
                    <Button
                      variant={user.deleted ? "success" : "dark"}
                      onClick={() => handleClickStatus(user._id, user.deleted)}
                      disabled={user.role === "admin" && true}>
                      {user.deleted ? "Habilitar" : "Deshabilitar"}
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Por Ej: usuArio123"
                              value={userEdit.nombreUsuario}
                              onChange={handleChange}
                              name="nombreUsuario"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={userEdit.emailUsuario}
                              placeholder="Por EJ: usuario@example.com"
                              name="emailUsuario"
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                              name="role"
                              value={userEdit.role}
                              onChange={handleChange}>
                              <option value="">Selecciona un role</option>
                              <option value="admin">Administrador</option>
                              <option value="user">Usuario</option>
                            </Form.Select>
                          </Form.Group>

                          <div className="d-flex justify-content-center">
                            <Button
                              variant="success"
                              type="submit"
                              onClick={handleClick}>
                              Guardar Cambios
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDel(user._id)}
                      disabled={user.role === "admin" && true}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
