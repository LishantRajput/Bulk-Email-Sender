import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar Section */}
        <div className="min-h-screen bg-gray-100 flex">

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
        fixed lg:static top-0 left-0 z-50
        h-screen transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
          >
            <Sidebar setSidebarOpen={setSidebarOpen} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">

          {/* Navbar */}
          <Navbar setSidebarOpen={setSidebarOpen} />

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;