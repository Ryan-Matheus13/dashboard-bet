/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { EditStoryFormProps, EditStoryFormValues } from "./Form.types";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import SelectField from "@/components/common/SelectField/SelectField";
import { InputLabel } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";

const dayOptions: any = [
  {
    value: 0,
    label: "Segunda-feira",
  },
  {
    value: 1,
    label: "Terça-feira",
  },
  {
    value: 2,
    label: "Quarta-feira",
  },
  {
    value: 3,
    label: "Quinta-feira",
  },
  {
    value: 4,
    label: "Sexta-feira",
  },
  {
    value: 5,
    label: "Sábado",
  },
  {
    value: 6,
    label: "Domigo",
  },
];

const initialValues: EditStoryFormValues = {
  id: "",
  dayOfWeek: null,
  title: "",
  description: "",
  thumbnailFile: null,
  imageFile: null,
  thumbnailBase64: null,
  imageBase64: null,
  actionTo: "",
  actionTarget: "",
  actionTitle: "",
};

const EditStoriesForm: React.FC<EditStoryFormProps> = ({
  close,
  values,
  openDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<EditStoryFormValues>({
    initialValues: StorageUtils.formatStory(values) || initialValues,
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

  const handleSubmit = async (data: EditStoryFormValues) => {
    delete data.imageFile;
    delete data.thumbnailFile;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/stories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Story editado com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar editar um story:", error);
      toast.error("Erro ao tentar editar um story.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <InputField
          id="title"
          label="Titulo"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title ? formik.errors.title : ""}
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

      <InputField
        id="description"
        label="Descrição"
        name="description"
        type="text"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && !!formik.errors.description}
        helperText={formik.touched.description ? formik.errors.description : ""}
      />

      <div className={styles.row}>
        <InputField
          id="actionTo"
          label="Direcionamento"
          name="actionTo"
          type="text"
          value={formik.values.actionTo}
          onChange={formik.handleChange}
          error={formik.touched.actionTo && !!formik.errors.actionTo}
          helperText={formik.touched.actionTo ? formik.errors.actionTo : ""}
        />
        <InputField
          id="actionTarget"
          label="Target"
          name="actionTarget"
          type="text"
          value={formik.values.actionTarget}
          onChange={formik.handleChange}
          error={formik.touched.actionTarget && !!formik.errors.actionTarget}
          helperText={
            formik.touched.actionTarget ? formik.errors.actionTarget : ""
          }
        />
        <InputField
          id="actionTitle"
          label="Texto do botão"
          name="actionTitle"
          type="text"
          value={formik.values.actionTitle}
          onChange={formik.handleChange}
          error={formik.touched.actionTitle && !!formik.errors.actionTitle}
          helperText={
            formik.touched.actionTitle ? formik.errors.actionTitle : ""
          }
        />
      </div>

      <InputLabel id={"thumbImgBase64"} style={{ color: "white" }}>
        Thumbnail
      </InputLabel>
      <InputField
        id="thumbnailFile"
        label=""
        name="thumbnailFile"
        type="file"
        value={formik.values.thumbnailFile}
        onChange={(event) =>
          handleFileChange(event, formik.setFieldValue, "thumbnailFile")
        }
        error={formik.touched.thumbnailFile && !!formik.errors.thumbnailFile}
        helperText={
          typeof formik.errors.thumbnailBase64 === "string"
            ? formik.errors.thumbnailBase64
            : typeof formik.errors.thumbnailFile === "string"
            ? formik.errors.thumbnailFile
            : undefined
        }
      />
      <InputLabel id={"gifImgBase64"} style={{ color: "white" }}>
        Story
      </InputLabel>
      <InputField
        id="imageFile"
        label=""
        name="imageFile"
        type="file"
        value={formik.values.imageFile}
        onChange={(event) =>
          handleFileChange(event, formik.setFieldValue, "imageFile")
        }
        error={formik.touched.imageFile && !!formik.errors.imageFile}
        helperText={
          typeof formik.errors.imageBase64 === "string"
            ? formik.errors.imageBase64
            : typeof formik.errors.imageFile === "string"
            ? formik.errors.imageFile
            : undefined
        }
      />

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Salvar Story
        </button>
        <button className={styles.btn} type="button" onClick={openDelete}>
          Deletar
        </button>
        <button className={styles.btnSecondary} type="button" onClick={close}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditStoriesForm;
