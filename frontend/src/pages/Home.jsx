import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

  const [name, setName] = useState("");

  function handleLogin() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    dispatch(login(name.trim()));
    navigate("/app", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Anyware</h1>
        <p className="mb-6">Enter your name to log in (mock login).</p>

        {!isAuthenticated ? (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded text-black"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 rounded bg-white text-black font-semibold"
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/app")}
            className="w-full px-4 py-2 rounded bg-white text-black font-semibold"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
