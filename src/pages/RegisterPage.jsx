import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import formSchema from "../helpers/yupSchema";
import "../css/Reg-Log.css";

const RegisterPage = () => {
  titlePage("Registro");

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
          // Assuming 201 for successful creation
          alert("Usuario registrado");
          location.href = "/login";
        } else {
          alert("Error en el registro. Intente nuevamente.");
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert(
          "Error al registrar el usuario. Verifique los datos e intente nuevamente."
        );
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Formik
        initialValues={{ user: "", userName: "", pass: "", rpass: "" }}
        validationSchema={formSchema}
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

            <p>
              Si tienes una cuenta haz click <a href="/login">aquí</a>
            </p>

            <div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm"
                disabled={isSubmitting}>
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
  );
};

export default RegisterPage;

/* import { titlePage } from "../helpers/titlePages";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, { config } from "../helpers/clienteAxios";
import formSchema from "../helpers/yupSchema";
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
        <Formik
          initialValues={{ user: "", pass: "", rpass: "" }}
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

              <Form.Group className="mb-3" controlId="formBasicRPassword">
                <Form.Label>Repetir contraseña</Form.Label>
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
              <p>
                Si tienes una cuenta haz click <a href="/login">aqui</a>
              </p>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btnForm">
                  Registrarse con Gmail
                </Button>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 btnForm mt-3"
                onClick={handleSubmit}>
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage; */

/* <Form>
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
        </Form> */
