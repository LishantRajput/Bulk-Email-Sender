import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaEnvelope,
  FaCog,
  FaServer,
  FaTimes,
} from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";

function Sidebar({ setSidebarOpen }) {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Emails",
      path: "/emails",
      icon: <FaEnvelope />,
    },
    {
      name: "SMTP Config",
      path: "/smtp",
      icon: <FaServer />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
    {
      name: "Reports",
      path:"/reports",
      icon: <TbReportSearch/>
    }
  ];

  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">
          Bulk Mailer
        </h1>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <FaTimes size={22} />
        </button>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === menu.path
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;