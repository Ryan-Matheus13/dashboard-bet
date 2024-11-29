/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";
import { addGameSchema } from "./ValidationSchema";

import { useFormik } from "formik";

import { AddGameFormProps, AddGameFormValues } from "./Form.types";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import { InputLabel } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";

const initialValues: AddGameFormValues = {
  gameName: "",
  gameLink: "",
  gameImgFile: null,
  gameImgBase64: null,
};

const AddGamesForm: React.FC<AddGameFormProps> = ({ close }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<AddGameFormValues>({
    initialValues,
    validationSchema: addGameSchema,
    onSubmit: (values) => {
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
    if (name == "imageFile") {
      setFieldValue("imageBase64", await getBase64(file));
    } else {
      setFieldValue("thumbnailBase64", await getBase64(file));
    }
  };

  const handleSubmit = async (data: AddGameFormValues) => {
    delete data.gameImgFile;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Game criado com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar criar um game:", error);
      toast.error("Erro ao tentar criar um game.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <InputField
          id="gameName"
          label="Nome do game"
          name="gameName"
          type="text"
          value={formik.values.gameName}
          onChange={formik.handleChange}
          error={formik.touched.gameName && !!formik.errors.gameName}
          helperText={formik.touched.gameName ? formik.errors.gameName : ""}
        />

        <InputField
          id="gameLink"
          label="Link"
          name="gameLink"
          type="text"
          value={formik.values.gameLink}
          onChange={formik.handleChange}
          error={formik.touched.gameLink && !!formik.errors.gameLink}
          helperText={formik.touched.gameLink ? formik.errors.gameLink : ""}
        />
      </div>

      <InputLabel id={"gameImgFile"} style={{ color: "white" }}>
        Imagem do Game
      </InputLabel>
      <InputField
        id="gameImgFile"
        label=""
        name="gameImgFile"
        type="file"
        value={formik.values.gameImgFile}
        onChange={(event) =>
          handleFileChange(event, formik.setFieldValue, "gameImgFile")
        }
        error={formik.touched.gameImgFile && !!formik.errors.gameImgFile}
        helperText={
          typeof formik.errors.gameImgBase64 === "string"
            ? formik.errors.gameImgBase64
            : typeof formik.errors.gameImgFile === "string"
            ? formik.errors.gameImgFile
            : undefined
        }
      />

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Criar Game
        </button>
        <button className={styles.btnSecondary} type="button" onClick={close}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddGamesForm;
