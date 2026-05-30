
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { errorEmitter, successEmitter } from "../utils/toastemitter";
import { useAuthState } from "../hooks/AuthState";

const Login = () => {

  var message
  const [activeTab, setActiveTab] = useState("login");
  const {loading, setLoading,isLogin, setIsLogin,user,setUser} = useAuthState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response)
      setUser(response.data.user)
      setIsLogin(true)
      navigate("/");
      successEmitter("Login Successfull")
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message)
        message = error?.response?.data?.message
      else message = "Login Failed"
      errorEmitter(message)
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      successEmitter("Registration Successful");

      setActiveTab("login");
    } catch (error) {
      console.log(error);


      if (error?.response?.data?.message)
        message = error?.response?.data?.message
      else message = "Registration Failed"
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Email Sender
              </h1>
              <p className="text-slate-500 mt-2">
                Secure bulk email management
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === "login"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setActiveTab("register")}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === "register"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form className="space-y-5" onSubmit={handleRegister}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your passwoed"
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-slate-500">
                Secure authentication with session management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;