/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { EditStreamFormProps, EditStreamFormValues } from "./Form.types";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import SelectField from "@/components/common/SelectField/SelectField";
import { InputLabel } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";

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

const initialValues: EditStreamFormValues = {
  id: "",
  dayOfWeek: null,
  liveName: "",
  liveLink: "",
  liveStartHour: "",
  liveEndHour: "",
  thumbImgBase64: null,
  thumbImgFile: null,
  thumbImgName: "",
  updateImg: false,
  gameId: "",
  audienceLive: "",
  gifImgBase64: null,
  gifImgFile: null,
  gifImgName: "",
  updateGif: false,
};

const EditStreamForm: React.FC<EditStreamFormProps> = ({
  close,
  games,
  values,
  openDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [gamesOptions, setGamesOptions] = useState<any>([]);
  const [updateImage, setUpdateImage] = useState(false);

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

  const formik = useFormik<EditStreamFormValues>({
    initialValues: StorageUtils.formatStream(values) || initialValues,
    onSubmit: (values) => {
      if (!values.updateImg) {
        values.updateImg = false;
      }
      if (!values.updateGif) {
        values.updateGif = false;
      }
      handleSubmit(values);
    },
  });

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
    name: any
  ) => {
    const file = event.target.files[0];

    setFieldValue(name, file);
    if (name == "thumbImgFile") {
      setFieldValue("thumbImgBase64", await getBase64(file));
      setFieldValue("thumbImgName", event.target.files[0].name);
      setFieldValue("updateImg", true);
    } else {
      setFieldValue("gifImgBase64", await getBase64(file));
      setFieldValue("gifImgName", event.target.files[0].name);
      setFieldValue("updateGif", true);
    }
  };

  const handleSubmit = async (dados: EditStreamFormValues) => {
    const data = dados;
    delete data.gifImgFile;
    delete data.thumbImgFile;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/streams`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Stream editada com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar editar um stream:", error);
      toast.error("Erro ao tentar editar um stream.");
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
      {updateImage && (
        <>
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
        </>
      )}

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Salvar Stream
        </button>
        <button
          className={styles.btn}
          type="button"
          onClick={() => setUpdateImage(updateImage ? false : true)}
        >
          {updateImage ? "Ocultar Imagens" : "Atualizar Imagens"}
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

export default EditStreamForm;
