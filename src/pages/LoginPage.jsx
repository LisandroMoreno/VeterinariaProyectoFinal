import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { titlePage } from "../helpers/titlePages";
import "../css/Reg-Log.css";

const LoginPage = () => {
  titlePage("Iniciar Sesion");
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
          <p className="text-center">
            <a href="/RecuperarContraseña">¿Olvidaste tu contraseña?</a>{" "}
          </p>
          <p>
            ¿No tienes una cuenta? Haz click <a href="/Registro">aqui</a>
          </p>
          <div>
            <Button variant="primary" type="submit" className="w-100 btnForm">
              Ingresar con Gmail
            </Button>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 btnForm"
          >
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
