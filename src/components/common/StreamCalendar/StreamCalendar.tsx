/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import StreamCard from "../StreamCard/StreamCard";
import styles from "./StreamCalendar.module.css";
// import Cookies from "cookies";
import Modal from "../Modal/Modal";
import AddStreamForm from "@/components/forms/AddStreamForm/Form";
// import { setStreams } from "@/store/applicationStore/actions";
import router from "next/router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
// import { useAppDispatch } from "@/store/hooks/useAppDispatch";

export default function StreamCalendar({
  streams,
  games,
  error,
  openAddForm,
  closeAddForm,
}: any) {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) {
      // dispatch(setStreams(streams));
      toast.success("Dados Carregados!");
    }
  }, [streams]);

  useEffect(() => {
    if (error == "Token não fornecido.") {
      toast.error(String(error));
      router.push("/auth/login");
      return;
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
        {!streams && <Loading />}
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
                            onEdit={() => handleOpenModal(stream)}
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
      {/* <Modal
        maxWidth="1000px"
        open={isOpen}
        close={handleClose}
        title={"Criar Nova Stream"}
      >
        <EditStreamForm />
      </Modal> */}
    </>
  );
}
