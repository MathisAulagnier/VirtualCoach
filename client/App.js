import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Main from './app/Main';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import store from './hooks/store';
import { setUserData } from './hooks/globalSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from './constants/Colors';

export default function App() {

  LogBox.ignoreAllLogs(); // Ignore all warningsé


  const dispatch = useDispatch();
  const reduxUserData = useSelector((state) => state.global.userData);

  const loadUserData = async () => {
    try {
      const user_data = await AsyncStorage.getItem('@userData');
      if (user_data !== null) {
        dispatch(setUserData(JSON.parse(user_data)));
        console.log("user data<<<<<<: ", JSON.parse(user_data));
      }
    } catch (error) {
      console.log('Erreur lors de la récupération des données :', error);
    }
  };

  const saveUserData = async (data) => {
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(data));
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des données :', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (reduxUserData !== null) {
      saveUserData(reduxUserData);
    }
  }, [reduxUserData]);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Main/>
        <StatusBar style="auto" />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
});
