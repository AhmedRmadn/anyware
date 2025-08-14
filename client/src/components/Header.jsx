import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Dashboard,
  Quiz,
  Announcement,
  Logout,
} from "@mui/icons-material";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ onMenuClick }) {
  const { isAuthenticated, userName } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    dispatch(logout());
    navigate("/", { replace: true });
    handleClose();
  }

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side - Title and Menu Button */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="div"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              cursor: "pointer",
            }}
            onClick={() => navigate("/app")}
          >
            Anyware
          </Typography>

          {isAuthenticated && userName && !isMobile && (
            <Typography
              variant="body2"
              sx={{
                ml: 3,
                color: "text.secondary",
                display: { xs: "none", md: "block" },
              }}
            >
              {t("dashboard.welcome")}, {userName}
            </Typography>
          )}
        </Box>

        {/* Right side - Language Switcher and User Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LanguageSwitcher />

          {isAuthenticated && (
            <>
              <Divider orientation="vertical" flexItem />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                  {userName ? (
                    userName.charAt(0).toUpperCase()
                  ) : (
                    <AccountCircle />
                  )}
                </Avatar>
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem onClick={() => handleNavigation("/app")}>
                  <Dashboard sx={{ mr: 2 }} />
                  {t("navigation.dashboard")}
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/app/quizzes")}>
                  <Quiz sx={{ mr: 2 }} />
                  {t("navigation.quizzes")}
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation("/app/announcements")}
                >
                  <Announcement sx={{ mr: 2 }} />
                  {t("navigation.announcements")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 2 }} />
                  {t("navigation.logout")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
