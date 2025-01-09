import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation(); // Get current location

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else if (location.pathname === "/signup") {
      setIsLogin(false);
    }
  }, [location.pathname]);

  // const toggleForm = () => {
  //   setIsLogin(!isLogin);
  //   navigate(isLogin ? "/signup" : "/login");
  // };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("/food.jpg")',
        objectFit: "cover",
        objectPosition: "center",
      }}
    >
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthToggle;
