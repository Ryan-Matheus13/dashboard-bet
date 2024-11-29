/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import styles from "./GameList.module.css";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import AddGamesForm from "@/components/forms/AddGamesForm/Form";

export default function GameList({
  games,
  error,
  openAddForm,
  closeAddForm,
}: any) {
  console.log("games: ", games);
  useEffect(() => {
    if (!error) {
      toast.success("Dados Carregados!");
    }
  }, [games]);

  useEffect(() => {
    if (error == "Token não fornecido.") {
      router.push("/auth/login");
    }
    if (error) {
      toast.error(String(error));
    }
  }, [error]);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [currentStory, setCurrentStory] = useState<any>(null);

  // const handleClose = () => {
  //   setCurrentStory(null);
  //   setIsOpen(false);
  // };

  const handleOpenModal = (game: any) => {
    console.log(game);
    // setCurrentStory(story);
    // setIsOpen(true);
  };

  return (
    <>
      <div className={styles.containerGameList}>
        {!games && <Loading />}
        {games && (
          <Table
            title={""}
            rows={games}
            columns={["Nome do jogo", "Ações"]}
            hiddenColumns={["gameImg", "gameLink", "id"]}
            onOpenModal={handleOpenModal}
          />
        )}
      </div>
      <Modal
        maxWidth="1000px"
        open={openAddForm}
        close={closeAddForm}
        title={"Criar Novo Game"}
      >
        <AddGamesForm close={closeAddForm} />
      </Modal>
      {/* <Modal
        maxWidth="1000px"
        open={openEditForm}
        close={closeEditForm}
        title={"Editar Story"}
      >
        <EditStoriesForm close={closeEditForm} />
      </Modal> */}
    </>
  );
}
