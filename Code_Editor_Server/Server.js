import Actions from "./Action.js";
import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

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
    console.log(`${user} joined room ${roomID}`);

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

  // disconnecting event before leaving the room
  socket.on("disconnecting",()=>{
    const roomsOfThatParticularSocket=[...socket.rooms]
    roomsOfThatParticularSocket.forEach((roomID)=>{
      socket.in(roomID).emit(Actions.DISCONNECTED,{
        socketId:socket.id,
        userName:userSocketMap[socket.id]?.user || "Unknown",
      })
    })

    delete userSocketMap[socket.id]
    // leave from all the rooms
    socket.leave()
  })
});

server.listen(3000, () => console.log("listening on :3000"));
