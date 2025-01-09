import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Me</h1>
        <p className="text-xl sm:text-2xl mb-6">
          Hi, I'm <span className="text-blue-500">Arjit Anand</span>, the
          developer behind this app. You can reach out to me via email or
          connect with me on my social media platforms.
        </p>
        <div className="space-y-4 sm:space-y-6 mb-8">
          {" "}
          {/* Adjusted margin-bottom */}
          <p className="text-lg sm:text-xl">
            <span className="font-semibold">Email: </span>
            <a
              href="mailto:arjitanand88@gmail.com"
              className="text-blue-400 hover:text-blue-600"
            >
              arjitanand88@gmail.com
            </a>
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            {/* GitHub Icon */}
            <a
              href="https://github.com/arjit88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 relative group"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/github.png"
                alt="GitHub"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 text-sm bg-gray-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                GitHub
              </span>
            </a>
            {/* Portfolio (User Icon) */}
            <a
              href="https://arjit-anand-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 relative group"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/user.png" // User Icon
                alt="Portfolio"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 text-sm bg-gray-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Portfolio
              </span>
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/arjit-anand/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 relative group"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png"
                alt="LinkedIn"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 text-sm bg-gray-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
