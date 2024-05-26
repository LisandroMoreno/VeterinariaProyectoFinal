import * as yup from "yup";

const formSchemaLogin = yup.object({
  userName: yup
    .string()
    .required("Completa el campo")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  pass: yup
    .string()
    .required("Completa el campo vacio")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
});

export default formSchemaLogin;
