import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { fetchQuizzes } from "../store/slices/quizSlice";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";

export default function Dashboard() {
  const { role, instructorData } = useSelector((s) => s.auth);
  const { list: announcements } = useSelector((s) => s.announcements);
  const { list: quizzes } = useSelector((s) => s.quizzes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAnnouncements({ role, instructorId: instructorData?.id || null })
    );
    dispatch(fetchQuizzes({ role, instructorId: instructorData?.id || null }));
  }, [role, instructorData, dispatch]);

  const now = new Date();

  // Only active quizzes
  const activeQuizzes = quizzes
    .filter((q) => new Date(q.quizTime) >= now)
    .sort((a, b) => new Date(a.quizTime) - new Date(b.quizTime));

  // Latest announcements
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Announcements</h2>
          <p className="text-2xl font-bold">{announcements.length}</p>
          <Link to="announcements" className="text-blue-600 underline">
            View all
          </Link>
        </div>

        <div className="bg-green-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Active Quizzes</h2>
          <p className="text-2xl font-bold">{activeQuizzes.length}</p>
          <Link to="quizzes" className="text-green-600 underline">
            View all
          </Link>
        </div>
      </div>

      {/* Upcoming quizzes preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Quizzes</h2>
        {activeQuizzes.length > 0 ? (
          activeQuizzes
            .slice(0, 3)
            .map((q) => (
              <ResourceCard
                key={q.id}
                title={q.title}
                subtitle={`${q.courseCode} - ${q.instructorName}`}
                extra={`${q.duration} min • ${new Date(
                  q.quizTime
                ).toLocaleString()}`}
              />
            ))
        ) : (
          <p>No upcoming quizzes</p>
        )}
      </div>

      {/* Recent announcements preview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
        {recentAnnouncements.length > 0 ? (
          recentAnnouncements.map((a) => (
            <ResourceCard
              key={a.id}
              title={a.message}
              subtitle={`${a.courseCode} - ${a.instructorName}`}
              extra={`Posted on ${new Date(a.createdAt).toLocaleString()}`}
            />
          ))
        ) : (
          <p>No announcements</p>
        )}
      </div>
    </div>
  );
}
