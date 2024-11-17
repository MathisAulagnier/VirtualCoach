import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserInfosCollect from "../screens/UserInfosCollect";
import UserInfoStepTwo from "../screens/UserInfoStepTwo";
import UserInfosSlideItem from "../components/UserInfosSlideItem";
import StepFourScreen from "../screens/StepFourScreen";
import StepFiveScreen from "../screens/StepFiveScreen";
import ListeExercice from "../screens/ListeExercice";
import DetailsExercice from "../screens/DetailsExercice";
import Profile from "../screens/Profile";
import MyAccount from "../screens/MyAccount";
import AccountDetails from "../screens/AccountDetails";
import HomeScreen from "../screens/HomeScreen";
import { Colors } from "../../constants/Colors";
import CreateGoal from "../screens/CreateGoal";
import PerformanceStepOne from "../screens/Perfomances/PerformanceStepOne";
import StepTreeView from "../screens/StepTreeView";

const Stack = createStackNavigator();

export const UserInfoCollectStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="UserInfosCollect" options={{ headerShown: false }} component={UserInfosCollect} />
    <Stack.Screen name="UserInfoStepTwo" options={{ headerShown: true }} component={UserInfoStepTwo} />
    <Stack.Screen name="UserInfosSlideItem" options={{ headerShown: true }} component={UserInfosSlideItem} />
    <Stack.Screen name="StepTreeView" options={{ headerShown: true }} component={StepTreeView} />
    <Stack.Screen name="StepFourScreen" options={{ headerShown: true }} component={StepFourScreen} />
    <Stack.Screen name="StepFiveScreen" options={{ headerShown: true }} component={StepFiveScreen} />
    <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
    <Stack.Screen name="ListeExercice" options={{headerShown: true, title: 'Exercises', headerBackTitle: 'Back',}} component={ListeExercice} />
    <Stack.Screen name="DetailsExercice" options={{headerShown: true, title: 'Exercises workout', headerBackTitle: 'Back',}} component={DetailsExercice} />
    <Stack.Screen name="Profile" options={{headerShown: true, headerTintColor: Colors.green, title: 'Profile', headerBackTitle: 'Back',}} component={Profile} />
    <Stack.Screen name="CreateGoal" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={CreateGoal} />
    <Stack.Screen name="PerformanceStepOne" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={PerformanceStepOne} />
    <Stack.Screen name="MyAccount" options={{headerShown: true, title: 'My Account', headerBackTitle: 'Back',}} component={MyAccount} />
    <Stack.Screen name="AccountDetails" options={{headerShown: true, title: 'Account Details', headerBackTitle: 'Back',}} component={AccountDetails} />
  </Stack.Navigator>
);
