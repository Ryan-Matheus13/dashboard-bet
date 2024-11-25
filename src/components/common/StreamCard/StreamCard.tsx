/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StreamCardProps } from "./StreamCard.types";
import styles from "./StreamCard.module.css"; // Importando o módulo CSS
import ClockIcon from "@mui/icons-material/WatchLater";
import EyeIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Cached";
import OnStreamIcon from "@mui/icons-material/Videocam";
import NoStreamIcon from "@mui/icons-material/VideocamOff";

const types: any = {
  ATUALIZACAO_AUTOMATICA: "Atualização Automática",
  OFFLINE: "Offline",
  ONLINE: "Online",
};

const StreamCard = ({ data, onEdit }: StreamCardProps) => {
  return (
    <div onClick={onEdit} className={styles.containerStreamCard}>
      {data.stream_is_living ? (
        <OnStreamIcon
          style={{ color: "green" }}
          className={styles.streamCardStatus}
        />
      ) : (
        <NoStreamIcon
          style={{ color: "red" }}
          className={styles.streamCardStatus}
        />
      )}
      <div className={styles.headerStreamCard}>
        <img
          className={styles.headerImageStreamCard}
          width={40}
          height={40}
          src={data.stream_gif}
          alt=""
        />
        <h3 className={styles.headerTitleStreamCard}>{data.stream_name}</h3>
      </div>
      <hr className={styles.divisorStreamCard} />
      <div className={styles.contentStreamCard}>
        <div className={styles.labelContainerStreamCard}>
          <ClockIcon className={styles.labelIconStreamCard} />
          <span className={styles.labelStreamCard}>
            {data.stream_start_hour + " - " + data.stream_end_hour}
          </span>
        </div>
        <div className={styles.labelContainerStreamCard}>
          {/* <i className={styles.labelIconStreamCard}>
            <i className="bi bi-eye-fill" />
          </i> */}
          <EyeIcon className={styles.labelIconStreamCard} />
          <span className={styles.labelStreamCard}>
            {data.stream_specs} assistindo
          </span>
        </div>
        <div className={styles.labelContainerStreamCard}>
          {/* <i className={styles.labelIconStreamCard}>
            <i className="bi bi-arrow-repeat" />
          </i> */}
          <RefreshIcon className={styles.labelIconStreamCard} />
          <span className={styles.labelStreamCard}>
            {types[data.stream_update_type]}
          </span>
        </div>
      </div>
      <div className={styles.gameStreamCard}>
        <div className={styles.gameItemStreamCard}>
          <img
            className={styles.gameIconStreamCard}
            src={data.stream_game.icon}
            alt=""
            width={15}
            height={15}
          />
          <span className={styles.gameNameStreamCard}>
            {data.stream_game.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreamCard;
