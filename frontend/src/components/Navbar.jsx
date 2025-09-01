import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-xl tracking-wide">
            🎵 Rhythm
          </Link>

          {/* Search Bar (only when logged in) */}
          {/* {token && (
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white/10 rounded-xl px-3 py-1 mx-4"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search songs..."
                className="bg-transparent outline-none text-white placeholder-gray-300 px-2"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-green-500 hover:bg-green-600 rounded-xl text-white"
              >
                🔍
              </button>
            </form>
          )} */}

          {/* Links */}
          <div className="flex items-center space-x-6">
            {token ? (
              <>
                <Link
                  to="/home"
                  className={`${
                    location.pathname === "/home"
                      ? "text-white font-semibold"
                      : "text-gray-200 hover:text-white"
                  } transition`}
                >
                  Home
                </Link>

                <Link
                  to="/liked"
                  className="text-red-400 text-2xl hover:text-red-500 transition"
                  title="Liked Songs"
                >
                  ❤️
                </Link>

                <Link
                  to="/record"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                >
                  🎤 Record
                </Link>

                <Link
                  to="/recordings"
                  className="text-green-400 hover:text-green-500 transition"
                >
                  🎵 Feed
                </Link>

                <Link
                  to="/profilepage"
                  className="text-blue-400 hover:text-blue-500 transition font-medium"
                >
                  👤 Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl transition font-medium ${
                    isLogin
                      ? "bg-indigo-500 text-white shadow-md"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-xl transition font-medium ${
                    isSignup
                      ? "bg-indigo-500 text-white shadow-md"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
