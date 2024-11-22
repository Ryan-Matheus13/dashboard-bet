import React from "react";
import { Button as MuiButton } from "@mui/material";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  id,
  label,
  onClick,
  disabled = false,
  color = "primary",
  variant = "contained",
  ...rest
}) => {
  return (
    <MuiButton
      id={id}
      name={id}
      onClick={onClick}
      disabled={disabled}
      color={color}
      variant={variant}
      fullWidth
      {...rest}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
