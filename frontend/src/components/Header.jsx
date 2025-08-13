import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, userName } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/", { replace: true });
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      <div className="text-xl font-semibold">
        Anyware Dashboard
        {isAuthenticated && userName && (
          <span className="ml-4 text-gray-600 text-sm">Hello, {userName}</span>
        )}
      </div>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}
