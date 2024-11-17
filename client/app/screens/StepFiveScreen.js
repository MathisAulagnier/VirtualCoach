import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { SIZES } from "../../constants/styles";
import SimpleNextBtn from "../components/SimpleNextBtn";

export default StepFiveScreen = (props) => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
            <Text style={styles.title}>Run on a treadmill with 0 incline for 30 mins.</Text>
            <View style={styles.inputContainer}>
                <InputIcon 
                    label={"What was your average running speed at the end of 30mins ?"} 
                    style={styles.input}
                    placeholder={"0"}
                    keyboardType={"numeric"}
                    value={props.value} 
                    onFocus={props.onFocus} 
                    onTextInput={props.onTextInputPllup}
                    onChangeText={props.onChangeText}
                    maxLength= {2}
                />
            </View>

            <View style={styles.buttonContainer}>
                <SimpleNextBtn onPress={() => navigation.navigate("Home")} />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 15,
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