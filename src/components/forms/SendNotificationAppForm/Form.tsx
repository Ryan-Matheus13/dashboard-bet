/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";
import { sendNotificationAppFormSchema } from "./ValidationSchema";

import { useFormik } from "formik";

import { SendNotificationAppFormValues } from "./Form.types";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import { InputLabel } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";
import SelectField from "@/components/common/SelectField/SelectField";

const apks = [
  { label: "APK Cassino", value: "CASSINO" },
  { label: "APK Esportes", value: "SPORTS" },
  { label: "APK Cassino Teste", value: "TESTE_CASSINO" },
  { label: "APK Esportes Teste", value: "TESTE_SPORTS" },
];

const initialValues: SendNotificationAppFormValues = {
  title: "",
  body: "",
  rotulo: "",
  aplicativo: null,
  imageBase64: "",
  imageFile: null,
};

const SendNotificationAppForm = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<SendNotificationAppFormValues>({
    initialValues,
    validationSchema: sendNotificationAppFormSchema,
    onSubmit: (values) => {
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
    setFieldValue("imageBase64", await getBase64(file));
  };

  const handleSubmit = async (dados: SendNotificationAppFormValues) => {
    const data = dados;
    delete data.imageFile;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Notificação enviada com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar enviar uma notificação:", error);
      toast.error("Erro ao tentar enviar uma notificação.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <InputField
        background="light"
        id="rotulo"
        label="Rótulo"
        name="rotulo"
        type="text"
        value={formik.values.rotulo}
        onChange={formik.handleChange}
        error={formik.touched.rotulo && !!formik.errors.rotulo}
        helperText={formik.touched.rotulo ? formik.errors.rotulo : ""}
      />
      <InputField
        background="light"
        id="title"
        label="Titulo"
        name="title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && !!formik.errors.title}
        helperText={formik.touched.title ? formik.errors.title : ""}
      />

      <InputField
        background="light"
        id="body"
        label="Corpo da Mensagem"
        name="body"
        type="text"
        value={formik.values.body}
        onChange={formik.handleChange}
        error={formik.touched.body && !!formik.errors.body}
        helperText={formik.touched.body ? formik.errors.body : ""}
      />

      <SelectField
        background="light"
        id="aplicativo"
        name="aplicativo"
        label="APK"
        value={formik.values.aplicativo}
        onChange={formik.handleChange}
        options={apks}
        error={formik.touched.aplicativo && !!formik.errors.aplicativo}
        helperText={formik.touched.aplicativo ? formik.errors.aplicativo : ""}
        disabled={false}
      />

      <InputLabel id={"imageFile"} style={{ color: "#333" }}>
        Imagem
      </InputLabel>
      <InputField
        background="light"
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
          Enviar Notificação
        </button>
      </div>
    </form>
  );
};

export default SendNotificationAppForm;
