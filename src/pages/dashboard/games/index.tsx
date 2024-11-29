/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./games.module.css";
import { setMenu } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { IMenu } from "@/store/applicationStore/interfaces";
import GameList from "@/components/common/GameList/GameList";

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_APP_URL ? process.env.NEXT_APP_URL : "";

  return { props: { apiUrl } };
}

const GamesPage = ({ apiUrl }: any) => {
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

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

        const responseGames = await fetch(`${apiUrl}/api/core/games`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!responseGames.ok) {
          const data = await responseGames.json();
          throw new Error(`${data.message}`);
        }

        if (responseGames.status != 200) {
          if (responseGames.status == 403) {
            throw new Error(`Acesso negado!`);
          }
        }

        const gamesRes = await responseGames.json();

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
      <div className={styles.games}>
        <PageHeader
          title={"Gerenciamento de Games"}
          buttonLabel={"Adicionar Novo Game"}
          buttonOnClick={handleOpenModal}
        />
        <div className={styles.gamesContent}>
          <GameList
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

GamesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default GamesPage;
