import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFDatePicker({ name, label,helperText, ...other }) {
  const { control, setValue } = useFormContext(); // Added setValue
  const [value, setValueState] = useState(new Date());

  return (
    <DesktopDatePicker
      label={label}
      value={value}
      fullWidth
      sx={{
        width: "100%",
        borderRadius: "15px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "15px",
        },
        // ...
      }}
      onChange={(newValue) => {
        setValueState(newValue); // Remove this line
        setValue(name, newValue); // Set the value in react-hook-form
      }}
      renderInput={(params) => (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...other}
              {...field}
              value={value} // Pass the value here
              error={!!error}
              helperText={error ? error?.message : helperText}
              name="dateTime"
              sx={{ borderRadius: "15px" }}
              {...params}
              margin="normal"
            />
          )}
        />
      )}
    />
  );
}
