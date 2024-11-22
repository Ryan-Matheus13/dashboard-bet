import React from "react";
import { TextField } from "@mui/material";
import { InputFieldProps } from "./InputField.types";

// const primaryColor: string = process.env.NEXT_PRIMARY_COLOR
//   ? process.env.NEXT_PRIMARY_COLOR
//   : "";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      margin="normal"
      {...rest}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.07)", // Evite o !important
        color: "white !important",
        "& input:-webkit-autofill": {
          backgroundColor: "#f0f0f0 !important", // Cor do fundo para o autofill,
          color: "white !important",
          transition: "background-color 5000s ease-in-out 0s !important",
          WebkitTextFillColor: "white",
        },
        "& input": {
          color: "white !important", // Cor do texto do input
        },
        "& .MuiInputLabel-root": {
          color: "white !important", // Cor da label
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white !important", // Cor da label quando focada
        },
        "& .MuiOutlinedInput-root": {
          "& input::placeholder": { color: "yellow" }, // Cor do placeholder para inputs internos
        },
      }}
    />
  );
};

export default InputField;
