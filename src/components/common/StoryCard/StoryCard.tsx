/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StoryCardProps } from "./StoryCard.types";
import styles from "./StoryCard.module.css"; // Importando o módulo CSS


const StoryCard = ({ data, onEdit }: StoryCardProps) => {
  return (
    <div className={styles.container}>
      teste
      {JSON.stringify(data)}
    </div>
  );
};

export default StoryCard;
