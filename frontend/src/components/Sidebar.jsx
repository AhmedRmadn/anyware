import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/quizzes", label: "Quizzes" },
  { to: "/app/announcements", label: "Announcements" },
];

export default function Sidebar() {
  return (
    <nav className="p-4 space-y-2">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === "/app"}
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition-colors ${
              isActive
                ? "bg-white text-black"
                : "text-gray-200 hover:bg-white hover:text-black"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
