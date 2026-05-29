import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../hooks/AuthState";
import api from "../services/api";
import { useState } from "react";

function Navbar({ setSidebarOpen }) {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-400",
    "bg-orange-300"
  ];
  const itemStyle = {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  };

  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  const { user } = useAuthState()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const usercheck = () => {
    console.log(user)
  }
  const handleLogout = async () => {
    try {

      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-red-400 shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <FaBars size={22} />
        </button>

        <h1 className="text-lg sm:text-2xl font-bold text-white">
          Bulk Email Dashboard
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div style={{ position: "relative", display: "inline-block" }}>

          {/* Button */}
          <button
            className="rounded-full py-3 px-8 bg-blue-600 text-white cursor-pointer "
            onClick={() => { setOpen(!open), console.log(open) }}>
            {user?.name} ▼
          </button>

          {/* Dropdown */}
          {open && (
            <div className="w-[280px] absolute rounded-[10px] shadow-md bg-gray-100">
              <div style={itemStyle}>{user?.email}</div>
              <div style={itemStyle}>SMTP Configration</div>
              <div
                className="text-red-400"
                style={itemStyle}
                onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;