/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { DeleteGameFormProps, DeleteGameFormValues } from "./Form.types";

import { toast } from "react-toastify";
import Loading from "@/components/common/Loading/Loading";

const initialValues: DeleteGameFormValues = {
  id: "",
  gameName: "",
  updateImg: false,
  gameLink: "",
  gameImgFile: null,
  gameImgBase64: null,
};

const DeleteGamesForm: React.FC<DeleteGameFormProps> = ({ close, values }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<DeleteGameFormValues>({
    initialValues: values || initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (dados: DeleteGameFormValues) => {
    const data = dados;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/games`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Game deletado com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar deletar um game:", error);
      toast.error("Erro ao tentar deletar um game.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <h3>Deseja deletar o game - {values.gameName?.toUpperCase()}</h3>
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

export default DeleteGamesForm;
