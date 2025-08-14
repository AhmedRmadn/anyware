import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAnnouncements,
  addAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} from "../store/slices/announcementSlice";
import ResourceCard from "../components/ResourceCard";
import AnnouncementForm from "../components/AnnouncementForm";

export default function Announcements() {
  const { role, instructorData, userName } = useSelector((s) => s.auth);
  const { list, loading } = useSelector((s) => s.announcements);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (role) {
      dispatch(
        fetchAnnouncements({
          role,
          instructorId:
            role === "instructor" ? instructorData?.id || null : null,
        })
      );
    }
  }, [role, instructorData, dispatch]);

  const handleAdd = (formData) => {
    dispatch(
      addAnnouncement({
        ...formData,
        instructorId: instructorData.id,
        instructorName: userName,
      })
    );
    setShowForm(false);
  };

  const handleEdit = (formData) => {
    dispatch(
      editAnnouncement({
        id: editing.id,
        payload: {
          ...formData,
          instructorId: instructorData.id,
          instructorName: userName,
        },
      })
    );
    setEditing(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Announcements</h2>

      {role === "instructor" && !showForm && !editing && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          + Create Announcement
        </button>
      )}

      {role === "instructor" && showForm && (
        <AnnouncementForm
          courses={instructorData.courses}
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {role === "instructor" && editing && (
        <AnnouncementForm
          courses={instructorData.courses}
          initialData={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
        />
      )}

      {list.map((a) => (
        <ResourceCard
          key={a.id}
          title={a.message}
          subtitle={`${a.courseCode} - ${a.instructorName}`}
          extra={`Posted on ${new Date(a.createdAt).toLocaleString()}`}
          actions={
            role === "instructor"
              ? [
                  {
                    label: "Edit",
                    onClick: () => setEditing(a),
                    className: "bg-blue-500 text-white",
                  },
                  {
                    label: "Delete",
                    onClick: () => dispatch(removeAnnouncement(a.id)),
                    className: "bg-red-500 text-white",
                  },
                ]
              : null
          }
        />
      ))}
    </div>
  );
}
