import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import SimpleNextBtn from "../components/SimpleNextBtn";
import { SIZES } from "../../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";

export default function RuningAvgScreen(props) {
    const navigation = useNavigation();

    const route = useRoute();

    const [runingAvg, setRuningAvg] = useState('');

    const handleRuningAvgChange = (text) => {
        setRuningAvg(text.value);
    };

    console.log("route.params.cardio:::",route.params.cardio);
    
    const avgRuning = Array.from({ length: 8 }, (_, i) =>(5 + i * 5)).map(items => ({
        label: items.toString() + " km/h",
        value: items
    }));    
    
    const reduxUserData = useSelector((state) => state.global.userData);
    const dispatch = useDispatch();

    const saveCardio = async (cardio) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            cardio: cardio < 7 ? "bad" : cardio < 14 ? "medium" : "good",
        }));
        } catch (error) {
            console.log('Error saving data cardio:', error);
        }
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
                <Text style={styles.title}>Run on a treadmill with a 0% incline for 30 minutes.</Text>
                <View style={styles.inputContainer}>
                    <InputDropdown
                        label={"What was your average running speed (km/h) after 30 minutes ?"}  
                        placeholder= {"Your average running speed (km/h)"}
                        value={runingAvg} 
                        onFocus={props.onFocus} 
                        onValueChange={handleRuningAvgChange}
                        data={avgRuning}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <SimpleNextBtn onPress={ async () => {
                        await saveCardio(route.params.cardio).then(
                            !runingAvg ? Alert.alert("Alert !", "Please enter your average running speed (km/h) to continue.")
                            : route.params.route == "performance" ? navigation.replace("CreateGoal") : navigation.replace("Home")
                        )
                    }} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        width: SIZES.width - 30,
        marginVertical: 20,
        lineHeight: 35,
        color: Colors.blueb,
        textAlign: 'left',
    },
    inputContainer: {
        flex: 1, 
        justifyContent: "center",
    },
    input: {
        marginVertical: 10,
    },
    buttonContainer: {
        // flex: 1,
        height: SIZES.height / 2,
        justifyContent: "flex-end",
        paddingBottom: 20, 
    },
});
