import React, { useState } from 'react';
import HomeScreen from "./HomeScreen";
import Register from './Register';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosCollect from './UserInfosCollect';
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
            // const filePath = `${RNFS.DocumentDirectoryPath}/userData.json`;
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



    if (authenticated) return <UserInfosCollect navigation={navigation}/>;

    return <Register disabled={loading} onSubmit={signIn} animate={loading} navigation={navigation}/>;
}