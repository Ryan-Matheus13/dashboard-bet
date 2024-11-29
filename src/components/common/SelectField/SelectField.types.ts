/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectChangeEvent } from "@mui/material";

export interface SelectFieldProps {
  id: string;
  disabled: boolean;
  name: string;
  label: string;
  value: any;
  onChange: (event: SelectChangeEvent) => void;
  options: { label: string; value: string }[];
  error?: boolean;
  helperText?: string;
}
