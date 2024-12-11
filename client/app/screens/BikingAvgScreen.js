import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { SIZES } from "../../constants/styles";
import SimpleNextBtn from "../components/SimpleNextBtn";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";
import InputDropdown from "../components/InputDropdown";

export default BikingAvgScreen = (props) => {

    const navigation = useNavigation();
    const route = useRoute();
    
    const [bikingAvg, setBikingAvg] = useState('');

    const handleBikingAvgChange = (text) => {
        setBikingAvg(text.value);
    };

    const avgBiking = Array.from({ length: 10 }, (_, i) =>(5 + i * 5)).map(items => ({
        label: items.toString() + " km/h",
        value: items
    }));

    const reduxUserData = useSelector((state) => state.global.userData);
    const dispatch = useDispatch();

    console.log("route.params.cardio:::",route.params.cardio);
    
    const saveCardio = async (cardio) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            cardio: cardio < 15 ? "bad" : cardio < 23 ? "medium" : "good",
        }));
        } catch (error) {
            console.log('Error saving data cardio:', error);
        }
    };



    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
            <Text style={styles.title}>Biking for 30 minutes.</Text>
            <View style={styles.inputContainer}>
                <InputDropdown
                    label={"What was your average biking speed (km/h) after 30 minutes ?"} 
                    placeholder= {"Your average biking speed (km/h)"}
                    value={bikingAvg} 
                    onFocus={props.onFocus} 
                    onValueChange={handleBikingAvgChange}
                    data={avgBiking}
                />
            </View>

            <View style={styles.buttonContainer}>
                <SimpleNextBtn onPress={ async () => {
                        await saveCardio(route.params.cardio).then(
                            !bikingAvg ? Alert.alert("Alert !", "Please enter your average biking speed (km/h) to continue.")
                            : route.params.route == "performance" ? navigation.replace("CreateGoal") : navigation.replace("Home")
                        )
                    }}
                />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 8,
    },
    content: {
        flexDirection: "column",
        height: SIZES.height / 1.2,
        // backgroundColor: Colors.green,
        justifyContent: "space-between",
        // paddingVertical: 10,
    },
    title: {
        fontWeight: '700',
        fontSize: 25,
        width: SIZES.width - 30, // Ajustement pour mieux s'adapter à l'écran
        marginVertical: 20,
        lineHeight: 35,
        color: Colors.blueb,
        textAlign: 'left',
    },
    inputContainer: {
        flex: 1, // Permet à la zone de saisie de prendre de l'espace
        justifyContent: "center",
    },
    input: {
        marginVertical: 10,
    },
    buttonContainer: {
        // flex: 1,
        height: SIZES.height / 2,
        justifyContent: "flex-end",
        paddingBottom: 20, // Pour espacer le bouton du bas de l'écran
    },
})