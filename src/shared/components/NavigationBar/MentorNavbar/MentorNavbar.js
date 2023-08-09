import React from "react";

const MentorNavbar = () => {
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

export default MentorNavbar;
