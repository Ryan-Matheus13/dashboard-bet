/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StoryCardProps } from "./StoryCard.types";
import styles from "./StoryCard.module.css"; // Importando o módulo CSS

const StoryCard = ({ data, onEdit, cdnUrl }: StoryCardProps) => {
  return (
    <div className={styles.container} onClick={() => onEdit(data)}>
      <span className={styles.storyTitle}>{data.story_title}</span>
      <div className={styles.storyThumbContainer}>
        <img
          className={styles.storyThumb}
          src={cdnUrl + data.story_thumbnail}
          alt={data.story_description}
        />
      </div>
    </div>
  );
};

export default StoryCard;
