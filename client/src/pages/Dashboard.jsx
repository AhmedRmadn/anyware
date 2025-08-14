import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { fetchQuizzes } from "../store/slices/quizSlice";
import { Box, Typography, Grid, Alert } from "@mui/material";
import { Announcement, Quiz, TrendingUp, Schedule } from "@mui/icons-material";
import StatCard from "../components/StatCard";
import ResourceCard from "../components/ResourceCard";
import SectionCard from "../components/SectionCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { role, instructorData } = useSelector((s) => s.auth);
  const announcementsState = useSelector((s) => s.announcements);
  const quizzesState = useSelector((s) => s.quizzes);

  const {
    list: announcements,
    loading: aLoading,
    error: aError,
  } = announcementsState;
  const { list: quizzes, loading: qLoading, error: qError } = quizzesState;

  const isLoading = aLoading || qLoading;
  const hasError = aError || qError;

  useEffect(() => {
    dispatch(fetchAnnouncements({ role, instructorId: instructorData?.id }));
    dispatch(fetchQuizzes({ role, instructorId: instructorData?.id }));
  }, [role, instructorData, dispatch]);

  const now = new Date();
  const activeQuizzes = quizzes.filter((q) => new Date(q.quizTime) >= now);
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  if (hasError) {
    return (
      <Alert severity="error">
        {t("common.error")}: {aError || qError}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("dashboard.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("dashboard.welcome")}
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Announcement}
            value={announcements.length}
            label={t("dashboard.totalAnnouncements")}
            loading={isLoading}
            link="announcements"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Quiz}
            value={quizzes.length}
            label={t("dashboard.totalQuizzes")}
            loading={isLoading}
            link="quizzes"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={TrendingUp}
            value={activeQuizzes.length}
            label={t("dashboard.upcoming")}
            loading={isLoading}
            link="quizzes"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
      </Grid>

      {/* Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <SectionCard
            icon={Schedule}
            title={t("dashboard.upcomingQuizzes")}
            items={activeQuizzes.slice(0, 3)}
            loading={isLoading}
            renderItem={(q) => (
              <ResourceCard
                key={q.id}
                title={q.title}
                subtitle={`${q.courseCode} - ${q.instructorName}`}
                extra={`${q.duration} ${t("time.minutes")} • ${new Date(
                  q.quizTime
                ).toLocaleString()}`}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SectionCard
            icon={Announcement}
            title={t("dashboard.recentAnnouncements")}
            items={recentAnnouncements}
            loading={isLoading}
            renderItem={(a) => (
              <ResourceCard
                key={a.id}
                title={a.message}
                subtitle={`${a.courseCode} - ${a.instructorName}`}
                extra={`${t("time.posted")} ${new Date(
                  a.createdAt
                ).toLocaleString()}`}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
