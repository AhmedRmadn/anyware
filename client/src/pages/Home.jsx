import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginStudent, loginInstructorAsync } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { School, Person } from "@mui/icons-material";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [role, setRole] = useState("student");
  const [studentName, setStudentName] = useState("");
  const [instructorId, setInstructorId] = useState("");

  const handleLogin = async () => {
    if (role === "student") {
      if (!studentName.trim()) return alert("Please enter your name.");
      dispatch(loginStudent(studentName.trim()));
      navigate("/app", { replace: true });
    }

    if (role === "instructor") {
      if (!instructorId.trim())
        return alert("Please enter your instructor ID.");
      const action = await dispatch(loginInstructorAsync(instructorId));
      if (loginInstructorAsync.fulfilled.match(action))
        navigate("/app", { replace: true });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <LanguageSwitcher />
      </Box>

      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <School sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
            <Typography
              variant={isMobile ? "h4" : "h3"}
              fontWeight={700}
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Anyware
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={400}>
              {t("dashboard.welcome")}
            </Typography>
          </Box>

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem
                  value="student"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Person /> Student
                </MenuItem>
                <MenuItem
                  value="instructor"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <School /> Instructor
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={role === "student" ? "Your Name" : "Instructor ID"}
              placeholder={
                role === "student"
                  ? "Enter your full name"
                  : "Enter your instructor ID"
              }
              value={role === "student" ? studentName : instructorId}
              onChange={(e) =>
                role === "student"
                  ? setStudentName(e.target.value)
                  : setInstructorId(e.target.value)
              }
              sx={{ mb: 3 }}
              required
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          {/* Footer */}
          <Box
            textAlign="center"
            mt={4}
            pt={3}
            borderTop={1}
            borderColor="divider"
          >
            <Typography variant="body2" color="text.secondary">
              Educational Management System
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mt={1}
            >
              Version 1.0
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
