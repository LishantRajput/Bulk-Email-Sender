import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../hooks/AuthState";
import api from "../services/api";

function Navbar({ setSidebarOpen }) {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-400",
    "bg-orange-300"
  ];

  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  const { user } = useAuthState()
  const navigate = useNavigate();
  console.log(user)
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
    <div className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <FaBars size={22} />
        </button>

        <h1 className="text-lg sm:text-2xl font-bold">
          Bulk Email Dashboard
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        <div className={`w-12 h-12 sm:w-10 sm:h-10 rounded-full ${bgColor} text-white flex items-center justify-center font-bold`}
          onClick={handleLogout}>
          {user? user.name?.charAt(0): "User"}
        </div>
        {/* <button onClick={usercheck}>
          User
        </button> */}
      </div>
    </div>
  );
}

export default Navbar;