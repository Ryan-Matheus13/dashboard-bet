/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./GameList.module.css";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import AddGamesForm from "@/components/forms/AddGamesForm/Form";
import EditGamesForm from "@/components/forms/EditGamesForm/Form";
import DeleteGamesForm from "@/components/forms/DeleteGamesForm/Form";

export default function GameList({
  games,
  error,
  openAddForm,
  closeAddForm,
}: any) {
  useEffect(() => {
    if (!error && games) {
      if (games.length > 0) {
        toast.success("Dados Carregados!");
      }
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

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [currentGame, setCurrentGame] = useState<any>(null);

  const handleCloseEditModal = () => {
    setCurrentGame(null);
    setIsOpenEdit(false);
  };

  const handleOpenEditModal = (game: any) => {
    setCurrentGame(game);
    setIsOpenEdit(true);
  };

  const handleCloseDeleteModal = () => {
    setCurrentGame(null);
    setIsOpenDelete(false);
  };

  const handleOpenDeleteModal = (game: any) => {
    setCurrentGame(game);
    setIsOpenDelete(true);
  };

  return (
    <>
      <div className={styles.containerGameList}>
        {!games && <Loading transparent={true} />}
        {games && (
          <Table
            title={""}
            rows={games}
            columns={["Nome do jogo", "Icone", "Ações"]}
            hiddenColumns={["gameLink", "id"]}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </div>
      <Modal
        maxWidth="1200px"
        minWidth="800px"
        open={openAddForm}
        close={closeAddForm}
        title={"Criar Novo Game"}
      >
        <AddGamesForm close={closeAddForm} />
      </Modal>
      <Modal
        maxWidth="1200px"
        minWidth="800px"
        open={isOpenEdit}
        close={handleCloseEditModal}
        title={"Editar Game"}
      >
        <EditGamesForm values={currentGame} close={handleCloseEditModal} />
      </Modal>
      <Modal
        maxWidth="800px"
        minWidth="600px"
        open={isOpenDelete}
        close={handleCloseDeleteModal}
        title={""}
      >
        <DeleteGamesForm values={currentGame} close={handleCloseDeleteModal} />
      </Modal>
    </>
  );
}
