/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import StreamCard from "../StreamCard/StreamCard";
import styles from "./StreamCalendar.module.css"; // Importando o módulo CSS
import { useAppSelector } from "@/store/hooks/useAppSelector";
import Loading from "../Loading/Loading";

export default function StreamCalendar({ data, edit }: any) {
  const { application } = useAppSelector((store) => store.application);

  return (
    <div className={styles.containerStreamCalendar}>
      {application.streams.loading && <Loading />}
      {!application.streams.loading && (
        <>
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
                      <StreamCard
                        onEdit={() => edit(stream)}
                        key={istream}
                        data={stream}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
