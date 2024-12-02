/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "./Form.module.css";

import { useFormik } from "formik";

import { DeleteStoriesFormProps, DeleteStoriesFormValues } from "./Form.types";

import { toast } from "react-toastify";
import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";

const initialValues: DeleteStoriesFormValues = {
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

const DeleteStoriesForm: React.FC<DeleteStoriesFormProps> = ({
  close,
  values,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<DeleteStoriesFormValues>({
    initialValues: StorageUtils.formatStory(values) || initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (dados: DeleteStoriesFormValues) => {
    const data = dados;
    setLoading(true);
    try {
      const response = await fetch(`/api/core/stories`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Stories deletado com sucesso!");
        setLoading(false);
        close();
      } else {
        const data = await response.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar deletar um story:", error);
      toast.error("Erro ao tentar deletar um story.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {loading && <Loading />}
      <div className={styles.row}>
        <h3>
          Deseja deletar o story - {StorageUtils.formatStory(values).title}
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

export default DeleteStoriesForm;
