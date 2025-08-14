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
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Course</label>
        <select
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
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

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
