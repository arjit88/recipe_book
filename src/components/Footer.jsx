import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgba(0,0,0,0.85)] text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            We are passionate about providing the best recipes and cooking tips
            to help you create delicious meals at home. Join our community and
            explore the joy of cooking!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#recipes"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Subscribe */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-4">
            Sign up for our newsletter to receive the latest recipes and
            updates!
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
        <Link
          to="https://github.com/arjit88"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            © {new Date().getFullYear()} RecipeApp. All Rights Reserved. |
            Designed with ❤️ by{" "}
            <span className="hover:text-blue-500 hover:underline">
              Arjit Anand
            </span>
          </p>
        </Link>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
