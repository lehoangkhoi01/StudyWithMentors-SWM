import React from "react";
import {
  Drawer,
  ListItemButton,
  ListItem,
  List,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import logoPath from "../../../assets/logo.png";
import { APP_NAME } from "../../constants/common";
import { ROUTES } from "../../constants/navigation";
import Logo from "../Logo/Logo";
import style from "./Sidebar.module.scss";
import { drawerWidth } from "../../constants/globalStyle";

const SideBar = (props) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
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
          <Link>Quản lí mentor</Link>
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

        <ListItem key="Logout" className={`${style.sidebar__listitem}`}>
          <ListItemButton
            className={`${style.sidebar__listitemButton}`}
            onClick={props.handleLogout}
          >
            <ListItemText sx={{ fontWeight: "600" }} primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>

      <div className={`${style.sidebar__infoSection}`}>
        <Avatar src={props.userInfo.avatarUrl} alt={props.userInfo.fullName} />
        <div className={`${style.sidebar__userInfo}`}>
          <Typography variant="h6">{props.userInfo.fullName}</Typography>
          <Typography>{props.userInfo.role}</Typography>
        </div>
      </div>
    </Drawer>
  );
};

export default SideBar;
