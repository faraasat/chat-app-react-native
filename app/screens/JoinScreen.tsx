import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";

const JoinScreen = () => {
  const [username, setUsername] = useState("");

  const joinChat = (username: string) => {
    socket.current?.emit("join", username);
    setHasJoined(true);
  };

  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Image resizeMode="contain" source={require("../assets/chat-icon.png")} />
      <TextInput
        placeholder="Enter Username"
        style={{ fontSize: 30, textAlign: "center" }}
        onChangeText={(s) => setUsername(s)}
        value={username}
      />
      <Button title="Join Chat" onPress={() => joinChat(username)} />
      <StatusBar style="auto" />
      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default JoinScreen;
