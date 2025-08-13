import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-gray-100">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
}
