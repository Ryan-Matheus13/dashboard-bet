import React from "react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Controle de Recurso</title>
      </Head>
      {children}
    </>
  );
};

export default AuthLayout;
