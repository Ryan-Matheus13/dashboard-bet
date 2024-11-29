import * as Yup from "yup";

export const addStorySchema = Yup.object({
  dayOfWeek: Yup.number().required("Dia da semana é obrigatório"),
  title: Yup.string().required("Titulo é obrigatório"),
  description: Yup.string(),
  thumbnailBase64: Yup.string().required("Thumbnail é obrigatório"),
  imageBase64: Yup.string().required("Story é obrigatório"),
  thumbnailFile: Yup.mixed()
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
  imageFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Story precisa ser um vídeo (mp4, webm) de até 30 segundos, uma imagem ou GIF válido",
      (value) =>
        value &&
        [
          "video/mp4",
          "video/webm",
          "image/gif",
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
        ].includes(value.type)
    )
    .test(
      "fileSize",
      "Story deve ter no máximo 10MB",
      (value) => value && value.size <= 10 * 1024 * 1024
    ),
  actionTo: Yup.string().required("Direcionamento é obrigatório"),
  actionTarget: Yup.string().required("Target é obrigatório"),
  actionTitle: Yup.string().required("Texto do botão é obrigatório"),
});
