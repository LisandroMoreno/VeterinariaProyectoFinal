import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/Reg-Log.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  titlePage("Iniciar Sesión");
  const yupSchemaLogin = yup.object().shape({
    userName: yup
      .string()
      .required("Completa el campo vacío")
      .min(5, "Mínimo 5 caracteres")
      .max(20, "Máximo 20 caracteres")
      .matches(
        /^[a-zA-Z0-9_]{5,20}$/,
        "El nombre de usuario solo puede contener letras, números y guion bajo (_)."
      ),
    pass: yup
      .string()
      .required("Completa el campo vacío")
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito, un carácter especial (@$!%*?&), y tener entre 8 y 15 caracteres."
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
        sessionStorage.setItem("id", JSON.stringify(loginUser.data.id));

        if (loginUser.data.role === "admin") {
          Swal.fire({
            title: "Administrador Logueado",
            text: "Bienvenido a Patas y Garras",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              navigate("/home-adminLog");
              window.location.reload();
            }, 1000);
          });
        } else {
          Swal.fire({
            title: "Usuario Logueado",
            text: "Bienvenido a Patas y Garras",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión. Intente nuevamente más tarde.",
          error,
        });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleGmailLogin = () => {
    navigate("/*");
  };

  return (
    <div className="formImg">
      <div className="d-flex justify-content-center my-5 ">
        <Formik
          initialValues={{ userName: "", pass: "" }}
          validationSchema={yupSchemaLogin}
          onSubmit={(values, actions) => {
            handleSubmitForm(values, actions);
          }}
        >
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
                  minLength={8}
                  maxLength={15}
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
                  minLength={8}
                  maxLength={15}
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
                <Link className="text-black" to="/*">
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>

              <p className="text-center">
                Si no tienes una cuenta haz click{" "}
                <Link to="/registro">aquí</Link>
              </p>

              <div>
                <Button
                  variant="primary"
                  className="w-100 btnForm"
                  disabled={isSubmitting}
                  onClick={handleGmailLogin}
                >
                  Ingresar con Gmail
                </Button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                disabled={isSubmitting}
              >
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
