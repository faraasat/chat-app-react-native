import { Server } from "socket.io";

const io = new Server();

io.on("connection", () => {
    console.log("a user connected")
})

io.listen(3000);