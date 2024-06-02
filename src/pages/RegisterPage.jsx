import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/Reg-Log.css";

const RegisterPage = () => {
  titlePage("Registro");
  const yupSchemaRegister = yup.object().shape({
    user: yup
      .string()
      .required("Completa el campo vacío")
      .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com"),
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
    rpass: yup
      .string()
      .required("Completa el campo vacío")
      .oneOf([yup.ref("pass"), null], "Las contraseñas deben coincidir."),
  });

  const handleSubmitForm = async (values, actions) => {
    if (values.pass === values.rpass) {
      try {
        const res = await clienteAxios.post(
          "/users/register",
          {
            nombreUsuario: values.userName,
            contrasenia: values.pass,
            emailUsuario: values.user,
          },
          config
        );

        if (res.status === 201) {
          Swal.fire({
            title: "Usuario Registrado",
            text: "Bienvenido a Patas y Garras",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.href = "/login";
            }, 2000);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error en el registro. Intente nuevamente.",
          });
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al registrar el usuario",
          text: "El usuario y/o correo electronico no estan disponibles.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
    }
    actions.setSubmitting(false);
  };

  const handleGmailLogin = () => {
    location.href = "/*";
  };

  return (
    <div className="formImg">
      <div className="d-flex justify-content-center my-5 ">
        <Formik
          initialValues={{ user: "", userName: "", pass: "", rpass: "" }}
          validationSchema={yupSchemaRegister}
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Por ej: usuario@gmail.com"
                  value={values.user}
                  name="user"
                  onChange={handleChange}
                  className={
                    errors.user && touched.user
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <p className="text-danger">
                  {errors.user && touched.user && errors.user}
                </p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Por ej: usuario123"
                  value={values.userName}
                  name="userName"
                  onChange={handleChange}
                  className={
                    errors.user && touched.user
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

              <Form.Group className="mb-3" controlId="formBasicRPassword">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={values.rpass}
                  name="rpass"
                  onChange={handleChange}
                  className={
                    errors.rpass && touched.rpass
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <p className="text-danger">
                  {errors.rpass && touched.rpass && errors.rpass}
                </p>
              </Form.Group>

              <p className="text-center">
                Si tienes una cuenta haz click <a href="/login">aquí</a>
              </p>

              <div>
                <Button
                  variant="primary"
                  className="w-100 btnForm"
                  disabled={isSubmitting}
                  onClick={handleGmailLogin}>
                  Registrarse con Gmail
                </Button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                disabled={isSubmitting}>
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
