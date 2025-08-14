import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function QuizForm({ onSubmit, courses, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [courseCode, setCourseCode] = useState(initialData?.courseCode || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [quizTime, setQuizTime] = useState(
    initialData?.quizTime ? new Date(initialData.quizTime) : null
  );
  const [error, setError] = useState("");

  const validate = () => {
    if (!title || !courseCode || !duration || !quizTime) {
      return "All fields are required.";
    }
    if (duration > 120) {
      return "Duration cannot be more than 120 minutes.";
    }

    const now = new Date();
    const minDate = new Date();
    minDate.setDate(now.getDate() + 3); // at least 3 days from now

    if (quizTime < minDate) {
      return "Quiz must be scheduled at least 3 days from today.";
    }

    const quizHour = quizTime.getHours();
    if (quizHour < 8 || quizHour >= 16) {
      return "Quiz must be between 8:00 AM and 4:00 PM.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit({ title, courseCode, duration, quizTime });
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</p>
      )}

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          min="1"
          max="120"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Quiz Date & Time</label>
        <DatePicker
          selected={quizTime}
          onChange={(date) => setQuizTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full border px-3 py-2 rounded"
          placeholderText="Select date & time"
        />
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
