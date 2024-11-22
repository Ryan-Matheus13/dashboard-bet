import { ButtonProps } from "@mui/material";
import { ElementType } from "react";

export interface ActionButtonProps
  extends Omit<ButtonProps, "variant" | "color"> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  Icon: ElementType;
}
