import * as Yup from "yup";

export const addStreamSchema = Yup.object({
  dayOfWeek: Yup.number().required("Dia da semana é obrigatório"),
  liveName: Yup.string().required("Nome da live é obrigatório"),
  liveLink: Yup.string().required("Link da live é obrigatório"),
  liveStartHour: Yup.string().required("Horário de inicio é obrigatório"),
  liveEndHour: Yup.string().required("Horário de término é obrigatório"),
  gameId: Yup.string().required("Game é obrigatório"),
  audienceLive: Yup.string().required("Audiência é obrigatório"),
  thumbImgBase64: Yup.string().required("Foto do streamer é obrigatório"),
  thumbImgFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Foto do streamer precisa ser uma imagem válida (png, jpg, jpeg, webp)",
      (value) =>
        value &&
        ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(
          value.type
        )
    )
    .test(
      "fileSize",
      "Foto do streamer deve ter no máximo 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    ),
  thumbImgName: Yup.string(),
  gifImgBase64: Yup.string().required("Gif do streamer é obrigatório"),
  gifImgFile: Yup.mixed()
    .nullable()
    .test(
      "fileType",
      "Gif do streamer precisa ser um gif ou imagem válida (png, jpg, jpeg, webp, gif)",
      (value) =>
        value &&
        [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/gif",
        ].includes(value.type)
    )
    .test(
      "fileSize",
      "Gif do streamer deve ter no máximo 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    ),
  gifImgName: Yup.string(),
});
