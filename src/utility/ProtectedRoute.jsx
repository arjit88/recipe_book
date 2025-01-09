import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Use the imported auth object

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
