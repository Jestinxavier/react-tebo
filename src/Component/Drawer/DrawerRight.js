import React,{ useState, useEffect } from "react";
import {Box,Card,Typography} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { styled, useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useAuthContext } from '../../auth/useAuthContext';
import { LoginSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../Routes/paths";




const IconClass = styled(Icon)(({ theme }) => ({
  "& .iconify": {
    transition: "color 0.2s ease-in-out",
  },
  "&:hover .iconify": {
    color: "red",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundImage: "linear-gradient(49deg, #021421, #072a44,#082a43)",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 3px 6px #bbb5b5b8",
  justifyContent: "center",
  alignItems: "center",
  padding: "22px",
}));

const useStyles = makeStyles((theme) => {
  console.log(theme, "theme,****123");
  return {
    iconifycolor: {
      "&:hover": {
        color: "red",
      },
      iconcolor: {
        "&:hover": {
          color: theme.palette.secondary.light,
        },
      },
    },
  };
});






export default function DrawerRight({setOpenMenu,OpenMenu,setModalOpen}) {
  const theme = useTheme();
const { user, logout } = useAuthContext();

const navigate = useNavigate();

const logOut = ()=> {
  console.log("im logOut in the")
  logout()
}
const notification = ()=> {
  console.log("im in thenotification ")
}
const mail = ()=> {
  console.log("mail im in the")
}
const support = ()=> {
  console.log("im in suopport the")
} 
const robotHealth = ()=> {
  console.log("im in robotHealth the")
}




const showAnalytics = ()=>{
  console.log('showAnalytics called');
  navigate('/analytics')
  setOpenMenu(false)
}
const shareRobot = ()=>{
  navigate('/shared-robot-list')
  setOpenMenu(false)
}
const showLogsInBot = ()=>{
  console.log('showLogsInBot called');
  navigate('/call-logs')
  setOpenMenu(false)

  
}
const showSetting = ()=>{
  navigate('/settings')
  setOpenMenu(false)

  console.log('showSetting called');
}
const showSupport = ()=>{
  console.log('showSupport called');
  navigate('/support')
  setOpenMenu(false)

  
}
const showProfile = ()=>{
  console.log('showProfile called');
  navigate('/profile')
  setOpenMenu(false)

}


const NavigationData = [
  {
    icon: "/images/icon-report.png",
    name: "ANALYTICS",
    funcation: showAnalytics,
  },
  {
    icon: "/images/icon-robot.png",
    name: "TEBO LIST",
    funcation: shareRobot ,
  },

  {
    icon: "/images/icon-setting.png",
    name: "SETTING",
    funcation: showSetting ,

  },
  {
    icon: "/images/icon-suppot.png",
    name: "SUPPORT",
    funcation: showSupport ,

  },
  {
    icon: "/images/icon-call.png",
    name: "LOGS",
    funcation: showLogsInBot ,

  },
  {
    icon: "/images/icon-profile.png",
    name: "PROFILE",
    funcation: showProfile ,

  },
];
const BottomIcon = [
  { iconname: "ph:chat-dots-fill",funcation:logOut },
  { iconname: "ant-design:notification-filled",funcation:notification },
  { iconname: "material-symbols:mail",funcation:mail},
  { iconname: "mdi:cellphone-settings-variant",funcation:support },
  { iconname: "material-symbols:ecg-heart",funcation:robotHealth },
];
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
const classes = useStyles();
  useEffect(() => {
    if(OpenMenu){
    setState({ ...state, right:OpenMenu });
   console.log( 'if(!state.right');
    }
  },[OpenMenu]);

  useEffect(() => {
   
    if(!state.right){
      setOpenMenu(false);
    }
  },[state]);
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

 
  

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}

    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={toggleDrawer(anchor, false)}
          >
            <MenuIcon />
          </Button>
        </Box>

        {/* --------------------Navigation ------------------------- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {NavigationData.map((data) => (
            <Box sx={{ padding: 1, flex: "50%", width: "100%" }}>
              <ContentBox
              onClick={()=>{
                data.funcation()
              }}
              >

                <Box
                  component="img"
                  src={data.icon}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    height: "50px",
                    width: "50px",
                    cursor: "pointer",
                  }}
                />
              </ContentBox>
              <Typography
                sx={{
                  color: theme.palette.primary.dark,
                  textAlign: "center",
                  mt: 1,
                }}
              >
                {data.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider />

        {/* -----------------------------------bottom icon------------------------- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            height: "100%",
            margin: "10px 11px",
          }}
        >
          <Card
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              height: "30px",
              mx: "3px",
              padding: "3px",
              alignItems: "center",
            }}
            onClick={()=>{
              logOut()
            }}
          >
            <IconClass
              width="100%"
              height="100%"
              icon="material-symbols:power-rounded"
              className={classes.iconifycolor}
              color={theme.palette.secondary.light}
            />
          </Card>
          {BottomIcon.map((label) => (
            <Card
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                height: "30px",
                mx: "3px",
                padding: "3px",
                alignItems: "center",
              }}
             
            >
              <Icon
                width="80%"
                height="80%"
                icon={label.iconname}
                className={classes.iconcolor}
                color={theme.palette.blueGray[900]}
                onClick={() => {
                  label.funcation(); 
                }}
              />
            </Card>
          ))}

          
        </Box>
    </Box>
  );

  return (
    <div>
     
       
        <React.Fragment key={'right'}>
          {/* <Button onClick={toggleDrawer('right', true)}>right</Button> */}
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}