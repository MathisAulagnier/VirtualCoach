import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Svg, {G, Circle, Line} from 'react-native-svg';
import { SIZES } from "../../constants/styles";


export default NextBtn = ({percentage, scrollTo, onPress}) => {

    const {width, height} = useWindowDimensions();
    const size = 120;


    useEffect(() => {
        console.log("start1");
    }, []);

    return (
        <View style = {styles.container}>
            <Svg height={size} width={size} fill={"#fff"}>
                {/* <G rotation={''} origin={center}>
                    <Line stroke="red" strokeWidth={120}/>
                    <Line 
                        ref={progressRef}
                        stroke={Colors.blue}  
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (percentage * 368 ) / 100}
                    />
                </G>                 */}
            </Svg>
            <TouchableOpacity onPress={() => {
                if (scrollTo) {
                    scrollTo();
                }
                if (onPress) {
                    onPress();
                }
            }} style={styles.button} activeOpacity={0.6}>
                {/* <AntDesign name="arrowright" size={32} color={"#fff"}/> */}
                <Text style={styles.text} >Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center",
        // backgroundColor: 'red'
    },
    button : {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width - 20,
        height: SIZES.height / 16,
        backgroundColor: Colors.blue,
        borderRadius: 10,
        padding: 5,
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600',
    }
})