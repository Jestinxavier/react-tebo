import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// components
import FormProvider, { RHFTextField } from '../MUI/hook-form';
import axios from '../../utils/axios';
import { useSnackbar } from "../MUI/snackbar";
import { useTheme } from '@mui/material/styles';


import { ADMIN } from '../../config-global';

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
const theme = useTheme()
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      sessionStorage.setItem('email-recovery', data.email);
      const apiResult = await axios.post('/owner/forgot-password', { email_id: data.email });
      if (apiResult) {
        const ownerSecretKey = await apiResult?.data?.data?.owner?.secret_key;
        // const agentSecretKey = await apiResult?.data?.data?.agent?.secret_key;

        sessionStorage.setItem('secret-key', ownerSecretKey);

         navigate('/forgot-password');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        color="secondary"
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
