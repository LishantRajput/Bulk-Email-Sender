import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Users from "./pages/Smtp";
import Settings from "./pages/Settings";
import SMTP from "./pages/SMTP";
import { useEffect } from "react";
import { useAuthState } from "./hooks/AuthState";
import Reports from "./pages/Reports";

function App() {
const {isLogin} = useAuthState()
const navigate = useNavigate()
  useEffect(() => {
    if (isLogin)
      navigate("/")
    else
      navigate("/login")
  }, [isLogin])
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/smtp" element={<SMTP />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  );
}

export default App;