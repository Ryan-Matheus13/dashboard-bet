/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./StoriesCalendar.module.css";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import StoryCard from "../StoryCard/StoryCard";
import Modal from "../Modal/Modal";
import AddStoriesForm from "@/components/forms/AddStoriesForm/Form";
import EditStoriesForm from "@/components/forms/EditStoriesForm/Form";
import DeleteStoriesForm from "@/components/forms/DeleteStoriesForm/Form";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { destroySection } from "@/store/applicationStore/actions";

export default function StoriesCalendar({
  stories,
  error,
  cdnUrl,
  openAddForm,
  closeAddForm,
}: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error && stories) {
      if (stories.length > 0) {
        toast.success("Dados Carregados!");
      }
    }
  }, [stories]);

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
  const [currentStory, setCurrentStory] = useState<any>(null);

  const handleCloseEditModal = () => {
    setCurrentStory(null);
    setIsOpenEdit(false);
  };

  const handleOpenEditModal = (game: any) => {
    setCurrentStory(game);
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
      <div className={styles.containerStoriesCalendar}>
        {!stories && <Loading transparent={true} />}
        {stories && (
          <>
            {stories.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.rowStoriesCalendar}>
                  <div className={styles.dayContainerStoriesCalendar}>
                    <div className={styles.dayHeaderStoriesCalendar}>
                      <span>{item.month + " " + item.year}</span>
                    </div>
                    <div className={styles.dayBodyStoriesCalendar}>
                      <span className={styles.dayBodyNumberStoriesCalendar}>
                        {item.day}
                      </span>
                      <span className={styles.dayBodyNameStoriesCalendar}>
                        {item.day_name}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardsContainerStoriesCalendar}>
                    {item?.data?.map((story: any, istory: any) => {
                      return (
                        <div
                          key={istory}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <StoryCard
                            onEdit={() => handleOpenEditModal(story)}
                            data={story}
                            cdnUrl={cdnUrl}
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
        title={"Criar Novo Story"}
      >
        <AddStoriesForm close={closeAddForm} />
      </Modal>
      <Modal
        maxWidth="1000px"
        open={isOpenEdit}
        close={handleCloseEditModal}
        title={"Editar Story"}
      >
        <EditStoriesForm
          close={handleCloseEditModal}
          values={currentStory}
          openDelete={handleOpenDeleteModal}
        />
      </Modal>
      <Modal
        maxWidth="800px"
        minWidth="600px"
        open={isOpenDelete}
        close={handleCloseDeleteModal}
        title={""}
      >
        <DeleteStoriesForm
          values={currentStory}
          close={handleCloseDeleteModal}
        />
      </Modal>
    </>
  );
}
