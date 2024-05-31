import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/Reg-Log.css";
import Swal from "sweetalert2";

const LoginPage = () => {
  titlePage("Iniciar Sesión");
  const yupSchemaLogin = yup.object().shape({
    userName: yup
      .string()
      .required("Completa el campo vacío")
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "El nombre de usuario solo puede contener letras y números."
      ),
    pass: yup
      .string()
      .required("Completa el campo vacío")
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "La contraseña solo puede contener letras y números."
      ),
  });

  const handleSubmitForm = async (values, actions) => {
    try {
      const loginUser = await clienteAxios.post(
        "/users/login",
        {
          nombreUsuario: values.userName,
          contrasenia: values.pass,
        },
        config
      );

      if (loginUser.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(loginUser.data.token));
        sessionStorage.setItem("role", JSON.stringify(loginUser.data.role));

        if (loginUser.data.role === "admin") {
          Swal.fire({
            title: "Administrador Logueado",
            text: "Bienvenido a Patas y Garras",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.href = "/home-adminLog";
            }, 2000);
          });
        } else {
          Swal.fire({
            title: "Usuario Logueado",
            text: "Bienvenido a Patas y Garras",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.href = "/home-userLog";
            }, 2000);
          });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Usuario bloqueado. Hablar con el admin",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al iniciar sesión. Usuario y/o contraseña equivocada.",
          });
        }
      } else {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión. Intente nuevamente más tarde.",
        });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleGmailLogin = () => {
    location.href = "/*";
  };

  return (
    <div className="formImg">
      <div className="d-flex justify-content-center my-5 ">
        <Formik
          initialValues={{ userName: "", pass: "" }}
          validationSchema={yupSchemaLogin}
          onSubmit={(values, actions) => {
            handleSubmitForm(values, actions);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Por ej: usuario123"
                  value={values.userName}
                  name="userName"
                  onChange={handleChange}
                  className={
                    errors.userName && touched.userName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <p className="text-danger">
                  {errors.userName && touched.userName && errors.userName}
                </p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={values.pass}
                  name="pass"
                  onChange={handleChange}
                  className={
                    errors.pass && touched.pass
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <p className="text-danger">
                  {errors.pass && touched.pass && errors.pass}
                </p>
              </Form.Group>

              <p className="text-center ">
                <a className="text-black" href="/*">
                  ¿Olvidaste tu contraseña?
                </a>{" "}
              </p>

              <p className="text-center">
                Si no tienes una cuenta haz click <a href="/registro">aquí</a>
              </p>

              <div>
                <Button
                  variant="primary"
                  className="w-100 btnForm"
                  disabled={isSubmitting}
                  onClick={handleGmailLogin}>
                  Ingresar con Gmail
                </Button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                disabled={isSubmitting}>
                Iniciar Sesion
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
