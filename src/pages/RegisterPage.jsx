import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { tittlePage } from "../helpers/titlePages";
import "../css/Reg-Log.css";

const RegisterPage = () => {
  tittlePage("Registro");
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
            <Button variant="primary" type="submit" className="w-100 btn">
              Registrarse con Gmail
            </Button>
          </div>
          <Button variant="primary" type="submit" className="w-100 mt-3 btn">
            Confirmar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
