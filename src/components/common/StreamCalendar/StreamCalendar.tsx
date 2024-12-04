/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import StreamCard from "../StreamCard/StreamCard";
import styles from "./StreamCalendar.module.css";
// import Cookies from "cookies";
import Modal from "../Modal/Modal";
import AddStreamForm from "@/components/forms/AddStreamForm/Form";
// import { setStreams } from "@/store/applicationStore/actions";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { destroySection } from "@/store/applicationStore/actions";
import EditStreamForm from "@/components/forms/EditStreamForm/Form";
import DeleteStreamForm from "@/components/forms/DeleteStreamForm/Form";

export default function StreamCalendar({
  streams,
  games,
  error,
  openAddForm,
  closeAddForm,
}: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error && streams) {
      if (streams.length > 0) {
        toast.success("Dados Carregados!");
      }
    }
  }, [streams]);

  useEffect(() => {
    if (
      error == "Algo deu errado!" ||
      error == "Token não fornecido." ||
      error == "Internal Server Error"
    ) {
      toast.error(String(error));
      dispatch(destroySection());
      router.push("/auth/login");
      return;
    }
    if (error) {
      toast.error(String(error));
    }
  }, [error]);

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [currentStream, setCurrentStream] = useState<any>(null);

  const handleCloseEditModal = () => {
    setCurrentStream(null);
    setIsOpenEdit(false);
  };

  const handleOpenEditModal = (game: any) => {
    setCurrentStream(game);
    setIsOpenEdit(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDelete(false);
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDelete(true);
  };

  return (
    <>
      <div className={styles.containerStreamCalendar}>
        {!streams && <Loading transparent={true} />}
        {streams && (
          <>
            {streams.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.rowStreamCalendar}>
                  <div className={styles.dayContainerStreamCalendar}>
                    <div className={styles.dayHeaderStreamCalendar}>
                      <span>{item.month + " " + item.year}</span>
                    </div>
                    <div className={styles.dayBodyStreamCalendar}>
                      <span className={styles.dayBodyNumberStreamCalendar}>
                        {item.day}
                      </span>
                      <span className={styles.dayBodyNameStreamCalendar}>
                        {item.day_name}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardsContainerStreamCalendar}>
                    {item?.data?.map((stream: any, istream: any) => {
                      return (
                        <div
                          key={istream}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <StreamCard
                            onEdit={() => handleOpenEditModal(stream)}
                            data={stream}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Modal
        maxWidth="1000px"
        open={openAddForm}
        close={closeAddForm}
        title={"Criar Nova Stream"}
      >
        <AddStreamForm close={closeAddForm} games={games || []} />
      </Modal>
      <Modal
        maxWidth="1000px"
        open={isOpenEdit}
        close={handleCloseEditModal}
        title={"Editar Stream"}
      >
        <EditStreamForm
          close={handleCloseEditModal}
          values={currentStream}
          openDelete={handleOpenDeleteModal}
          games={games || []}
        />
      </Modal>
      <Modal
        maxWidth="800px"
        minWidth="600px"
        open={isOpenDelete}
        close={handleCloseDeleteModal}
        title={""}
      >
        <DeleteStreamForm
          values={currentStream}
          close={handleCloseDeleteModal}
        />
      </Modal>
    </>
  );
}
