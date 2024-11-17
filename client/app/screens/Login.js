import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";


import AsyncStorage from '@react-native-async-storage/async-storage';


export default Login = ({navigation}) => {

    const {width, height} = useWindowDimensions();

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("isAlreadyLaunched");
            console.log('Remove Item succes!!!!!!');
            
        } catch (error) {
            console.log("Error @isAlreadyLaunched: ",error);
            
        }
    }

    return (
        <View style = {[styles.container, {width,}]}>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center",
    },
})