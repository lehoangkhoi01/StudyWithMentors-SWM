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
import { Link, useLocation } from "react-router-dom";
import logoPath from "../../../assets/logo.png";
import { APP_NAME, BUTTON_LABEL } from "../../constants/common";
import {
  ADMIN_MANAGE_ACCOUNT_MENU,
  ADMIN_MANAGE_SYSTEM_MENU,
  ROUTES,
  STAFF_MANAGE_ACCOUNT_MENU,
  STAFF_MANAGE_SYSTEM_MENU,
} from "../../constants/navigation";
import Logo from "../Logo/Logo";
import style from "./Sidebar.module.scss";
import { drawerWidth } from "../../constants/globalStyle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector } from "react-redux";
import { selectAppbarTitle } from "../../../Store/slices/helperSlice";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../constants/systemType";

const SideBar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentRouter, setCurrentRoute] = React.useState(ROUTES.HOME);

  const appbarTitle = useSelector(selectAppbarTitle);
  const userInfo = useSelector(selectUserInfo);
  const location = useLocation();

  const SYSTEM_MANAGE_MENU =
    userInfo?.role === SYSTEM_ROLE.ADMIN
      ? ADMIN_MANAGE_SYSTEM_MENU
      : STAFF_MANAGE_SYSTEM_MENU;

  const ACCOUNT_MANAGE_MENU =
    userInfo?.role === SYSTEM_ROLE.ADMIN
      ? ADMIN_MANAGE_ACCOUNT_MENU
      : STAFF_MANAGE_ACCOUNT_MENU;

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
        {SYSTEM_MANAGE_MENU.map((item, index) => (
          <ListItem
            key={`system-menu${index}`}
            className={`${
              currentRouter === item.ROUTE
                ? style.sidebar__active
                : style.sidebar__listitem
            }`}
          >
            <Link to={item.ROUTE}>{item.TITLE}</Link>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List className={`${style.sidebar__list}`}>
        <ListItem
          key="account-manage"
          className={`${style.sidebar__listitemGroup}`}
        >
          Quản lí tài khoản
        </ListItem>
        {ACCOUNT_MANAGE_MENU.map((item, index) => (
          <ListItem
            key={`account-manage${index}`}
            className={`${
              currentRouter === item.ROUTE
                ? style.sidebar__active
                : style.sidebar__listitem
            }`}
          >
            <Link to={item.ROUTE}>{item.TITLE}</Link>
          </ListItem>
        ))}
      </List>

      <div className={`${style.sidebar__infoSection}`}>
        <Avatar src={props.userInfo.avatarUrl} alt={props.userInfo.fullName} />
        <div className={`${style.sidebar__userInfo}`}>
          <Typography variant="h6">{props.userInfo.fullName}</Typography>
          <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
            {props.userInfo?.role}{" "}
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

  React.useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

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
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
