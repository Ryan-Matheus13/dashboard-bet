import * as Yup from "yup";

export const addGameSchema = Yup.object({
  gameName: Yup.string().required("Game name é obrigatório"),
  gameLink: Yup.string().required("Game link é obrigatório"),
  gameImgBase64: Yup.string().required("Imagem do game é obrigatório"),
  gameImgFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Thumbnail precisa ser uma imagem válida (png, jpg, jpeg, webp)",
      (value) =>
        value &&
        ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(
          value.type
        )
    )
    .test(
      "fileSize",
      "Thumbnail deve ter no máximo 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    ),
});
