import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform transition-transform duration-300 ease-in-out z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 flex flex-col">
        <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mt-16 p-6 flex-1 bg-gray-100 overflow-auto">
          {/* Your Routes or content */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
