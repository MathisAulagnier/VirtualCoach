import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import InputSearch from "../components/InputSearch";


export default HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    
    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);
    
    const {width, height} = useWindowDimensions();
    
    useEffect(() => {
        setUser(reduxUserData);
    }, [reduxUserData]);
    
    console.log('<<<<<<<<<<Redux USER DATA>>>>>>>> : ', user);
    
    const loadLoginStatus = async () => {
        try {
            const loginStatusString = await AsyncStorage.getItem('login');  // Récupérer la chaîne
            const userData = await AsyncStorage.getItem('@userData');     
            // if (loginStatusString !== null) {
            //     const loginStatus = JSON.parse(loginStatusString);  // Convertir la chaîne en booléen
            //     console.log('Statut de connexion chargé :', loginStatus);
            //     return loginStatus;
            // }
            if (userData !== null) {
                const userJson = JSON.parse(userData);
                setUser(userJson)
                console.log('USER DATA:', userJson);
            }
            return false;  // Valeur par défaut si aucune donnée n'est trouvée
        } catch (error) {
            console.log('Erreur lors du chargement du statut de connexion :', error);
            return false;
        }
    };

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("isAlreadyLaunched");
            await AsyncStorage.removeItem("login");
            await AsyncStorage.removeItem("@userData");
        } catch (error) {
            console.log("Error @isAlreadyLaunched: ",error);
        }
    }
    return (
        <View style = {[styles.container]}>
            <StatusBar style="auto" backgroundColor={Colors.blue} />
            <View style={styles.header}>
                <TouchableOpacity onPress={clearOnboarding}>
                    <Image source={require('../../assets/app-icon.png')} style={{resizeMode: 'contain', width: 55, height: 55}} />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 20, fontWeight: '600', color: Colors.white}} >Welcome {user.username? user.username: null}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Profile");
                }}>
                    <MaterialIcons name="account-circle" size={50} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 15 }} >
                <InputSearch/>
            </View>

            <View style={{width: SIZES.width}} >
                <ScrollView style={{width: SIZES.width}} >
                    <View style={styles.cardsView} >
                        {[1,2,3,4,5].map((item, index) => (
                            <TouchableOpacity style={styles.cardButton} key={index}>
                                <View style={{borderTopEndRadius: 8, }} >
                                    {/* <Image source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }} style={styles.gif}/> */}
                                    <Image 
                                        source={require('../../data/gifs/crunch-avec-jambes-verticales.gif')} 
                                        style={styles.gif}
                                    />
                                </View>
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 5}} >
                                    <Text style={{fontSize: 17, fontWeight: '600'}} >Crunches</Text>
                                    <Text style={{fontSize: 15, fontWeight: '400'}}>2/3</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        alignItems : "center",
        backgroundColor: "#f1f1f1"
    },
    header: {
        top: 0,
        height: SIZES.height/13,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blue,
        width: SIZES.width,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    cardsView: {
        flex: 10,
        flexWrap: 'wrap', 
        display: 'flex', 
        flexDirection: 'r',
        backgroundColor: Colors.whitesmoke,
        alignSelf: 'center',
        width: SIZES.width,
    },
    cardButton: {
        backgroundColor: Colors.whitesmoke,
        borderColor: Colors.whitesmoke,
        width: SIZES.width/2.5,
        margin: 5,
        borderRadius: 8,

    },
    gif: {
        width: SIZES.width/2.5,
        height: SIZES.width/2.5,
        borderTopEndRadius: 8, 
        borderTopLeftRadius: 8,
    },

})