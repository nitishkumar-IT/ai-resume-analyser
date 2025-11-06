import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePuterStore } from "../lib/puter";

type PuterUser = {
  username?: string;
  email?: string;
};

const Navbar = () => {
  const navigate = useNavigate();

  const {
    auth: { user, isAuthenticated, signOut, checkAuthStatus },
    isLoading,
    puterReady,
  } = usePuterStore() as {
    auth: {
      user?: PuterUser | null;
      isAuthenticated: boolean;
      signOut: () => Promise<void>;
      checkAuthStatus: () => void;
    };
    isLoading: boolean;
    puterReady: boolean;
  };

  useEffect(() => {
    if (puterReady) checkAuthStatus();
  }, [puterReady, checkAuthStatus]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/auth", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="navbar shadow-sm backdrop-blur-md flex justify-between items-center px-6 py-3 sticky top-0 z-50 bg-white/70"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 1000 }}
      >
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-sm"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(168,85,247,0)",
                "0 0 10px rgba(236,72,153,0.8)",
                "0 0 0px rgba(59,130,246,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Resume Analyzer
          </motion.span>
        </Link>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        {/* About Page */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/about"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
            About
          </Link>
        </motion.div>

        {/* Upload Resume */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/upload"
            className="primary-button w-fit bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-medium px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Upload Your Resume!
          </Link>
        </motion.div>

        {/* Auth Buttons */}
        {isLoading ? (
          <span className="text-gray-400 text-sm">Checking status...</span>
        ) : isAuthenticated ? (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-gray-700 text-sm font-medium">
              Hi, {(user?.username ?? user?.email ?? "User") as string}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            >
              Sign Out
            </motion.button>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/auth"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
