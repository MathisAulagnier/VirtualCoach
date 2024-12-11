import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
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

    const navigation = useNavigation();
    training = require('../../data/training_plan_json/training_plan_user3.json');

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);

    const [filteredData, setFilteredData] = useState(training);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    // console.log("<<<<<<<",filteredData);

    const handleCreateGoal = async () => {
        try {
            setLoading(true)
            const userDataFile = reduxUserData; // Nom du fichier utilisateur
            const response = await fetch('http://172.20.10.10:4000/api/generate-training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userDataFile }), // Envoyer la valeur de userDataFile
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la génération du plan d\'entraînement');
            }
            console.log('Plan d\'entraînement généré avec succès:', data);
            setFilteredData(training)
            setLoading(false)
            Alert.alert(" Success!", "Training plan generated successfully")
        } catch (error) {
            console.error('Erreur:', error.message);
            setLoading(false)
            Alert.alert("Network error !", "Please try again")
        }
    };

    useEffect(() => {
        if (searchKey) {
          const convertedSearchkey = searchKey.replace(/\s/g, '').trim();
          let filterArray = Object.keys(training).filter((item) => {
            let regex = RegExp(`${convertedSearchkey}*`, 'i');
            return regex.test(filteredData[item]);
          });
    
          setFilteredData(filterArray);
        }
        if (searchKey == '') {
        //   console.log('key empty');
        }
    }, [searchKey]);
       
    useEffect(() => {
        setUser(reduxUserData);
        AsyncStorage.setItem('isAlreadyLaunchedHome', "true")

        // console.log(reduxUserData);
    }, [reduxUserData]);

    useEffect(() => {
        setFilteredData(training);
    }, [training]);
    
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("isAlreadyLaunchedHome");
            await AsyncStorage.removeItem("isAlreadyLaunched");
            await AsyncStorage.removeItem("login");
            await AsyncStorage.removeItem("@userData");
        } catch (error) {
            console.log("Error @isAlreadyLaunched: ",error);
        }
    }
    return loading ? (
        <ActivityIndicator
            visible={loading}
            textContent={'Loading...'}
            size='large'
            color={Colors.blueb}
            style= {{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.white,}}
            />
        ) : (
        <View style = {[styles.container]}>
            <StatusBar style="auto" backgroundColor={Colors.blue} />
            <View style={styles.header}>
                <TouchableOpacity onPress={clearOnboarding}>
                    <Image source={require('../../assets/app-icon.png')} style={{resizeMode: 'contain', width: 55, height: 55,}} />
                </TouchableOpacity>
                <View style={{flexDirection: "row", display: "flex", justifyContent: "center"}} >
                    <Text style={{fontSize: 20, fontWeight: '700', color: Colors.white}} >Welcome </Text>
                    <Text style={{fontSize: 20, fontWeight: '400', color: Colors.white}} >{user?.name? user.name + " !": null}</Text>
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
                          return setFilteredData(training);
                        }
                    }}
                    returnKeyType='search'
                />
            </View>

            <View style={{width: SIZES.width, flex: 0.9, justifyContent: "center", alignItems: "center"}} >
            {Object.keys(filteredData).length === 0 ? 
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1, width: SIZES.width}} >
                    <Text style={{textAlign: "center", fontSize: 18, paddingVertical: 5, color: Colors.grey}} >There are no training sessions at the moment.</Text>
                    <Ionicons name="alert-circle-outline" size={70} color={Colors.grey} /> 
                    <View style= {{
                        flexDirection: "row",
                        borderRadius: 5,
                        // backgroundColor: Colors.green,
                        alignItems: "center",
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 10,
                        margin: 10,
                        right: 10,
                    }}>
                        <Text style= {{
                            backgroundColor: Colors.white, 
                            borderRadius: 3, 
                            paddingVertical: 5, 
                            paddingHorizontal: 8, 
                            marginHorizontal: 10, 
                            alignItems: "center", 
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 }, 
                            shadowOpacity: 0.40,
                            shadowRadius: 3.84,
                            }}
                        >Create training sessions</Text>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.blueb,
                            alignContent: 'center',
                            borderRadius: 50,
                            alignItems: "center",
                            elevation: 6,
                            justifyContent: 'center',
                            width: 75,
                            height: 75,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.40,
                            shadowRadius: 3.84,
                        }}
                            onPress={
                                () => handleCreateGoal()
                            }>
                            <MaterialIcons name='directions-run' size={40} color={Colors.white} style={{ alignItems: 'center', }} />
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={{ alignItems: "center"}} >
                    <ScrollView style={{width: SIZES.width}} >
                        {Object.keys(filteredData).map((sessionKey, index) => (
                            <TouchableOpacity style={styles.cardsView} key={index}
                                onPress={() => {
                                    const session = filteredData[sessionKey];
                                    navigation.navigate("DetailsSeance", {training: session})
                                }}
                            >
                                <View style={{borderRadius: 100, backgroundColor: Colors.blueb, marginRight: 8, height: 38, width: 38, justifyContent: "center", flex: 0.1}}>
                                    <Text style={styles.number}>{index+1}</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "space-between", flex: 0.9, }}>
                                    <View style={{flexDirection: "column", alignItems: "center", justifyContent: "space-around", }}>
                                        <Text style={{fontSize: 20, fontWeight: "500", textAlign: "left", alignSelf: "flex-start"}}>{"Training Session " + (index+1)}</Text>
                                    </View>
                                    <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "space-around", }}>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            }
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
        height: SIZES.height/ 11,
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