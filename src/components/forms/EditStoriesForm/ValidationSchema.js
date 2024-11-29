import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Usuário é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});
