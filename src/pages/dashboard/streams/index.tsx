/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./streams.module.css";
import { setMenu } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
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

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_APP_URL ? process.env.NEXT_APP_URL : "";
  return { props: { apiUrl } };
}

const StreamsPage = ({ apiUrl }: any) => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const [streams, setStreams] = useState(null);
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUrl) {
          throw new Error(
            "A variável de ambiente NEXT_APP_URL não está configurada."
          );
        }

        const responseStream = await fetch(`${apiUrl}/api/core/streams`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!responseStream.ok) {
          const data = await responseStream.json();
          throw new Error(`${data.message}`);
        }

        const responseGames = await fetch(`${apiUrl}/api/core/games`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!responseGames.ok) {
          const data = await responseGames.json();
          throw new Error(`${data.message}`);
        }

        if (responseStream.status != 200 || responseGames.status != 200) {
          if (responseStream.status == 403 || responseGames.status == 403) {
            throw new Error(`Acesso negado!`);
          }
        }

        const streamsRes = await responseStream.json();
        const gamesRes = await responseGames.json();

        setStreams(streamsRes);
        setGames(gamesRes);
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
