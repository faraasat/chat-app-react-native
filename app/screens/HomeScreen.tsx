import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";

import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    try {
      socket.current = io("http://192.168.10.8:3001/", {
        transports: ["websocket"],
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendMessage = () => {
    socket.current?.emit("message", messageToSend);
    setMessageToSend("");
  };

  return (
    <View style={styles.container}>
      <Text>Hello World & Hi</Text>
      <TextInput
        placeholder="Add a Chat Message..."
        onChangeText={(text) => setMessageToSend(text)}
        value={messageToSend}
        onSubmitEditing={sendMessage}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
