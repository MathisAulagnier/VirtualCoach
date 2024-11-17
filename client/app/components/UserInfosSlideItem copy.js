import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";


export default function UserInfosSlideItem({item}){

    const {width, height} = useWindowDimensions();
    // console.log('Height :', height);
    return (
        <View style = {[styles.container, {width,}]}>
            {
                item.image? 
                <Image 
                    source={item?.image} 
                    style={[styles.image,{ width, resizeMode: 'contain',}]} 
                /> : null       
            }
            <View style= {{flex: 0.7, }}>
                <Text style= {styles.title}>{item.title}</Text>
                <Text style= {styles.description}>{item.description}</Text>

                <View style={styles.buttonSelect} >
                    <TouchableOpacity onPress={()=>{}} style={styles.button} activeOpacity={0.6}>
                        {/* <AntDesign name="arrowright" size={32} color={"#fff"}/> */}
                        <Text style={styles.text} >Build Muscle an Gain Strength</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSelect} >
                    <TouchableOpacity onPress={()=>{}} style={styles.button} activeOpacity={0.6}>
                        {/* <AntDesign name="arrowright" size={32} color={"#fff"}/> */}
                        <Text style={styles.text} >Build Muscle an Gain Strength</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSelect} >
                    <TouchableOpacity onPress={()=>{}} style={styles.button} activeOpacity={0.6}>
                        <AntDesign name="heart" size={20} color={Colors.red}/>
                        <Text style={styles.text} >Decrease Body Fat</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSelect} >
                    <TouchableOpacity onPress={()=>{}} style={styles.button} activeOpacity={0.6}>
                        <AntDesign name="heart" size={20} color={"#fff"}/>
                        <Text style={styles.text} >Stay Healthy and Fit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSelect} >
                    <TouchableOpacity onPress={()=>{}} style={styles.button} activeOpacity={0.6}>
                        {/* <AntDesign name="arrowright" size={32} color={"#fff"}/> */}
                        <Text style={styles.text} >Build Muscle an Gain Strength</Text>
                    </TouchableOpacity>
                </View>
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
        flex: 0.3,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize : 25,
        marginBottom: 10,
        color: '#008DD0',
        textAlign: 'left'
    },
    description: {
        fontWeight: '400',
        fontSize: 17,
        paddingBottom: 10,
        color: '#008DD0',
        textAlign: 'left',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 4,
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 20,
        height: SIZES.height / 16,
        backgroundColor: Colors.whitesmoke2,
        borderRadius: 8,
        padding: 5,
    },
    buttonSelect: {
        paddingVertical: 5,
    }
})