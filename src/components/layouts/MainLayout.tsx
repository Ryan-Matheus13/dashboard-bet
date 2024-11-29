import React, { useState } from "react";
import Head from "next/head";
import styles from "./MainLayout.module.css";
import Menu from "../common/Menu/Menu";
import Header from "../common/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store";
import { Provider } from "react-redux";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState("5rem");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(isOpen ? false : true);
    setMenuWidth((prevWidth) => (prevWidth === "5rem" ? "12rem" : "5rem"));
  };
  return (
    <Provider store={store}>
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
        <div className={styles.content}>
          <div className={styles.pageContainer}>{children}</div>
        </div>
      </main>
    </Provider>
  );
};

export default MainLayout;
