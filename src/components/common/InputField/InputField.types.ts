/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextFieldProps } from "@mui/material";

export interface InputFieldProps extends Omit<TextFieldProps, "variant"> {
  id: string;
  label: string;
  type?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
  accept?: string;
}
