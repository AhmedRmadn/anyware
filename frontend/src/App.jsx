import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Announcements from "./pages/Announcements";
import requireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

const ProtectedDashboard = requireAuth(Dashboard);
const ProtectedQuizzes = requireAuth(Quizzes);
const ProtectedAnnouncements = requireAuth(Announcements);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected area under common layout */}
      <Route
        path="/app/*"
        element={
          <Layout>
            <Routes>
              <Route path="" element={<ProtectedDashboard />} />
              <Route path="quizzes" element={<ProtectedQuizzes />} />
              <Route
                path="announcements"
                element={<ProtectedAnnouncements />}
              />
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </Layout>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
