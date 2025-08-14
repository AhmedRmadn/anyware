import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export default function ResourceCard({
  title,
  subtitle,
  extra,
  actions,
  variant = "outlined",
}) {
  const theme = useTheme();

  return (
    <Card
      variant={variant}
      sx={{
        mb: 2,
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <CardContent sx={{ pb: actions && actions.length > 0 ? 1 : 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {extra && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {typeof extra === "string" ? (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontStyle: "italic",
                  backgroundColor: "action.hover",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {extra}
              </Typography>
            ) : (
              extra
            )}
          </Box>
        )}
      </CardContent>

      {actions && actions.length > 0 && (
        <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {actions.map((action, idx) => {
              const buttonClass =
                action.label === "Edit"
                  ? "resource-action-btn edit"
                  : action.label === "Delete"
                  ? "resource-action-btn delete"
                  : "resource-action-btn";

              return (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={buttonClass}
                >
                  {action.label}
                </button>
              );
            })}
          </Box>
        </CardActions>
      )}
    </Card>
  );
}
