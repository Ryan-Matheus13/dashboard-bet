/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { DeleteStreamFormProps, DeleteStreamFormValues } from "./Form.types";

import { toast } from "react-toastify";
import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";

const initialValues: DeleteStreamFormValues = {
  id: "",
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

const DeleteStreamForm: React.FC<DeleteStreamFormProps> = ({
  close,
  values,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<DeleteStreamFormValues>({
    initialValues: StorageUtils.formatStream(values) || initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (dados: DeleteStreamFormValues) => {
    const data = dados;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/streams`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Stream deletado com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar deletar um stream:", error);
      toast.error("Erro ao tentar deletar um stream.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <h3>
          Deseja deletar a stream - {StorageUtils.formatStream(values).liveName}
        </h3>
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Deletar
        </button>
        <button className={styles.btnSecondary} type="button" onClick={close}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default DeleteStreamForm;
