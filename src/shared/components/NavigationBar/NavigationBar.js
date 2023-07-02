import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledMenu } from "./StyledMenu";
import style from "./NavigationBar.module.scss";
import logoPath from "../../../assets/logo.png";
import Logo from "../Logo/Logo";
import { APP_NAME } from "../../constants/common";
import {
  MENTOR_NAVBAR,
  UNAUTHORIZED_NAVBAR,
  ROUTES,
  ACCOUNT_MENU,
  AUTHENTICATION_MENU,
} from "../../constants/navigation";

import { selectUser, userAction } from "../../../Store/slices/userSlice";
import { useFetchUserInfo } from "../../../Helpers/generalHelper";
import SideBar from "../SideBar/SideBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const settings = ACCOUNT_MENU;

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentRouter, setCurrentRoute] = useState("/");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [navigationItems, setNavigationItems] = useState(UNAUTHORIZED_NAVBAR);

  const location = useLocation();
  const history = useHistory();
  const { getUserInfo } = useFetchUserInfo();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuAction = (menuItem) => {
    const action = menuItem.ACTION;
    if (action && action === "LOG_OUT") {
      handleLogout();
    }
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    dispatch(userAction.logout());
    setAuthenticated(false);
    history.push("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function fetchUserData() {
      const userInfoResponse = await getUserInfo();
      if (userInfoResponse && userInfoResponse.status === "403") {
        // expired token...
        console.log("expired token");
        localStorage.removeItem("TOKEN");
        dispatch(userAction.logout());
        setAuthenticated(false);
      } else {
        setAuthenticated(user.isAuthenticated);
        setUserInfo(userInfoResponse);
        if (userInfoResponse?.role) {
          setNavigationItems(MENTOR_NAVBAR);
        }
      }
    }
    fetchUserData();
  }, [user]);

  const renderNavbar = () => {
    return (
      <>
        <AppBar position="static" className={`${style.navigation__appBar}`}>
          <Container className={`${style.navigation__container}`}>
            <Toolbar disableGutters>
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
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {APP_NAME}
              </Typography>

              {/* Mobile screen menu */}
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
                    display: { my: 5, xs: "block", md: "none" },
                  }}
                >
                  {navigationItems.map((item) => (
                    <MenuItem
                      className={`${style.navigation__menuItem} ${
                        currentRouter === item.ROUTE
                          ? style.navigation__menuItem_active
                          : ""
                      }`}
                      key={item.TITLE}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">
                        <Link to={item.ROUTE}>{item.TITLE}</Link>
                      </Typography>
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
                  width: "2em",
                  height: "1.5em",
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to={ROUTES.HOME}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
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

              {/* Large screen */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
                className={`${style.navigation__titleContainer}`}
              >
                {navigationItems.map((item) => (
                  <Link
                    className={`${style.navigation__link}`}
                    key={item.TITLE}
                    to={item.ROUTE}
                  >
                    <Button
                      className={`${style.navigation__title} ${
                        currentRouter === item.ROUTE
                          ? style.navigation__title_active
                          : ""
                      }`}
                      onClick={handleCloseNavMenu}
                      sx={{ mx: 2, color: "white", display: "block" }}
                    >
                      {item.TITLE}
                    </Button>
                  </Link>
                ))}
              </Box>

              {isAuthenticated && userInfo ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, display: { xs: "none", md: "block" } }}
                    >
                      <Avatar
                        src={user.userInfo?.avatarUrl}
                        alt={user.userInfo?.fullName}
                      />
                    </IconButton>
                  </Tooltip>
                  <StyledMenu
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
                      <MenuItem
                        key={setting.TITLE}
                        onClick={() => handleMenuAction(setting)}
                        className={`${style.navigation__menuItem}`}
                      >
                        <Typography textAlign="center">
                          {setting.TITLE}
                        </Typography>
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </Box>
              ) : (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                  }}
                  className={`${style.navigation__titleContainer}`}
                >
                  {AUTHENTICATION_MENU.map((item) => (
                    <Link
                      className={`${style.navigation__link}`}
                      key={item.TITLE}
                      to={item.ROUTE}
                    >
                      <Button
                        className={`${style.navigation__title} ${
                          currentRouter === item.ROUTE
                            ? style.navigation__title_active
                            : ""
                        }`}
                        sx={{ mx: 2, color: "white", display: "block" }}
                      >
                        {item.TITLE}
                      </Button>
                    </Link>
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  };

  const renderSidebar = (userInfo) => {
    return <SideBar userInfo={userInfo} handleLogout={handleLogout} />;
  };

  return userInfo?.role === "STAFF" ? renderSidebar(userInfo) : renderNavbar();
}
export default NavigationBar;
