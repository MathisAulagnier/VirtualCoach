import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default Endurance = ({props}) => {

    const navigation = useNavigation();
    const route = useRoute();

    console.log("route.params.cardio:::",route.params.cardio);

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Which one would you prefer to use to grade your endurance ?</Text>
            <View style={{flex: 0.7}} >
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.replace("RuningAvgScreen", {cardio : route.params.cardio, route: route.params.route})
                }} >
                    <Text style={styles.text}>Running</Text>
                    <MaterialIcons name="directions-run" size={28} color={Colors.blue} />
                </TouchableOpacity >
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.replace("BikingAvgScreen", {cardio : route.params.cardio, route: route.params.route})
                }}>
                    <Text style={styles.text}>Biking</Text>
                    <MaterialIcons name="directions-bike" size={28} color={Colors.blue} />
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
        height: SIZES.height / 15,
        backgroundColor: Colors.whitesmoke2,
        borderRadius: 8,
        padding: 5,
        marginVertical: 20
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.black,
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 8,
    },
    title: {
        flex: 0.3,
        fontWeight: '700',
        fontSize: 25,
        width: SIZES.width - 25,
        marginVertical: 25,
        lineHeight: 35,
        color: Colors.blueb,
        textAlign: 'left'
    },
})