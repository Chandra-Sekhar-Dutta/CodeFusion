import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [roomID, setRoomID] = useState(() => localStorage.getItem("roomID") || "");

  useEffect(() => {
    if (userName) localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    if (roomID) localStorage.setItem("roomID", roomID);
  }, [roomID]);


  return (
    <UserContext.Provider value={{ userName, setUserName, roomID, setRoomID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
