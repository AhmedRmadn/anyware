import React, { useState } from "react";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          ml: { md: `${240}px` }, // offset for permanent sidebar
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "background.default",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
