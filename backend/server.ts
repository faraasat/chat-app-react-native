import { Server } from "socket.io";

const io = new Server();

//  {
//     _id: 1,
//     text: "Hello developer",
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: "React Native",
//       avatar: "https://picsum.photos/140",
//     },
//   },

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

io.listen(3001);
