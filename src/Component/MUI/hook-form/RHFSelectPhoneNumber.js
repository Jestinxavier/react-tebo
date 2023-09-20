import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';

// @mui
// ----------------------------------------------------------------------

RHFSelectPhoneNumber.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  label: PropTypes.any, // node or string
};

export default function RHFSelectPhoneNumber({ name, helperText,label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInput
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          label={label}
          {...other}
          
          
        />
      )}
    />
  );
}
