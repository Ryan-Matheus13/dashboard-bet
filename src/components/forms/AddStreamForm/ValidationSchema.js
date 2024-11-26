import * as Yup from "yup";

export const addStreamSchema = Yup.object({
  username: Yup.string().required("Usuário é obrigatório"),
});
