import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { SelectFieldProps } from "./SelectField.types";

import styles from "./SelectField.module.css";

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  background,
  disabled,
  label,
  value,
  onChange,
  options,
  error = false,
  helperText,
  ...rest
}) => {
  return (
    <>
      {background == "light" && (
        <FormControl
          className={styles.select}
          error={error}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.07)", // Evite o !important
            color: "#333 !important",
            minWidth: 200,

            "& input:-webkit-autofill": {
              backgroundColor: "#f0f0f0 !important", // Cor do fundo para o autofill,
              color: "#333 !important",
              transition: "background-color 5000s ease-in-out 0s !important",
              WebkitTextFillColor: "#333",
            },
            "& input": {
              color: "#333 !important", // Cor do texto do input
            },
            "& .MuiInputLabel-root": {
              color: "#333 !important", // Cor da label
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#333 !important", // Cor da label quando focada
            },
            "& .MuiOutlinedInput-root": {
              "& input::placeholder": { color: "yellow" }, // Cor do placeholder para inputs internos
            },
            "& .MuiSelect-select": {
              color: "#fff",
            },
          }}
        >
          {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
          <Select
            labelId={`${id}-label`}
            id={id}
            disabled={disabled ? true : false}
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            {...rest}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
      {background != "light" && (
        <FormControl
          className={styles.select}
          error={error}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.07)", // Evite o !important
            color: "white !important",
            minWidth: 200,

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
            "& .MuiSelect-select": {
              color: "#fff",
            },
          }}
        >
          {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
          <Select
            labelId={`${id}-label`}
            id={id}
            disabled={disabled ? true : false}
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            {...rest}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    </>
  );
};

export default SelectField;
