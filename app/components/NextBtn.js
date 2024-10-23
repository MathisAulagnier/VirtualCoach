import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Svg, {G, Circle, Line} from 'react-native-svg';
import { SIZES } from "../../constants/styles";


export default NextBtn = ({percentage, scrollTo, onPress}) => {

    const {width, height} = useWindowDimensions();
    const size = 120;
    const strokeWidth = 3;
    const center = size/2;
    const raduis = size/2 - strokeWidth/2; 
    const circumference = 2 * Math.PI * raduis;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start
    }

    useEffect(() => {
        animation(percentage);
        // console.log('percentage : ', percentage);
        // console.log("%%%%%%", circumference);
        
    }, [percentage]);

    useEffect(() => {
        console.log("start1");

        progressAnimation.addListener((value) => {
            const strokeDashoffset= circumference - (circumference * value.value ) / 100;
            
            if (progressRef?.current) {
                console.log("if****true");
                
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                })
            
            }else {
                console.log('ELSE');
            }
        }, [percentage]);
        // return () => {
        //     progressAnimation.removeAllListeners();
        // }
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
        borderRadius: 15,
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