/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import Cookies from "cookies";
import styles from "./stories.module.css";
import { setMenu } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { IMenu } from "@/store/applicationStore/interfaces";

const StoriesCalendar = dynamic(
  () => import("../../../components/common/StoriesCalendar/StoriesCalendar"),
  {
    ssr: false,
  }
);

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
      props: { stories: [], games: [], error: error.message },
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
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  
  return (
    <>
      <div className={styles.streams}>
        <PageHeader
          title={"Gerenciamento de Stories"}
          buttonLabel={"Adicionar Novo Story"}
          buttonOnClick={handleOpenModal}
        />
        <div className={styles.streamsContent}>
          <StoriesCalendar
            stories={stories}
            error={error}
            openAddForm={isOpen}
            closeAddForm={handleClose}
          />
        </div>
      </div>
    </>
  );
};

StoriesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StoriesPage;
