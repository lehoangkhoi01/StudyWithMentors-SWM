import React from "react";
import {
  Drawer,
  ListItemButton,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import logoPath from "../../../assets/logo.png";
import { APP_NAME } from "../../constants/common";
import { ROUTES } from "../../constants/navbar";
import Logo from "../Logo/Logo";
import style from "./Sidebar.module.scss";

const drawerWidth = 240;

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
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="Login" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to="/sign-in">Đăng nhập</Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key="Logout" disablePadding>
          <ListItemButton onClick={props.handleLogout}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
