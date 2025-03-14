/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
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
    ssr: true,
  }
);

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_APP_URL ? process.env.NEXT_APP_URL : "";
  const cdnUrl = process.env.NEXT_CDN_URL ? process.env.NEXT_CDN_URL : "";

  return { props: { apiUrl, cdnUrl } };
}

const StoriesPage = ({ apiUrl, cdnUrl }: any) => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const [stories, setStories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUrl) {
          throw new Error(
            "A variável de ambiente NEXT_APP_URL não está configurada."
          );
        }

        const responseStories = await fetch(`${apiUrl}/api/core/stories`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!responseStories.ok) {
          const data = await responseStories.json();
          throw new Error(`${data.message}`);
        }

        if (responseStories.status != 200) {
          if (responseStories.status == 403) {
            throw new Error(`Acesso negado!`);
          }
        }

        const storiesRes = await responseStories.json();

        setStories(storiesRes);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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
      <div className={styles.stories}>
        <PageHeader
          title={"Gerenciamento de Stories"}
          buttonLabel={"Adicionar Novo Story"}
          buttonOnClick={handleOpenModal}
        />
        <div className={styles.storiesContent}>
          <StoriesCalendar
            stories={stories}
            error={error}
            cdnUrl={cdnUrl}
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
