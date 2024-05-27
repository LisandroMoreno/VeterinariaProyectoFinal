import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import "../css/Reg-Log.css";
import formSchemaLogin from "../helpers/yupSchemaLogin";

const LoginPage = () => {
  titlePage("Iniciar Sesión");

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
          alert("Usuario Logueado");
          location.href = "/home-adminLog";
        } else {
          location.href = "/home-userLog";
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert("Usuario bloqueado. Hablar con el admin");
        } else {
          alert("Error al iniciar sesión. Usuario y/o contraseña equivocada.");
        }
      } else {
        console.error("Error:", error);
        alert("Error al iniciar sesión. Intente nuevamente más tarde.");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleGmailLogin = () => {
    // Redirigir a una página inexistente para mostrar el error 404
    location.href = "/*";
  };

  return (
    <div className="formImg">
      <div className="d-flex justify-content-center my-5 ">
        <Formik
          initialValues={{ userName: "", pass: "" }}
          validationSchema={formSchemaLogin}
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
                <a className="text-black" href="/RecuperarContraseña">
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

/* <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              className={error.user === "errorUser" && "is-invalid"}
              type="text"
              placeholder="Por ej: Usuario123"
              onChange={cambioDatosUsuario}
              name="user"
            />
            {error.user && <p className="text-danger">Campo USUARIO Vacio</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              className={error.pass === "errorPass" && "is-invalid"}
              type="text"
              placeholder="Contraseña"
              onChange={cambioDatosUsuario}
              name="pass"
            />
            {error.pass && (
              <p className="text-danger">Campo CONTRASEÑA Vacio</p>
            )}
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className="w-100"
            onClick={enviarFormulario}>
            Iniciar Sesion
          </Button>
        </Form> */

/* <Formik
          initialValues={{ user: "", pass: "" }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            handleSubmitForm(values);
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electronico</Form.Label>
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

              <p className="text-center">
            <a href="/RecuperarContraseña">¿Olvidaste tu contraseña?</a>{" "}
          </p>
          <p>
            ¿No tienes una cuenta? Haz click <a href="/Registro">aqui</a>
          </p>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btnForm">
                  Ingresar con Gmail
                </Button>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                onClick={handleSubmit}>
                Iniciar Sesion
              </Button>
            </Form>
          )}
        </Formik> */
