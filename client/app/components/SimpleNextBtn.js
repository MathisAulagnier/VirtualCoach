import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Svg, {G, Circle, Line} from 'react-native-svg';
import { SIZES } from "../../constants/styles";


export default SimpleNextBtn = ({onPress}) => {

    const {width, height} = useWindowDimensions();

    useEffect(() => {
        // console.log("start1");
    }, []);

    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.6}>
                {/* <AntDesign name="arrowright" size={32} color={"#fff"}/> */}
                <Text style={styles.text} >Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent : "flex-end",
        alignItems : "flex-end",
    },
    button : {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width/3.5,
        height: SIZES.height / 18,
        backgroundColor: Colors.blue,
        borderRadius: 5,
        padding: 5,
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.white,
        fontSize: 18,
        fontWeight: '500',
    }
})