import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let currentMessageId = 1;

const createMessage = (user: any, messageText: string) => {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: `https://picsum.photos/id/${user.userId}/200/200`,
    },
  };
};

export const handleMessage = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  users: any
) => {
  socket.on("message", (messageText) => {
    console.log(messageText);
    // io.emit("message", message);
    // emit sends message to all while brodcast send message to all other than the sender
    socket.broadcast.emit(
      "message",
      createMessage(users[socket.id], messageText)
    );
  });
};
