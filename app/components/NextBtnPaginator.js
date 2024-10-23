import { Colors } from "../../constants/Colors";
import React from "react";
import { StyleSheet, Text, Animated, useWindowDimensions, View } from "react-native";


export default NextBtnPaginator = ({data, scrollX}) => {

    const {width, height} = useWindowDimensions();
    return (
        <View style = {{flexDirection: 'row',}}>
            {data.map((_,i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                })

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                })

                return <Animated.View style= {[styles.dot, {width: dotWidth, opacity}]} key={i.toString()}/>
            })}
        </View>
    )
}

const styles = StyleSheet.create ({
    dot : {
        height: 8,
        borderRadius: 5,
        backgroundColor: Colors.blue,
        marginHorizontal: 8,
    }
})