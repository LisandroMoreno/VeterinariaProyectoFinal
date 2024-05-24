import * as yup from "yup";

const formSchema = yup.object({
  user: yup
    .string()
    .required("Completa el campo")
    .email("Formato email. Por ej: usuario@gmail.com"),
  pass: yup
    .string()
    .required("Completa el campo")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  rpass: yup
    .string()
    .required("Completa el campo")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
});

export default formSchema;
