import React from "react";
import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";


export default function OnboardingItem({item}){

    const {width, height} = useWindowDimensions();
    // console.log('Height :', height);
    return (
        <View style = {[styles.container, {width,}]}>
            <Image 
                source={item.image} 
                style={[styles.image,{ width, resizeMode: 'contain',}]} 
            />

            <View style= {{flex: 0.2, }}>
                <Text style= {styles.title}>{item.title}</Text>
                <Text style= {styles.description}>{item.description}</Text>
            </View>
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
    image: {
        flex: 0.8,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize : 28,
        marginBottom: 10,
        color: '#008DD0',
        textAlign: 'center'
    },
    description: {
        fontWeight: '400',
        fontSize: 17,
        color: '#008DD0',
        textAlign: 'center',
        paddingHorizontal: 64
    },
})