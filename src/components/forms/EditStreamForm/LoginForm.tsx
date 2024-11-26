/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./LoginForm.module.css";

import { useFormik } from "formik";

import { LoginFormValues } from "./LoginForm.types";
import { loginSchema } from "./ValidationSchema";

import InputField from "@/components/common/InputField/InputField";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { setUser, startLogin } from "@/store/applicationStore/actions";
import Loading from "@/components/common/Loading/Loading";
import StorageUtils from "@/utils/utils.helper";

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { auth } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values.username, values.password);
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
      {auth.loading && <Loading />}
      <InputField
        id="username"
        label="Usuário"
        type="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && !!formik.errors.username}
        helperText={formik.touched.username ? formik.errors.username : ""}
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password ? formik.errors.password : ""}
      />

      <div className={styles.btnRow}>
        <button className={styles.btn} type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
