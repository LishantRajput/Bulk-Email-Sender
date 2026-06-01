import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Smtp from "./pages/Smtp";
import Reports from "./pages/Reports";

import { useAuthState } from "./hooks/AuthState";
import api from "./services/api";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { isLogin, setIsLogin, setUser } = useAuthState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // 1. Session check ONLY ONCE
  useEffect(() => {
    checkSession();
  }, []);

  // 2. Redirect ONLY after loading complete
  useEffect(() => {
    if (!loading && isLogin === false) {
      navigate("/login");
    }
  }, [isLogin, loading, navigate]);

  const checkSession = async () => {
    try {
      console.log("Checking session...");

      const response = await api.get("/auth/me", {
        withCredentials: true,
      });

      setIsLogin(true);
      setUser(response.data.user);

      console.log("User logged in");
    } catch (error) {
      console.log("Session invalid");

      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  console.log("Auth State:", { isLogin });

  // 3. Prevent UI flicker
  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/login" element={<Login />} />
      <Route path="/emails" element={<Emails />} />
      <Route path="/smtp" element={<Smtp />} />
    </Routes>
  );
}

export default App;