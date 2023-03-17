import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledMenu } from "./StyledMenu";
import style from "./NavigationBar.module.scss";
import { APP_NAME } from "../../constants";
import logoPath from "../../../assets/logo.png";
import Logo from "../Logo/Logo";
import { NAVIGATION_TITLE } from "../../constants";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" className={`${style.navigation__appBar}`}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo
              src={logoPath}
              height="100%"
              width="100%"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                width: "2em",
                height: "2em",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {APP_NAME}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none" } }}>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {NAVIGATION_TITLE.map((item) => (
                  <MenuItem
                    className={`${style.navigation__menuItem}`}
                    key={item.TITLE}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{item.TITLE}</Typography>
                  </MenuItem>
                ))}
              </StyledMenu>
            </Box>
            <Logo
              src={logoPath}
              height="100%"
              width="100%"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 2,
                width: "1.5em",
                height: "1.5em",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {APP_NAME}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
              className={`${style.navigation__titleContainer}`}
            >
              {NAVIGATION_TITLE.map((item) => (
                <Button
                  className={`${style.navigation__title}`}
                  key={item.TITLE}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 2, color: "white", display: "block" }}
                >
                  {item.TITLE}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, display: { xs: "none", md: "block" } }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip> */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavigationBar;
