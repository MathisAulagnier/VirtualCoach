import React, { useState } from 'react';
import HomeScreen from "./HomeScreen";
import Register from './Register';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosCollect from './UserInfosCollect';
import { UserInfoCollectStack } from '../navigations/StackNavigator';
// import RNFS from 'react-native-fs';


export default MainRegister = ({ navigation }) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);


    async function signIn(user) {
        setLoading(true);
        console.log('props username: -----------',user);

        try {
            await AsyncStorage.setItem('login', JSON.stringify(true))
            const userDataJson = JSON.stringify(user);
            // const filePath = ${RNFS.DocumentDirectoryPath}/userData.json;
            await AsyncStorage.setItem('@userData', userDataJson);
            console.log('File written...', user);
            console.log('DataJson :', userDataJson);
            setLoading(false)
            setAuthenticated(true);
            try {
                // Écrire les données dans le fichier
                // await RNFS.writeFile(filePath, userDataJson, 'utf8');
            } catch (error) {
                console.log(error.message);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            Alert.alert("Message", "An error occurred while logging in...")
            console.log("Erreur de connexion: ",error);
        }
    }



    if (authenticated) return <UserInfoCollectStack navigation={navigation}/>;

    return <Register disabled={loading} onSubmit={signIn} animate={loading} navigation={navigation}/>;
}

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
import UserInfoStepTwo from "../screens/UserInfoStepTwo";
import UserInfosSlideItem from "../components/UserInfosSlideItem";
import MainRegister from "../screens/MainRegister";
import PerformanceStepOne from "../screens/Perfomances/PerformanceStepOne";
import CreateGoal from "../screens/CreateGoal";
import { Colors } from "../../constants/Colors";

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
      <Stack.Screen name="UserInfoStepTwo" options={{headerShown: true, headerBackTitle: 'Back',}} component={UserInfoStepTwo} />
      <Stack.Screen name="UserInfosSlideItem" options={{headerShown: true,  headerBackTitle: 'Back',}} component={UserInfosSlideItem} />
      <Stack.Screen name="StepTreeView" options={{headerShown: true, title:'Current endurence', headerBackTitle: 'Back',}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFourScreen} />
      <Stack.Screen name="StepFiveScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFiveScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="ListeExercice" options={{headerShown: true, title: 'Exercises', headerBackTitle: 'Back',}} component={ListeExercice} />
      <Stack.Screen name="DetailsExercice" options={{headerShown: true, title: 'Exercises workout', headerBackTitle: 'Back',}} component={DetailsExercice} />
      <Stack.Screen name="Profile" options={{headerShown: true, headerTintColor: Colors.green, title: 'Profile', headerBackTitle: 'Back',}} component={Profile} />
      <Stack.Screen name="MyAccount" options={{headerShown: true, title: 'My Account', headerBackTitle: 'Back',}} component={MyAccount} />
      <Stack.Screen name="AccountDetails" options={{headerShown: true, title: 'Account Details', headerBackTitle: 'Back',}} component={AccountDetails} />
    </Stack.Navigator>
  )
}

const UserInfoCollectStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserInfosCollect" options={{headerShown: false}} component={UserInfosCollect} />
      <Stack.Screen name="UserInfoStepTwo" options={{headerShown: true, headerBackTitle: 'Back',}} component={UserInfoStepTwo} />
      <Stack.Screen name="UserInfosSlideItem" options={{headerShown: true,  headerBackTitle: 'Back',}} component={UserInfosSlideItem} />
      <Stack.Screen name="StepTreeView" options={{headerShown: true, title:'Current endurence', headerBackTitle: 'Back',}} component={StepTreeView} />
      <Stack.Screen name="StepFourScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFourScreen} />
      <Stack.Screen name="StepFiveScreen" options={{headerShown: true, title: 'Current endurence', headerBackTitle: 'Back',}} component={StepFiveScreen} />
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="ListeExercice" options={{headerShown: true, title: 'Exercises', headerBackTitle: 'Back',}} component={ListeExercice} />
      <Stack.Screen name="DetailsExercice" options={{headerShown: true, title: 'Exercises workout', headerBackTitle: 'Back',}} component={DetailsExercice} />
      <Stack.Screen name="Profile" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={Profile} />
      <Stack.Screen name="CreateGoal" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={CreateGoal} />
      <Stack.Screen name="PerformanceStepOne" options={{headerShown: true, title: 'Profile', headerBackTitle: 'Back',}} component={PerformanceStepOne} />
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