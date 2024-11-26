/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import StreamCard from "../StreamCard/StreamCard";
import styles from "./StreamCalendar.module.css";
// import Modal from "../Modal/Modal";
// import AddStreamForm from "@/components/forms/AddStreamForm/AddStreamForm";

export default function StreamCalendar({ data }: any) {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [currentStream, setCurrentStream] = useState<any>(null);

  // const handleClose = () => {
  //   setCurrentStream(null);
  //   setIsOpen(false);
  // };

  const handleOpenModal = (stream: any) => {
    // setCurrentStream(stream);
    // setIsOpen(true);
  };
  return (
    <>
      <div className={styles.containerStreamCalendar}>
        {data.map((item: any, index: any) => {
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
      </div>
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
