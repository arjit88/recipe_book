import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../utility/firebaseConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Signup successful!");
        navigate("/");
      })
      .catch((error) => toast.error(formatFirebaseError(error)))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-gray-800 bg-opacity-10 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Signup
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Eye icon for toggling password visibility */}
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pt-6"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <FaEye className="text-gray-500" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded mt-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-white font-semibold">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className=" text-white hover:text-blue-600 hover:underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

const formatFirebaseError = (error) => {
  return error.code.split("/")[1].split("-").join(" ") || "An error occurred";
};
