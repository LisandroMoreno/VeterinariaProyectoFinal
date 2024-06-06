import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";

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
        alert("Usuario actualizado");
        location.reload();
      }
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  const handleClickDel = async (idUser) => {
    const confirmDelUser = confirm(
      "Estas seguro de que quieres eliminar a este usuario?"
    );

    if (confirmDelUser) {
      const deleteUser = await clienteAxios.delete(
        `/users/users/${idUser}`,
        config
      );

      if (deleteUser.status === 200) {
        alert("Usuario borrado");
        location.reload();
      }
    }
  };

  const handleClickStatus = async (idUser) => {
    try {
      const confirmAction = confirm(
        `Estás seguro de que quieres ${
          userEdit.deleted ? "habilitar" : "deshabilitar"
        } a este usuario?`
      );

      if (confirmAction) {
        const statusUser = await clienteAxios.delete(
          `/users/${idUser}`,
          config
        );

        if (statusUser.status === 200) {
          alert("Estado del usuario actualizado");
          getUsers();
        }
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
      alert("Error al actualizar el estado del usuario");
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

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                              type="text"
                              value={userEdit.role}
                              placeholder="Por EJ: Administrador"
                              name="role"
                              onChange={handleChange}
                            />
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
