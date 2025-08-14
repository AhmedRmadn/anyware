import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Language } from "@mui/icons-material";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Language sx={{ fontSize: isMobile ? 20 : 24, color: "primary.main" }} />
      <Typography
        variant={isMobile ? "caption" : "body2"}
        sx={{
          color: "text.secondary",
          display: { xs: "none", sm: "block" },
        }}
      >
        {t("common.language")}:
      </Typography>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={handleLanguageChange}
        size={isMobile ? "small" : "medium"}
        sx={{
          "& .MuiToggleButton-root": {
            px: isMobile ? 1 : 2,
            py: isMobile ? 0.5 : 1,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            minWidth: isMobile ? 40 : 60,
          },
        }}
      >
        <ToggleButton value="en" aria-label="English">
          {t("common.english")}
        </ToggleButton>
        <ToggleButton value="ar" aria-label="Arabic">
          {t("common.arabic")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
