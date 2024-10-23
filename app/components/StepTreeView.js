import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputIcon from "./InputIcon";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";

export default StepTreeView = ({props, navigation}) => {

    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("StepFourScreen")
            }} >
                <Text>Running</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate("StepFiveScreen")
            }}>
                <Text>Biking</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 15,
        height: SIZES.height / 16,
        backgroundColor: Colors.whitesmoke2,
        borderRadius: 8,
        padding: 5,
        marginVertical: 20
    }
})