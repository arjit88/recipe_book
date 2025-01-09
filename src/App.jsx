import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utility/firebaseConfig";
import AuthToggle from "./components/AuthToggle";
import ProtectedRoute from "./utility/ProtectedRoute";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Recipes from "./pages/RecipesPage";

const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader color="#3B82F6" loading={loading} size={50} />
      </div>
    );
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
        <Route
          path="/contact"
          element={
            <ProtectedRoute user={user}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute user={user}>
              <Recipes />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Render Footer only if not on login or signup page */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
};

export default App;
