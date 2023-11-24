import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Link, Typography, Stack, Container } from "@mui/material";
// routes
// import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from "../../Component/MUI/iconify";
// sections
import AuthNewPasswordForm from "../../sections/auth/AuthNewPasswordForm";
// assets
import { SentIcon } from "../../assets/icons";
import { BASE_URL_TITLE } from "../../config-global";
// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      {/* <Helmet>
        <title> New Password | {BASE_URL_TITLE}</title>
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
          <SentIcon sx={{ mb: 5, height: 96 }} />

          <Typography variant="h3" paragraph>
            Request sent successfully!
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            We&apos;ve sent a 6-digit confirmation email to your email.
            <br />
            Please enter the code in below box to verify your email.
          </Typography>

          <AuthNewPasswordForm />

          {/* <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography> */}

          {/* <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          my: 5,
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link> */}
        </Container>
      </Stack>
    </>
  );
}
