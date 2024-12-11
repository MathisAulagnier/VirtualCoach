import React, { useState } from 'react';
import Register from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfoCollectStack } from '../navigations/navigationStacks';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../hooks/globalSlice';

export default MainRegister = ({ navigation }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function signIn(user) {
    setLoading(true);
    try {
      await AsyncStorage.setItem('login', JSON.stringify(true));
      await AsyncStorage.setItem('@userData', JSON.stringify(user));
      dispatch(setUserData(user));
      setLoading(false);
      setAuthenticated(true);
    } catch (error) {
      console.error("Erreur de connexion: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (authenticated) return <UserInfoCollectStack navigation={navigation} />;
  return <Register disabled={loading} onSubmit={signIn} animate={loading} navigation={navigation} />;
};
