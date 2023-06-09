import React from "react";
import {
  Drawer,
  ListItem,
  List,
  Divider,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logoPath from "../../../assets/logo.png";
import { APP_NAME, BUTTON_LABEL } from "../../constants/common";
import { ROUTES } from "../../constants/navigation";
import Logo from "../Logo/Logo";
import style from "./Sidebar.module.scss";
import { drawerWidth } from "../../constants/globalStyle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector } from "react-redux";
import { selectAppbarTitle } from "../../../Store/slices/helperSlice";

const SideBar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const appbarTitle = useSelector(selectAppbarTitle);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <div className={`${style.sidebar__appname}`}>
        <Logo
          src={logoPath}
          height="100%"
          width="100%"
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 0.5,
            width: "2.5em",
            height: "2em",
            transform: "scale(0.8)",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to={ROUTES.HOME}
          sx={{
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {APP_NAME}
        </Typography>
      </div>

      <Divider />
      <List className={`${style.sidebar__list}`}>
        <ListItem
          key="system-manage"
          className={`${style.sidebar__listitemGroup}`}
        >
          Quản lí hệ thống
        </ListItem>
        <ListItem className={`${style.sidebar__listitem}`}>
          <Link to={ROUTES.ADMIN_SEMINAR_LIST}>Quản lí mentor</Link>
        </ListItem>
        <ListItem className={`${style.sidebar__listitem}`}>
          <Link>Quản lí mentor</Link>
        </ListItem>
        <ListItem className={`${style.sidebar__listitem}`}>
          <Link to={ROUTES.SEMINAR_LIST}>Quản lí sự kiện</Link>
        </ListItem>
      </List>
      <Divider />

      <List className={`${style.sidebar__list}`}>
        <ListItem
          key="account-manage"
          className={`${style.sidebar__listitemGroup}`}
        >
          Quản lí tài khoản
        </ListItem>
        <ListItem key="account" className={`${style.sidebar__listitem}`}>
          <Link>Tài khoản</Link>
        </ListItem>
      </List>

      <div className={`${style.sidebar__infoSection}`}>
        <Avatar src={props.userInfo.avatarUrl} alt={props.userInfo.fullName} />
        <div className={`${style.sidebar__userInfo}`}>
          <Typography variant="h6">{props.userInfo.fullName}</Typography>
          <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
            {props.userInfo.role}{" "}
            <ExitToAppIcon
              className={`${style.sidebar__icon}`}
              titleAccess={BUTTON_LABEL.LOGOUT}
              onClick={props.handleLogout}
            />
          </Typography>
        </div>
      </div>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          ml: { xl: `${drawerWidth}px` },
          backgroundColor: "#1A237E",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xl: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {appbarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { xl: drawerWidth }, flexShrink: { xl: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", xl: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", xl: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
