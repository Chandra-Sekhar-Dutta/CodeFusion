import Actions from "./Action.js";
import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

const getConnectedClientsInRoom = (roomID) => {
  return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map((socketId) => ({
    socketId,
    user: userSocketMap[socketId]?.user || "Unknown",
    imageUrl: userSocketMap[socketId]?.imageUrl || "",
  }));
};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on(Actions.JOIN, ({ roomID, user, imageUrl }) => {
    userSocketMap[socket.id] = { user, imageUrl };
    socket.join(roomID);
    const clientsArray = getConnectedClientsInRoom(roomID);

    clientsArray.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        clientsArray,
        userName: user,
        socketId: socket.id,
      });
    });
  });

  socket.on(Actions.CODE_CHANGE, ({ roomID, code }) => {
    socket.in(roomID).emit(Actions.CODE_CHANGE, { code });
  });

  socket.on(Actions.SYNC_CODE, ({ code, socketId }) => {
    io.to(socketId).emit(Actions.SYNC_CODE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomID) => {
      socket.in(roomID).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        userName: userSocketMap[socket.id]?.user || "Unknown",
      });
    });

    delete userSocketMap[socket.id];
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
