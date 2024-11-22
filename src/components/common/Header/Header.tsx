import React from "react";
import styles from "./Header.module.css";

import { HeaderProps } from "./Header.types";

// import NotificationButton from "../NotificationButton/NotificationButton";
import Profile from "../Profile/Profile";

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className={styles.header + " " + className}>
      {/* <NotificationButton /> */}
      <Profile />
    </div>
  );
};

export default Header;
