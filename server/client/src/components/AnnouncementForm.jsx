import React, { useState } from "react";

export default function AnnouncementForm({
  onSubmit,
  courses,
  initialData,
  onCancel,
}) {
  const [message, setMessage] = useState(initialData?.message || "");
  const [courseCode, setCourseCode] = useState(initialData?.courseCode || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message, courseCode });
  };

  return (
    <form className="announcement-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Enter your announcement message"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Course</label>
        <select
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="form-action-btn save">
          Post Announcement
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="form-action-btn cancel"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
