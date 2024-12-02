import * as Yup from "yup";

export const sendNotificationAppFormSchema = Yup.object({
  title: Yup.string().required("Titulo é obrigatório"),
  body: Yup.string().required("Corpo da mensagem é obrigatório"),
  rotulo: Yup.string().required("Rótulo é obrigatório"),
  aplicativo: Yup.string().required("Apk é obrigatório"),
  imageBase64: Yup.string().required("Imagem do game é obrigatório"),
  imageFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Imagem precisa ser válida (png, jpg, jpeg, webp)",
      (value) =>
        value &&
        ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(
          value.type
        )
    )
    .test(
      "fileSize",
      "Imagem deve ter no máximo 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    ),
});
