/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./streams.module.css";
import { setMenu } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import Cookies from "cookies";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { IMenu } from "@/store/applicationStore/interfaces";
import dynamic from "next/dynamic";
const StreamCalendar = dynamic(
  () => import("../../../components/common/StreamCalendar/StreamCalendar"),
  {
    ssr: true,
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

    const responseStream = await fetch(
      `${apiUrl}/api/core/streams?token=${token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseStream.ok) {
      const data = await responseStream.json();
      throw new Error(`${data.message}`);
    }

    const responseGames = await fetch(
      `${apiUrl}/api/core/games?token=${token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseGames.ok) {
      const data = await responseGames.json();
      throw new Error(`${data.message}`);
    }

    const streams = await responseStream.json();
    const games = await responseGames.json();

    return { props: { streams, games } };
  } catch (error: any) {
    return {
      props: { streams: [], games: [], error: error.message },
    };
  }
}

const StreamsPage = ({ streams, games, error }: any) => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menu) {
      menu.data.map((menu: IMenu, index: number) => {
        if (menu.active) {
          if (index != 0) {
            dispatch(setMenu(0));
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
          title={"Gerenciamento de Streams"}
          buttonLabel={"Adicionar Nova Stream"}
          buttonOnClick={handleOpenModal}
        />
        <div className={styles.streamsContent}>
          <StreamCalendar
            streams={streams}
            games={games}
            error={error}
            openAddForm={isOpen}
            closeAddForm={handleClose}
          />
        </div>
      </div>
    </>
  );
};

StreamsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StreamsPage;
