import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth listener
import { auth } from "./utility/firebaseConfig"; // Import firebase auth config
import AuthToggle from "./components/AuthToggle";
import ProtectedRoute from "./utility/ProtectedRoute";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState(null); // Track the user state (logged in or not)
  const [loading, setLoading] = useState(true); // Track loading state while checking auth

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Set null if user is logged out
      }
      setLoading(false); // Set loading to false once auth state is checked
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // If loading is true, show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a more sophisticated loading spinner
  }

  return (
    <>
      {/* Render Navbar only if not on login or signup page */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthToggle />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <AuthToggle />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute user={user}>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer /> {/* ToastContainer for notifications */}
    </Router>
  );
};

export default App;
