import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainRegister from "../screens/MainRegister";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import { UserInfoCollectStack } from "./navigationStacks";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="MainRegister" options={{ headerShown: false }} component={MainRegister} />
    <Stack.Screen name="UserInfoCollectStack" options={{ headerShown: false }} component={UserInfoCollectStack} />
    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
    <Stack.Screen name="Profile" options={{ headerShown: true }} component={Profile} />
  </Stack.Navigator>
);

export { AuthStack };
