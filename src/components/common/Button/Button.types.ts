import { ButtonProps as ButtonPropsMui } from "@mui/material";

export interface ButtonProps extends Omit<ButtonPropsMui, "variant" | "color"> {
  id: string;
  label: string;
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
}
