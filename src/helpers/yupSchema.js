import * as yup from "yup";

const formSchema = yup.object({
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
      "El nombre de usuario solo puede contener letras y números."
    ),
  rpass: yup
    .string()
    .required("Completa el campo vacío")
    .oneOf([yup.ref("pass"), null], "Las contraseñas deben coincidir."),
});

export default formSchema;
