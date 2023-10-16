import { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import JoinScreen from "./JoinScreen";

export default function HomeScreen() {
  const [recvMessage, setRecvMessage] = useState<Array<IMessage>>([]);

  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socket.current = io(
      process.env.EXPO_PUBLIC_SOCKET_IP_AND_PORT ?? "http://192.168.10.8:3001/",
      {
        transports: ["websocket"],
      }
    );

    socket.current.on("message", (messages: IMessage[]) => {
      setRecvMessage((prev) => GiftedChat.append(prev, messages));
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    socket.current?.emit("message", messages[0].text);
    setRecvMessage((prevState) => GiftedChat.append(prevState, messages));
  }, []);

  const joinChat = (username: string) => {
    socket.current?.emit("join", username);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={recvMessage}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name: "Farasat Ali",
          avatar: "https://picsum.photos/140",
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
