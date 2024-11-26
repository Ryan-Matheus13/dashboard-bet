/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import Cookies from "cookies";
import styles from "./streams.module.css";
import Loading from "@/components/common/Loading/Loading";
import { setMenu, setStreams } from "@/store/applicationStore/actions";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "@/components/layouts/MainLayout";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { IMenu } from "@/store/applicationStore/interfaces";
import AddStreamForm from "@/components/forms/AddStreamForm/AddStreamForm";
import Modal from "@/components/common/Modal/Modal";

const StreamCalendar = dynamic(
  () => import("../../../components/common/StreamCalendar/StreamCalendar"),
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
      props: { data: [], games: [], error: error.message },
    };
  }
}

const StreamsPage = ({ streams, games, error }: any) => {
  const { menu, application } = useAppSelector((store) => store.application);
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

  useEffect(() => {
    toast.error(String(error));
    if (error == "Token não fornecido.") {
      router.push("/auth/login");
    }
  }, [error]);

  useEffect(() => {
    if (!error) {
      dispatch(setStreams(streams));
      toast.success("Dados Carregados!");
    }
  }, [streams]);

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
          {!streams && <Loading />}
          {streams && (
            <StreamCalendar data={streams || application.streams.data} />
          )}
        </div>
      </div>
      <Modal
        maxWidth="1000px"
        open={isOpen}
        close={handleClose}
        title={"Criar Nova Stream"}
      >
        <AddStreamForm close={handleClose} games={games} />
      </Modal>
    </>
  );
};

StreamsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default StreamsPage;
