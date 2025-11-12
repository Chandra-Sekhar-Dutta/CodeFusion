import Split from "react-split";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUserContext } from "../context/UserContext.jsx";
import LeftSideBar from "../component/LeftSideBar.jsx";
import RightSideBar from "../component/RightSideBar.jsx";
import { initSocket } from "../Socket.js";
import Actions from "../Action.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditorPage = () => {
  const [code, setCode] = useState(`// Write your code here`);
  const { userName, roomID } = useUserContext();
  const { isLoaded, user } = useUser();

  const [users, setUsers] = useState([]);
  const [currentSocketId, setCurrentSocketId] = useState(null);
  const socketRef = useRef(null);

  const handleError = (err) => {
    console.error("Socket connection error", err);
    toast.error("Socket connection failed.", {
      position: "top-right",
      theme: "dark",
    });
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      socketRef.current.on("connect", () => {
        setCurrentSocketId(socketRef.current.id);
        console.log("Connected with socket ID:", socketRef.current.id);

        socketRef.current.emit(Actions.JOIN, {
          roomID,
          user: userName || "USER",
          imageUrl: user?.imageUrl || "",
        });
      });

      socketRef.current.on(Actions.JOINED, ({ clientsArray, userName: joinedUser, socketId }) => {
        if (joinedUser !== userName)
          toast.success(`${joinedUser} joined the room.`);

        setUsers(clientsArray);

        // Send current code to the newly joined user
        if (socketRef.current.id === socketId) return;
        socketRef.current.emit(Actions.SYNC_CODE, {
          code,
          socketId,
        });
      });

      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, userName: leftUser }) => {
        toast.info(`${leftUser} left the room.`);
        setUsers((prev) => prev.filter((u) => u.socketId !== socketId));
      });

      // Receive code changes
      socketRef.current.on(Actions.CODE_CHANGE, ({ code: incomingCode }) => {
        if (incomingCode !== null && incomingCode !== undefined) {
          setCode(incomingCode);
        }
      });

      // Receive sync code (full code sent to newly joined)
      socketRef.current.on(Actions.SYNC_CODE, ({ code: syncedCode }) => {
        if (syncedCode !== null && syncedCode !== undefined) {
          setCode(syncedCode);
        }
      });
    };

    if (roomID) init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(Actions.JOINED);
      socketRef.current?.off(Actions.DISCONNECTED);
      socketRef.current?.off(Actions.CODE_CHANGE);
      socketRef.current?.off(Actions.SYNC_CODE);
    };
  }, [roomID, userName]);

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Split
          className="h-full flex"
          sizes={[22, 78]}
          minSize={200}
          gutterSize={6}
          direction="horizontal"
          gutterStyle={() => ({
            backgroundColor: "#374151",
            cursor: "col-resize",
            width: "6px",
          })}
        >
          <LeftSideBar
            users={users}
            isLoaded={isLoaded}
            user={user}
            currentSocketId={currentSocketId}
          />
          <RightSideBar
            socketRef={socketRef}
            roomID={roomID}
            code={code}
            setCode={setCode}
          />
        </Split>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditorPage;
