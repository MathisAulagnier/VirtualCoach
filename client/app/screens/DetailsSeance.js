import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default DetailsSeance = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState(route.params.training);
    // console.log(route.params.training);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    

    return (
        <View>
            {Object.keys(route.params.training).map((sessionKey, index) => (
                <TouchableOpacity style={styles.cardsView} key={index}
                    onPress={() => {
                        navigation.navigate("ListeExercice", {
                            data: data[sessionKey],
                            name: capitalizeFirstLetter(sessionKey)
                        })
                    }}
                >
                    <View style={{flexDirection: "row", justifyContent: "space-between", flex: 1, paddingHorizontal: 8}}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                            <AntDesign style= {{backgroundColor: Colors.blue, padding: 6, borderRadius: 6}} name="rocket1" size={24} color={Colors.white} />
                            <Text style={{fontSize: 20, fontWeight: "600", textAlign: "left", paddingHorizontal: 8}}>{capitalizeFirstLetter(sessionKey)}</Text>
                        </View>
                        <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "space-around", }}>
                            <Text style={{fontSize: 16, fontWeight: "400", color: Colors.black}}>Exercises</Text>
                            <View style={{flexDirection: "row", alignItems: "center",}}>
                                <AntDesign name="caretright" size={24} color={Colors.whitesmoke3} />
                                <Text style={{fontSize: 17, fontWeight: "500", padding: 5, color: Colors.greenb }}>{data[sessionKey].length}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    cardsView: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        width: SIZES.width - 20,
        height: SIZES.height / 12,
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