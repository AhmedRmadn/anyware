import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent, loginInstructorAsync } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [role, setRole] = useState("student");
  const [studentName, setStudentName] = useState("");
  const [instructorId, setInstructorId] = useState("");

  async function handleLogin() {
    if (role === "student") {
      if (!studentName.trim()) {
        alert("Please enter your name.");
        return;
      }
      dispatch(loginStudent(studentName.trim()));
      navigate("/app", { replace: true });
    }

    if (role === "instructor") {
      if (!instructorId.trim()) {
        alert("Please enter your instructor ID.");
        return;
      }
      const action = await dispatch(loginInstructorAsync(instructorId));
      if (loginInstructorAsync.fulfilled.match(action)) {
        navigate("/app", { replace: true });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Anyware</h1>
        <p className="mb-6">Select your role and log in.</p>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        {role === "student" && (
          <input
            type="text"
            placeholder="Your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded text-black"
          />
        )}

        {role === "instructor" && (
          <input
            type="text"
            placeholder="Instructor ID"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded text-black"
          />
        )}

        {error && <div className="mb-4 text-red-300">{error}</div>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-white text-black font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
