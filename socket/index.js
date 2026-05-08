import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import {v4 as uuid} from "uuid"
dotenv.config();

const server = http.createServer();
const PORT = process.env.PORT || 8080
console.log(PORT)

const io = new Server(server, {cors:{origin:"*"}});

// waiting list wala array hoga 
const waitingQueue = []
const activePairs = new Map(); // from user a: [user a, user b]. from user b: [user b, user a]
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("start", () => {
        if (waitingQueue.includes(socket.id)) return;

        if (waitingQueue.length > 0) {
            const partner = waitingQueue.shift();
            const roomId = uuid();
            
            activePairs.set(socket.id, partner);
            activePairs.set(partner, socket.id);

            io.to(socket.id).emit("matched", { roomId });
            io.to(partner).emit("matched", { roomId });
        } else {
            waitingQueue.push(socket.id);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        
        const index = waitingQueue.indexOf(socket.id);
        if (index > -1) {
            waitingQueue.splice(index, 1);
        }

        const partner = activePairs.get(socket.id);
        if (partner) {
            io.to(partner).emit("partnerDisconnected");
            activePairs.delete(socket.id);
            activePairs.delete(partner);
        }
    });
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT} 🥰`);
});