import React, { useState } from "react";
import Head from "next/head";
import styles from "./MainLayout.module.css";
import Menu from "../common/Menu/Menu";
import Header from "../common/Header/Header";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState("5rem");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(isOpen ? false : true);
    setMenuWidth((prevWidth) => (prevWidth === "5rem" ? "15rem" : "5rem"));
  };
  return (
    <>
      <Head>
        <title>Controle de Recurso</title>
      </Head>
      <main
        className={styles.main}
        style={{
          gridTemplateColumns: `${menuWidth} auto`,
        }}
      >
        <Header className={styles.header} />
        <Menu isOpen={isOpen} toggle={toggleMenu} className={styles.menu} />
        <div className={styles.content}>{children}</div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default MainLayout;
