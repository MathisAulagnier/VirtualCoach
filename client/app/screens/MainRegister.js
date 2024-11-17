import React, { useState } from 'react';
import Register from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfoCollectStack } from '../navigations/navigationStacks';

export default MainRegister = ({ navigation }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn(user) {
    setLoading(true);
    try {
      await AsyncStorage.setItem('login', JSON.stringify(true));
      await AsyncStorage.setItem('@userData', JSON.stringify(user));
      setAuthenticated(true);
    } catch (error) {
      console.error("Erreur de connexion: ", error);
    } finally {
      setLoading(false);
    }
  }

  if (authenticated) return <UserInfoCollectStack navigation={navigation} />;
  return <Register disabled={loading} onSubmit={signIn} animate={loading} navigation={navigation} />;
};
