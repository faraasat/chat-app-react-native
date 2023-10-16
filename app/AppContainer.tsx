import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import JoinScreen from "./screens/JoinScreen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Join">
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Join" component={JoinScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View></View>
  );
};

export default AppStack;
