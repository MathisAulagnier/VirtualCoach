import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import StepFourScreen from "../screens/StepFourScreen";
import StepTreeView from "../components/StepTreeView";
import UserInfosCollect from "../screens/UserInfosCollect";
import StepFiveScreen from "../screens/StepFiveScreen";
import ListeExercice from "../screens/ListeExercice";
import DetailsExercice from "../screens/DetailsExercice";
import MyAccount from "../screens/MyAccount";
import AccountDetails from "../screens/AccountDetails";

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
      <Stack.Screen name="StepTreeView" options={{headerShown: true, title:'Current endurence', headerBackTitle: 'Back',}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFourScreen} />
      <Stack.Screen name="StepFiveScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFiveScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="ListeExercice" options={{headerShown: true, title: 'Exercises', headerBackTitle: 'Back',}} component={ListeExercice} />
      <Stack.Screen name="DetailsExercice" options={{headerShown: true, title: 'Exercises workout', headerBackTitle: 'Back',}} component={DetailsExercice} />
      <Stack.Screen name="Profile" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={Profile} />
      <Stack.Screen name="MyAccount" options={{headerShown: true, title: 'My Account', headerBackTitle: 'Back',}} component={MyAccount} />
      <Stack.Screen name="AccountDetails" options={{headerShown: true, title: 'Account Details', headerBackTitle: 'Back',}} component={AccountDetails} />
    </Stack.Navigator>
  )
}

const UserInfoCollectStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserInfosCollect" options={{headerShown: false}} component={UserInfosCollect} />
      <Stack.Screen name="StepTreeView" options={{headerShown: true, title:'Current endurence', headerBackTitle: 'Back',}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFourScreen} />
      <Stack.Screen name="StepFiveScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFiveScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="ListeExercice" options={{headerShown: true, title: 'Exercises', headerBackTitle: 'Back',}} component={ListeExercice} />
      <Stack.Screen name="DetailsExercice" options={{headerShown: true, title: 'Exercises workout', headerBackTitle: 'Back',}} component={DetailsExercice} />
      <Stack.Screen name="Profile" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={Profile} />
      <Stack.Screen name="MyAccount" options={{headerShown: true, title: 'My Account', headerBackTitle: 'Back',}} component={MyAccount} />
      <Stack.Screen name="AccountDetails" options={{headerShown: true, title: 'Account Details', headerBackTitle: 'Back',}} component={AccountDetails} />
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