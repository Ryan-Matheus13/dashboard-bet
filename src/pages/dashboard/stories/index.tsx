/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// import dynamic from "next/dynamic";
import Cookies from "cookies";
import styles from "./stories.module.css";
// import Loading from "@/components/common/Loading/Loading";
import { setMenu, setStories } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "@/components/layouts/MainLayout";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { IMenu } from "@/store/applicationStore/interfaces";
// import AddStreamForm from "@/components/forms/AddStreamForm/AddStreamForm";
import Modal from "@/components/common/Modal/Modal";

// const StreamCalendar = dynamic(
//   () => import("../../../components/common/StreamCalendar/StreamCalendar"),
//   {
//     ssr: false,
//   }
// );

export async function getServerSideProps(context: any) {
  try {
    const apiUrl = process.env.NEXT_APP_URL;

    if (!apiUrl) {
      throw new Error(
        "A variável de ambiente NEXT_APP_URL não está configurada."
      );
    }

    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get("jwt");
    if (!token) {
      throw new Error("Token não fornecido.");
    }

    const responseStories = await fetch(
      `${apiUrl}/api/core/stories?token=${token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseStories.ok) {
      const data = await responseStories.json();
      throw new Error(`${data.message}`);
    }

    const stories = await responseStories.json();

    return { props: { stories } };
  } catch (error: any) {
    return {
      props: { data: [], error: error.message },
    };
  }
}

const StoriesPage = ({ stories, error }: any) => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menu) {
      menu.data.map((menu: IMenu, index: number) => {
        if (menu.active) {
          if (index != 2) {
            dispatch(setMenu(2));
          }
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    toast.error(String(error));
    if (error == "Token não fornecido.") {
      router.push("/auth/login");
    }
  }, [error]);

  useEffect(() => {
    if (!error) {
      dispatch(setStories(stories));
      toast.success("Dados Carregados!");
    }
  }, [stories]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.stories}>
        <PageHeader
          title={"Gerenciamento de Stories"}
          buttonLabel={"Adicionar Novo Story"}
          buttonOnClick={handleOpenModal}
        />
        <div className={styles.storiesContent}></div>
      </div>
      <Modal
        maxWidth="1000px"
        open={isOpen}
        close={handleClose}
        title={"Criar Novo Story"}
      >
        {/* <AddStreamForm close={handleClose} games={[]} /> */}
        <div></div>
      </Modal>
    </>
  );
};

StoriesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StoriesPage;
