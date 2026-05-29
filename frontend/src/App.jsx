import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Smtp from "./pages/Smtp";
import { useEffect } from "react";
import { useAuthState } from "./hooks/AuthState";
import Reports from "./pages/Reports";
import api from "./services/api";

function App() {
  const { isLogin,setIsLogin,setUser } = useAuthState()
  const navigate = useNavigate()

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await api.get("/auth/me", {
        withCredentials: true,
      });

      setIsLogin(true);
      setUser(response.data.user);

    } catch (error) {
      console.log(error);

      setIsLogin(false);
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/login" element={<Login />} />
      <Route path="/emails" element={<Emails />} />
      <Route path="/smtp" element={<Smtp />} />
    </Routes>
  );
}

export default App;