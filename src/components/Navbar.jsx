import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utility/firebaseConfig";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosPerson } from "react-icons/io";

const API_KEY = "7a813ccb2de44af7855accb1c25c0b69";
const BASE_URL = "https://api.spoonacular.com/recipes";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  // Handle search functionality
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 3) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/autocomplete?query=${searchQuery}&apiKey=${API_KEY}&number=5`
        );
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 100);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle recipe selection
  const handleRecipeSelect = (recipeId) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(`/recipe/${recipeId}`);
  };

  // Handle logout functionality
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred during logout. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 200);
  };

  // Listen to scroll events and toggle background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        scrolling ? "bg-[rgba(0,0,0,0.85)]" : "bg-transparent"
      } text-white p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10 px-14 w-full transition-all duration-300`}
    >
      <Link to="/">
        <img src={"/cook.png"} alt="Logo" className="w-14" />
      </Link>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden flex items-center">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl cursor-pointer transition-all duration-300"
        >
          {menuOpen ? (
            <FaTimes className="text-white" />
          ) : (
            <FaBars className="text-white" />
          )}
        </div>
      </div>

      {/* Desktop Menu: Centered Search Bar and User Info */}
      <div className="flex-1 hidden md:flex justify-center relative">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center w-1/2"
        >
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={() => setSearchQuery(searchQuery)}
          />
        </form>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-16 left-60 right-60 z-40 bg-gray-300 text-black p-4 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
            <ul>
              {searchResults.map((recipe) => (
                <li
                  key={recipe.id}
                  className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer transition-all"
                  onClick={() => handleRecipeSelect(recipe.id)}
                >
                  {recipe.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop User Info and Logout */}
      <div className="hidden md:flex items-center space-x-4">
        {user && (
          <div className="flex items-center">
            <span className="relative mr-4 flex items-center justify-center group">
              <IoIosPerson className="text-2xl hover:text-blue-500" />
              <span>{user.email || "Guest"}</span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Hi👋{user.email || "Guest"}
              </div>
            </span>

            <button
              onClick={handleLogout}
              className="relative bg-red-500 hover:bg-red-600 hover:text-gray-300 px-4 py-2 rounded flex items-center group"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border animate-spin w-4 h-4 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                <FiLogOut />
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-700 bg-opacity-70 p-6 space-y-6 transition-all duration-300 mt-4 rounded-md mx-3">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-full bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setSearchQuery(searchQuery)}
            />
          </form>

          {/* Show search results in mobile dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="mt-4">
              <ul>
                {searchResults.map((recipe) => (
                  <li
                    key={recipe.id}
                    className="py-2 px-4 border-b border-gray-300 hover:bg-gray-800 hover:text-white rounded-md cursor-pointer transition-all"
                    onClick={() => handleRecipeSelect(recipe.id)}
                  >
                    {recipe.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* User and Logout in mobile menu */}
          {user && (
            <div className="flex items-center justify-between">
              <div></div>
              <span className="relative mr-4 flex items-center justify-center group">
                <IoIosPerson className="text-2xl hover:text-blue-500" />
                <span>{user.email || "Guest"}</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Hi👋{user.email || "Guest"}
                </div>
              </span>
              <button
                onClick={handleLogout}
                className="relative bg-red-500 text-white px-4 py-2 rounded group"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border animate-spin w-4 h-4 border-4 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <FiLogOut />
                )}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </div>
              </button>
            </div>
          )}

          {!user && <span className="text-white">Guest</span>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
