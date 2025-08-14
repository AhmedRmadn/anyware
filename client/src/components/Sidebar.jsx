import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  Quiz,
  Announcement,
  School,
  Person,
  Settings,
} from "@mui/icons-material";

const drawerWidth = 240;

const navigationItems = [
  {
    path: "/app",
    label: "navigation.dashboard",
    icon: Dashboard,
    exact: true,
  },
  {
    path: "/app/quizzes",
    label: "navigation.quizzes",
    icon: Quiz,
  },
  {
    path: "/app/announcements",
    label: "navigation.announcements",
    icon: Announcement,
  },
];

export default function Sidebar({ open, onClose, variant = "permanent" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && variant === "temporary") {
      onClose();
    }
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {t("navigation.dashboard")}
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 1 }}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path, item.exact);

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  backgroundColor: active
                    ? "rgba(255, 255, 255, 0.16)"
                    : "transparent",
                  color: active ? "white" : "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: active
                      ? "rgba(255, 255, 255, 0.24)"
                      : "rgba(255, 255, 255, 0.08)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: active ? "white" : "rgba(255, 255, 255, 0.7)",
                  },
                }}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText
                  primary={t(item.label)}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            display: "block",
          }}
        >
          Anyware v1.0
        </Typography>
      </Box>
    </Box>
  );

  if (variant === "temporary") {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "primary.main",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "primary.main",
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
}
