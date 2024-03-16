import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material/styles";
import Logo from "../Logo/Logo";
import AppBarLogo from "../Logo/AppBarLogo";
import { Icon } from "@iconify/react";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.secondary.contrastText,
  boxShadow: "0px 0px 0px",
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: "1px solid",
  borderColor: theme.palette.primary.main,
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: "100%",
  },
  "@media (max-width: 780px)": {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  const theme = useTheme();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              padding: "1px",
              mr: 2,
              flexGrow: 1,
              alignSelf: "flex-end",
              justifyContent: "flex-start",
              color: theme.palette.secondary.contrastText,
            }}
          >
            <AppBarLogo />
            {/* <Logo sx={{ width: 167, height: 34 }} /> */}
          </IconButton>
          {/* <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              alignSelf: "flex-end",
              color: theme.palette.secondary.contrastText,
            }}
          >
            MUI
          </Typography> */}
          <Box>
            <IconButton size="large" aria-label="search" color="inherit">
              <Icon icon="bi:info-circle" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </CustomAppBar>
    </Box>
  );
}
