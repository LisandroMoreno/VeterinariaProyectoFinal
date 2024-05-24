import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { titlePage } from "../helpers/titlePages";
import "../css/Reg-Log.css";

const RegisterPage = () => {
  titlePage("Registro");
  const handleSubmitForm = async (values) => {
    if (values.pass === values.rpass) {
      const res = await clienteAxios.post(
        "/users/register",
        {
          nombreUsuario: values.user,
          contrasenia: values.pass,
        },
        config
      );
      alert("Usuario registrado");
      location.href = "/login";
      console.log(res);
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repetir Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <p>
            Si tienes una cuenta haz click <a href="/login">aqui</a>
          </p>
          <div>
            <Button variant="primary" type="submit" className="w-100 btnForm">
              Registrarse con Gmail
            </Button>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 btnForm">
            Confirmar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
