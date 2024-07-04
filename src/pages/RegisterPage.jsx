import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/Reg-Log.css";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  titlePage("Registro");
  const yupSchemaRegister = yup.object().shape({
    user: yup
      .string()
      .required("Completa el campo vacío")
      .min(8, "Mínimo 8 caracteres")
      .max(50, "Máximo 50 caracteres")
      .email("Formato de email incorrecto. Por ejemplo: usuario@gmail.com"),
    userName: yup
      .string()
      .required("Completa el campo vacío")
      .min(5, "Mínimo 5 caracteres")
      .max(20, "Máximo 20 caracteres")
      .matches(
        /^[a-zA-Z0-9_]+$/,
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
              navigate("/login");
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
        Swal.fire({
          icon: "error",
          title: "Error al registrar el usuario",
          text: "El usuario y/o correo electronico no estan disponibles.",
          error,
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
    navigate("/*");
  };

  return (
    <div className="formImg">
      <div className="d-flex justify-content-center my-5 ">
        <Formik
          initialValues={{ user: "", userName: "", pass: "", rpass: "" }}
          validationSchema={yupSchemaRegister}
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Por ejemplo: usuario@gmail.com"
                  value={values.user}
                  name="user"
                  minLength={8}
                  maxLength={50}
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
                  placeholder="Por ejemplo: usuario123"
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
                <Form.Text className="text-muted">
                  El usuario debe tener entre 8 y 15 caracteres alfanuméricos.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 8 caracteres"
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
                <Form.Text className="text-muted">
                  Debe contener al menos una letra minúscula, una mayúscula, un
                  número y un carácter especial.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRPassword">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repite la contraseña"
                  value={values.rpass}
                  name="rpass"
                  minLength={8}
                  maxLength={15}
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
                Si ya tienes una cuenta, haz click <Link to="/login">aquí</Link>{" "}
                para iniciar sesión.
              </p>

              <div>
                <Button
                  variant="primary"
                  className="w-100 btnForm"
                  disabled={isSubmitting}
                  onClick={handleGmailLogin}
                >
                  Registrarse con Gmail
                </Button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                disabled={isSubmitting}
              >
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
