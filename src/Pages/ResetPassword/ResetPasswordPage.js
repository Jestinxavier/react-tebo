import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Link, Typography, Container, Stack } from "@mui/material";
// routes
// import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from "../../Component/iconify";
// sections
import AuthResetPasswordForm from "../../Component/ForgotPassword/AuthResetPasswordForm";
// assets
import { PasswordIcon } from "../../assets/icons";
// import { BASE_URL_TITLE } from '../../config-global';
// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      {/* <Helmet>
        <title> Reset Password | {BASE_URL_TITLE}</title>
      </Helmet> */}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <PasswordIcon sx={{ mb: 5, height: 96 }} />

          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography
            sx={{ color: "text.secondary", mb: 5, textAlign: "center" }}
          >
            Please enter the email address associated with your account, and we
            will email you a link to reset your password.
          </Typography>

          <AuthResetPasswordForm />
        </Container>
        {/* <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link> */}
      </Stack>
    </>
  );
}
