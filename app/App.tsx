import { io } from "socket.io-client";
import AppStack from "./AppContainer";

import { AnyAction, configureStore } from "@reduxjs/toolkit";

const socket = io(
  process.env.EXPO_PUBLIC_SOCKET_IP_AND_PORT ?? "http://192.168.10.8:3001/",
  {
    transports: ["websocket"],
  }
);

const chatReducer = (state: any = {}, action: AnyAction) => {
  console.log("here");
  switch (action.type) {
    case "message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: { chat: chatReducer },
});

store.subscribe(() => {
  console.log("new state", store.getState());
});

store.dispatch({ type: "message", data: "hello" });

export default function App() {
  return <AppStack />;
}
