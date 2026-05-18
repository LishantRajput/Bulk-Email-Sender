import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../hooks/AuthState";

function Navbar({ setSidebarOpen }) {
  const {setIsLogin} = useAuthState()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false)
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
        
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          A
        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;