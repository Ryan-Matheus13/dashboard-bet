/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import styles from "./StoriesCalendar.module.css";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import StoryCard from "../StoryCard/StoryCard";
import Modal from "../Modal/Modal";
import AddStoriesForm from "@/components/forms/AddStoriesForm/Form";

export default function StoriesCalendar({
  stories,
  error,
  cdnUrl,
  openAddForm,
  closeAddForm,
}: any) {
  useEffect(() => {
    if (!error) {
      toast.success("Dados Carregados!");
    }
  }, [stories]);

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

  const handleOpenModal = (story: any) => {
    console.log(story);
    // setCurrentStory(story);
    // setIsOpen(true);
  };

  return (
    <>
      <div className={styles.containerStoriesCalendar}>
        {!stories && <Loading />}
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
                            onEdit={() => handleOpenModal(story)}
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
