import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import StepFourScreen from "../screens/StepFourScreen";
import StepTreeView from "../components/StepTreeView";
import UserInfosCollect from "../screens/UserInfosCollect";
import StepFiveScreen from "../screens/StepFiveScreen";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MainRegister"
        options={{
          headerShown: false,
          headerTitle: null,
          headerLeft: null,
          headerStyle: {
            // backgroundColor: '#0891b2',
            shadowColor: 'transparent',
            elevation: 0,
            height: 48,
          },
        }} component={MainRegister} />
      <Stack.Screen name="UserInfosCollect" options={{headerShown: false}} component={UserInfosCollect} />
      <Stack.Screen name="StepTreeView" options={{headerShown: false}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: false}} component={StepFourScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="Profile" options={{}} component={Profile} />
    </Stack.Navigator>
  )
}

const UserInfoCollectStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserInfosCollect" options={{headerShown: false}} component={UserInfosCollect} />
      <Stack.Screen name="StepTreeView" options={{headerShown: true, title:''}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: false, title: ''}} component={StepFourScreen} />
      <Stack.Screen name="StepFiveScreen" options={{headerShown: false, title: ''}} component={StepFiveScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="Profile" options={{}} component={Profile} />
    </Stack.Navigator>
  )
}

export { AuthStack, UserInfoCollectStack };

const screenOptionStyle = {
  headerStyle: {
    // backgroundColor: "#fff", 
  },
  // headerTintColor: "#000",
};