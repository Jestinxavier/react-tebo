import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
RHFDatePicker.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFDatePicker({ name, label,helperText,value, ...other }) {
  const { control, setValue,watch } = useFormContext(); // Added setValue
 const getValue = watch()
  const [values, setValueState] = useState(null);
  useEffect(() => {  
    setValueState(dayjs(getValue[name]).$d)
  }, [getValue])

  
  console.log(values,"value ", getValue[name],dayjs(getValue[name]).$d)

  return (
    <DesktopDatePicker
      label={label}
      value={values}
      defaultValue={dayjs(getValue[name])}
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
              value={values} // Pass the value here
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
