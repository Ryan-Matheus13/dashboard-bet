import { TextFieldProps } from "@mui/material";

export interface InputFieldProps extends Omit<TextFieldProps, "variant"> {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}
