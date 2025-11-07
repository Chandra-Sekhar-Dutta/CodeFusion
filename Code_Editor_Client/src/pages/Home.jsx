import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useUserContext } from "../context/UserContext";
import { FiCopy } from "react-icons/fi"; // copy icon
import spinner from "./../assets/spinner.svg";

const Home = () => {
  const [createId, setCreateId] = useState(() => localStorage.getItem("createId") || "");

  useEffect(() => {
    localStorage.setItem("createId", createId);
  }, [createId]);

  const { userName, setUserName, setRoomID } = useUserContext();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setUserName(
        user.fullName ||
        user.username ||
        user.primaryEmailAddress?.emailAddress ||
        ""
      );
    }
  }, [isLoaded, isSignedIn, user, setUserName]);

  const notify1 = () => toast.warn("Please sign in first!");
  const notify2 = () => toast.error("Room ID cannot be empty!");
  const notifyCopy = () => toast.success("Room ID copied to clipboard!");

  const join = (e) => {
    e.preventDefault();
    if (!isSignedIn) return notify1();
    if (!createId.trim()) return notify2();
    setRoomID(createId); 
    navigate(`/editor/${createId}`);
  };


  const createNewRoom = () => setCreateId(uuidv4());

  const handleCopy = async () => {
    if (createId) {
      await navigator.clipboard.writeText(createId);
      notifyCopy();
    } else {
      toast.info("No Room ID to copy!");
    }
  };

  if (!isLoaded) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center text-white px-6">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={spinner}
          alt="Code Editor"
          className="w-28 h-20 mb-6"
          animate={{ rotate: [0, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          FusionCode
        </h1>
        <p className="text-gray-400 mt-3 text-sm">Collaborate • Code • Create</p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700/40"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={join} className="flex flex-col space-y-6">
          {/* Room ID Field */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Enter your Room ID
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter your Room ID"
                value={createId}
                onChange={(e) => setCreateId(e.target.value)}
                className="flex-grow px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                title="Copy Room ID"
              >
                <FiCopy size={20} className="text-blue-400" />
              </button>
            </div>
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Enter your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* Join Room Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg"
            whileTap={{ scale: 0.97 }}
          >
            Join Room
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have a room?{" "}
          <button
            className="text-blue-400 hover:underline hover:text-blue-300 transition-all"
            onClick={createNewRoom}
          >
            Create One
          </button>
        </p>
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default Home;
