import React from "react";
import { ProfileProps } from "./Profile.types";

import styles from "./Profile.module.css";
import { Avatar } from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDownRounded";

const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <div className={styles.profileContainer}>
      <Avatar src="/broken-image.jpg" />
      <div className={styles.arrowDownIcon}>
        <ArrowDropDown fontSize="large" />
      </div>
    </div>
  );
};

export default Profile;
