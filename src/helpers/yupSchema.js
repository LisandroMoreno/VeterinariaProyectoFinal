import * as yup from "yup";

const formSchema = yup.object({
  user: yup
    .string()
    .required("Campo usuario vacio")
    .email("Formato email. Por ej: usuario@dominio.com"),
  pass: yup
    .string()
    .required("Campo contraseña vacio")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  rpass: yup
    .string()
    .required("Campo repetir contraseña vacio")
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
});

export default formSchema;
