/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import styles from "./StoriesCalendar.module.css";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import StoryCard from "../StoryCard/StoryCard";
// import Modal from "../Modal/Modal";
// import AddStreamForm from "@/components/forms/AddStreamForm/AddStreamForm";
// import { useAppDispatch } from "@/store/hooks/useAppDispatch";

export default function StoriesCalendar({
  stories,
  error,
}: // openAddForm,
// closeAddForm,
any) {
  console.log("stories: ", stories[0]);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) {
      // dispatch(setStreams(streams));
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
  // const [currentStream, setCurrentStream] = useState<any>(null);

  // const handleClose = () => {
  //   setCurrentStream(null);
  //   setIsOpen(false);
  // };

  const handleOpenModal = (stream: any) => {
    console.log(stream);
    // setCurrentStream(stream);
    // setIsOpen(true);
  };

  return (
    <>
      <div className={styles.containerStreamCalendar}>
        {!stories && <Loading />}
        {stories && (
          <>
            {stories.map((item: any, index: any) => {
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
      {/* <Modal
        maxWidth="1000px"
        open={openAddForm}
        close={closeAddForm}
        title={"Criar Novo Story"}
      >
        <AddStoriesForm close={closeAddForm} />
      </Modal> */}
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
