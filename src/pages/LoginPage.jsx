import { titlePage } from "../helpers/titlePages";
import { useState } from "react";
import clienteAxios from "../helpers/clienteAxios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/Reg-Log.css";
import { Formik } from "formik";
import formSchema from "../helpers/yupSchema";

const LoginPage = () => {
  titlePage("Iniciar Sesión");

  const handleSubmitForm = async (values, actions) => {
    try {
      const loginUser = await clienteAxios.post("/users/login", {
        nombreUsuario: values.user,
        contrasenia: values.pass,
      });

      if (loginUser.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(loginUser.data.token));
        sessionStorage.setItem("role", JSON.stringify(loginUser.data.role));

        if (loginUser.data.role === "admin") {
          location.href = "/home-adminLog";
        } else {
          location.href = "/home-userLog";
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error al iniciar sesión. Verifique sus credenciales.");
      actions.setSubmitting(false); // Reset form submitting state
    }
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Formik
        initialValues={{ user: "", pass: "" }}
        validationSchema={formSchema}
        onSubmit={handleSubmitForm}>
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
              <a href="/RecuperarContraseña">¿Olvidaste tu contraseña?</a>
            </p>
            <p>
              ¿No tienes una cuenta? Haz click <a href="/Registro">aquí</a>
            </p>
            <div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm"
                disabled={isSubmitting}>
                Ingresar con Gmail
              </Button>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-100 btnForm mt-3"
              onClick={handleSubmit}
              disabled={isSubmitting}>
              Iniciar Sesión
            </Button>
          </Form>
        )}
      </Formik>
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
