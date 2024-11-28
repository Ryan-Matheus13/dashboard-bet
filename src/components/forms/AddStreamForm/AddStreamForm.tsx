/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./AddStreamForm.module.css";

import { useFormik } from "formik";

import { AddStreamFormProps, AddStreamFormValues } from "./AddStreamForm.types";
import { addStreamSchema } from "./ValidationSchema";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { setUser, startLogin } from "@/store/applicationStore/actions";
// import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";
import SelectField from "@/components/common/SelectField/SelectField";
import { InputLabel } from "@mui/material";

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
  username: "",
  password: "",
};

const AddStreamForm: React.FC<AddStreamFormProps> = ({ close, games }) => {
  console.log("teste: ", games);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [gamesOptions, setGamesOptions] = useState<any>([]);

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
      console.log(values);
      // handleLogin(values.username, values.password);
    },
  });

  const handleLogin = async (username: string, password: string) => {
    try {
      dispatch(startLogin());
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser({ name: data.nome, token: data.token }));
        StorageUtils.setDataJwtToken(data.token);
        toast.success("Login efetuado com sucesso!");
        router.push("/dashboard/streams");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      toast.error("Erro ao tentar realizar o login.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {/* {!games && <Loading />} */}
      <div className={styles.row}>
        <InputField
          id="liveName"
          label="Nome"
          name="liveName"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username ? formik.errors.username : ""}
        />

        <InputField
          id="liveLink"
          label="Link"
          name="liveLink"
          type="text"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
        />
      </div>

      <div className={styles.row}>
        <InputField
          id="liveStartHour"
          label="Horário de Início"
          name="liveStartHour"
          type="time"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
        />

        <InputField
          id="liveEndHour"
          label="Horário de Término"
          name="liveEndHour"
          type="time"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
        />
        <SelectField
          id="weekId"
          name="weekId"
          label="Dia da Semana"
          value={formik.values.password}
          onChange={formik.handleChange}
          options={dayOptions}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
          disabled={false}
        />
      </div>

      <div className={styles.row}>
        <InputField
          id="audienceLive"
          label="Audiência"
          name="audienceLive"
          type="number"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username ? formik.errors.username : ""}
        />
        <SelectField
          id="weekId"
          name="weekId"
          label="Games"
          value={formik.values.password}
          onChange={formik.handleChange}
          options={gamesOptions}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
          disabled={false}
        />
      </div>

      <InputLabel id={"thumbImgBase64"} style={{ color: "white" }}>
        Foto do Streamer
      </InputLabel>
      <InputField
        id="thumbImgBase64"
        label=""
        name="thumbImgBase64"
        type="file"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password ? formik.errors.password : ""}
      />
      <InputLabel id={"gifImgBase64"} style={{ color: "white" }}>
        Gif do Streamer
      </InputLabel>
      <InputField
        id="gifImgBase64"
        label=""
        name="gifImgBase64"
        type="file"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password ? formik.errors.password : ""}
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
