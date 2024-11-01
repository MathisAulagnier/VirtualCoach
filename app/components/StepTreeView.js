import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputIcon from "./InputIcon";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";

export default StepTreeView = ({props, navigation}) => {

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Which one would you prefer to grade your endurence ?</Text>
            <View style={{flex: 0.7}} >
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate("StepFourScreen")
                }} >
                    <Text style={styles.text}>Running</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate("StepFiveScreen")
                }}>
                    <Text style={styles.text}>Biking</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
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
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.blueb,
        fontSize: 18,
        fontWeight: '500',
    },
    title: {
        flex: 0.3,
        fontWeight: '700',
        fontSize: 25,
        width: SIZES.width - 25,
        marginVertical: 25,
        lineHeight: 35,
        color: '#008DD0',
        textAlign: 'left'
    },
})