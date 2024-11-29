/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { AddStreamFormProps, AddStreamFormValues } from "./Form.types";
import { addStreamSchema } from "./ValidationSchema";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import SelectField from "@/components/common/SelectField/SelectField";
import { InputLabel } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";

const dayOptions: any = [
  {
    value: 1,
    label: "Segunda-feira",
  },
  {
    value: 2,
    label: "Terça-feira",
  },
  {
    value: 3,
    label: "Quarta-feira",
  },
  {
    value: 4,
    label: "Quinta-feira",
  },
  {
    value: 5,
    label: "Sexta-feira",
  },
  {
    value: 6,
    label: "Sábado",
  },
  {
    value: 7,
    label: "Domigo",
  },
];

const initialValues: AddStreamFormValues = {
  dayOfWeek: null,
  liveName: "",
  liveLink: "",
  liveStartHour: "",
  liveEndHour: "",
  thumbImgBase64: null,
  thumbImgName: "",
  gameId: "",
  audienceLive: "",
  gifImgBase64: null,
  gifImgName: "",
  gifImgFile: null,
  thumbImgFile: null,
};

const AddStreamForm: React.FC<AddStreamFormProps> = ({ close, games }) => {
  const [gamesOptions, setGamesOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (games.length > 0) {
      const data = games.map((game: any) => {
        return {
          label: game.gameName,
          value: game.id,
        };
      });
      setGamesOptions(data);
    }
  }, [games]);

  const formik = useFormik<AddStreamFormValues>({
    initialValues,
    validationSchema: addStreamSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      handleSubmit(values);
    },
  });

  const validateVideoDuration = (file: any, maxDurationInSeconds: any) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        resolve(duration <= maxDurationInSeconds);
      };

      video.onerror = () => {
        reject(new Error("Não foi possível validar a duração do vídeo."));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const handleFileChange = async (
    event: any,
    setFieldValue: any,
    name: any,
    maxDuration = 30
  ) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("video")) {
      try {
        const isValidDuration = await validateVideoDuration(file, maxDuration);
        if (!isValidDuration) {
          alert("O vídeo deve ter no máximo 30 segundos!");
          return;
        }
      } catch (error) {
        console.error("Erro ao validar a duração do vídeo:", error);
        alert("Não foi possível validar a duração do vídeo.");
        return;
      }
    }

    setFieldValue(name, file);
    if (name == "thumbImgFile") {
      setFieldValue("thumbImgBase64", await getBase64(file));
      setFieldValue("thumbImgName", event.target.files[0].name);
    } else {
      setFieldValue("gifImgBase64", await getBase64(file));
      setFieldValue("gifImgName", event.target.files[0].name);
    }
  };

  const handleSubmit = async (dados: AddStreamFormValues) => {
    const data = dados;
    delete data.gifImgFile;
    delete data.thumbImgFile;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/streams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Stream criada com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar criar um stream:", error);
      toast.error("Erro ao tentar criar um stream.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <InputField
          id="liveName"
          label="Nome"
          name="liveName"
          type="text"
          value={formik.values.liveName}
          onChange={formik.handleChange}
          error={formik.touched.liveName && !!formik.errors.liveName}
          helperText={formik.touched.liveName ? formik.errors.liveName : ""}
        />

        <InputField
          id="liveLink"
          label="Link"
          name="liveLink"
          type="text"
          value={formik.values.liveLink}
          onChange={formik.handleChange}
          error={formik.touched.liveLink && !!formik.errors.liveLink}
          helperText={formik.touched.liveLink ? formik.errors.liveLink : ""}
        />
      </div>

      <div className={styles.row}>
        <InputField
          id="liveStartHour"
          label="Horário de Início"
          name="liveStartHour"
          type="time"
          value={formik.values.liveStartHour}
          onChange={formik.handleChange}
          error={formik.touched.liveStartHour && !!formik.errors.liveStartHour}
          helperText={
            formik.touched.liveStartHour ? formik.errors.liveStartHour : ""
          }
        />

        <InputField
          id="liveEndHour"
          label="Horário de Término"
          name="liveEndHour"
          type="time"
          value={formik.values.liveEndHour}
          onChange={formik.handleChange}
          error={formik.touched.liveEndHour && !!formik.errors.liveEndHour}
          helperText={
            formik.touched.liveEndHour ? formik.errors.liveEndHour : ""
          }
        />
        <SelectField
          id="dayOfWeek"
          name="dayOfWeek"
          label="Dia da Semana"
          value={formik.values.dayOfWeek}
          onChange={formik.handleChange}
          options={dayOptions}
          error={formik.touched.dayOfWeek && !!formik.errors.dayOfWeek}
          helperText={formik.touched.dayOfWeek ? formik.errors.dayOfWeek : ""}
          disabled={false}
        />
      </div>

      <div className={styles.row}>
        <InputField
          id="audienceLive"
          label="Audiência"
          name="audienceLive"
          type="text"
          value={formik.values.audienceLive}
          onChange={formik.handleChange}
          error={formik.touched.audienceLive && !!formik.errors.audienceLive}
          helperText={
            formik.touched.audienceLive ? formik.errors.audienceLive : ""
          }
        />
        <SelectField
          id="gameId"
          name="gameId"
          label="Game"
          value={formik.values.gameId}
          onChange={formik.handleChange}
          options={gamesOptions}
          error={formik.touched.gameId && !!formik.errors.gameId}
          helperText={formik.touched.gameId ? formik.errors.gameId : ""}
          disabled={false}
        />
      </div>

      <InputLabel id={"thumbImgFile"} style={{ color: "white" }}>
        Foto do Streamer
      </InputLabel>
      <InputField
        id="thumbImgFile"
        label=""
        name="thumbImgFile"
        type="file"
        value={formik.values.thumbImgFile}
        onChange={(event) =>
          handleFileChange(event, formik.setFieldValue, "thumbImgFile")
        }
        error={formik.touched.thumbImgFile && !!formik.errors.thumbImgFile}
        helperText={
          typeof formik.errors.thumbImgBase64 === "string"
            ? formik.errors.thumbImgBase64
            : typeof formik.errors.thumbImgFile === "string"
            ? formik.errors.thumbImgFile
            : undefined
        }
      />
      <InputLabel id={"gifImgFile"} style={{ color: "white" }}>
        Gif do Streamer
      </InputLabel>
      <InputField
        id="gifImgFile"
        label=""
        name="gifImgFile"
        type="file"
        value={formik.values.gifImgFile}
        onChange={(event) =>
          handleFileChange(event, formik.setFieldValue, "gifImgFile")
        }
        error={formik.touched.gifImgFile && !!formik.errors.gifImgFile}
        helperText={
          typeof formik.errors.gifImgBase64 === "string"
            ? formik.errors.gifImgBase64
            : typeof formik.errors.gifImgFile === "string"
            ? formik.errors.gifImgFile
            : undefined
        }
      />

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Criar Stream
        </button>
        <button className={styles.btnSecondary} type="button" onClick={close}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddStreamForm;
