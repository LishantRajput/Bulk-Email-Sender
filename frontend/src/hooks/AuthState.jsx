import React, { createContext, useContext, useState } from "react";

export const authContext = createContext(null);

function AuthState({ children }) {

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [user, setUser] = useState({})

  return (
    <authContext.Provider
      value={{
        user, setUser, 
        loading, setLoading,
        isLogin, setIsLogin
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
