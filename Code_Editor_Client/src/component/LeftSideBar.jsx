import { motion } from "framer-motion";

const LeftSideBar = ({ users, isLoaded, user, currentSocketId }) => {
  return (
    <motion.div
      className="bg-[#1e293b]/80 backdrop-blur-md p-6 flex flex-col border-r border-gray-700 w-full shadow-lg"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-green-400 mb-5 text-center">
        Connected Users
      </h2>

      <div className="flex-1 w-full overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {users.map((u) => {
          const isCurrentUser = u.socketId === currentSocketId;
          const avatar = isCurrentUser ? user?.imageUrl : u.imageUrl;

          return (
            <div
              key={u.socketId}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-700/40 transition-all ${
                isCurrentUser
                  ? "bg-gradient-to-r from-green-700/40 to-emerald-700/30"
                  : "bg-gray-700/40 hover:bg-gray-600/50"
              }`}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border border-gray-500 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-gray-200 text-sm font-semibold">
                  {(u.user?.charAt(0) || "U").toUpperCase()}
                </div>
              )}
              <span className="text-gray-200 font-medium truncate">
                {isCurrentUser ? user?.fullName || u.user : u.user}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-gray-400 text-center mt-5 text-sm italic">
        Welcome to your workspace.
      </p>
    </motion.div>
  );
};

export default LeftSideBar;
