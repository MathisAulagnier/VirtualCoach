import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import InputSearch from "../components/InputSearch";
import { useNavigation } from "@react-navigation/native";


export default HomeScreen = ({}) => {
    const dispatch = useDispatch();
    
    const data = [
        "Yoga Session", "Strength Training Session", "Cardio Session", "Cardio Blast", "Yoga Session", "Core Strength", "Flexibility and Mobility"
    ]
    const navigation = useNavigation();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);

    const [filteredData, setFilteredData] = useState(data);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    

    useEffect(() => {
        if (searchKey) {
          const convertedSearchkey = searchKey.replace(/\s/g, '').trim();
          let filterArray = data.filter((item) => {
            let regex = RegExp(`${convertedSearchkey}*`, 'i');
            return regex.test(item);
          });
    
          setFilteredData(filterArray);
        }
        if (searchKey == '') {
          console.log('key empty');
        }
    }, [searchKey]);

    
    useEffect(() => {
        setUser(reduxUserData);
        AsyncStorage.setItem('isAlreadyLaunchedHome', "true")
    }, [reduxUserData]);
    
    console.log('<<<<<<<<<< Redux USER DATA >>>>>>>> : ', user);
    
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
            await AsyncStorage.setItem("isAlreadyLaunchedHome", "false");
            await AsyncStorage.removeItem("isAlreadyLaunched");
            await AsyncStorage.removeItem("login");
            await AsyncStorage.removeItem("@userData");
            // Alert.alert("Alert !", "Not yet implemented")
        // const launched = await AsyncStorage.getItem('isAlreadyLaunchedHome');
        // setIsAlreadyLaunchedHome(JSON.parse(launched));
        // console.log('/=/=/=/=//=/=/=/=/=/=/=/=/=/=',JSON.parse(launched));
        } catch (error) {
            console.log("Error @isAlreadyLaunched: ",error);
        }
    }
    return (
        <View style = {[styles.container]}>
            <StatusBar style="auto" backgroundColor={Colors.blue} />
            <View style={styles.header}>
                <TouchableOpacity onPress={clearOnboarding}>
                    <Image source={require('../../assets/app-icon.png')} style={{resizeMode: 'contain', width: 55, height: 55,}} />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize: 20, fontWeight: '600', color: Colors.white}} >Welcome {user?.username? user.username: null}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Profile");
                }}>
                    <MaterialIcons name="account-circle" size={50} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 15,}} >
                <InputSearch placeholder= {"Session search"}
                    defaultValue={searchKey}
                    textContentType='name'
                    onChangeText={(text) => {
                        setSearchKey(text);
                        if (text === '') {
                          return setFilteredData(data);
                        }
                    }}
                    returnKeyType='search'
                />
            </View>

            <View style={{width: SIZES.width, flex: 0.9}} >
                <ScrollView style={{width: SIZES.width}} >
                {filteredData.map((item, index) => (
                    <TouchableOpacity style={styles.cardsView} key={index}
                        onPress={() => {
                            navigation.navigate("ListeExercice", {data: item})
                        }}
                    >
                        <View style={{borderRadius: 100, backgroundColor: Colors.blueb, marginRight: 8, height: 40, width: 40, justifyContent: "center", flex: 0.1}}>
                            <Text style={styles.number}>{index+1}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", flex: 0.9, }}>
                            <View style={{flexDirection: "column", alignItems: "center", justifyContent: "space-around", }}>
                                <Text style={{fontSize: 20, fontWeight: "700", textAlign: "left", alignSelf: "flex-start"}}>{item}</Text>
                                <View style={{flexDirection: "row", alignItems: "center", alignSelf: "flex-start"}}>
                                    <Ionicons name="timer-outline" size={20} color={Colors.green} />
                                    <Text style={{fontSize: 16, fontWeight: "500", padding: 5, color: Colors.blueb }}>30-45 minutes</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "space-around", }}>
                                <Text style={{fontSize: 16, fontWeight: "400", color: Colors.black}}>Exercise</Text>
                                <View style={{flexDirection: "row", alignItems: "center",}}>
                                    <Ionicons name="flash" size={20} color={Colors.red} />
                                    <Text style={{fontSize: 16, fontWeight: "500", padding: 5, color: Colors.blueb }}>20</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        alignItems : "center",
        backgroundColor: Colors.whitesmoke,
    },
    header: {
        flex: 0.1,
        top: 0,
        height: SIZES.height/13,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blue,
        width: SIZES.width,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    number: {
        fontSize: 20, 
        fontWeight: "700",
        alignSelf: "center",
        textAlignVertical: "center",
        color: Colors.white,
    },
    cardsView: {
        flex: 1,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        width: SIZES.width - 20,
        height: SIZES.height/ 9,
        padding: 10,
        borderRadius: 5,
        elevation: 6,
        marginHorizontal: 5,
        marginTop: 12,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },

})