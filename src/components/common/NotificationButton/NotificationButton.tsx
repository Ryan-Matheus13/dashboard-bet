import React from "react";
import { NotificationButtonProps } from "./NotificationButton.types";

import styles from "./NotificationButton.module.css";
import Icon from "@mui/icons-material/NotificationsRounded";

const NotificationButton: React.FC<NotificationButtonProps> = ({}) => {
  return (
    <div className={styles.notificationContainer}>
      <Icon fontSize={"large"} className={styles.notificationIcon} />
    </div>
  );
};

export default NotificationButton;
