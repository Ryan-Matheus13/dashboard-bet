import React from "react";
import { Button as MuiButton } from "@mui/material";
import { ActionButtonProps } from "./ActionButton.types";
import styles from "./ActionButton.module.css";

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  color = "primary",
  variant = "contained",
  Icon,
  ...rest
}) => {
  return (
    <MuiButton
      className={styles.actionButton}
      onClick={onClick}
      disabled={disabled}
      color={color}
      variant={variant}
      {...rest}
    >
      <Icon className={styles.actionButtonIcon} />
    </MuiButton>
  );
};

export default ActionButton;
