import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'



const Button = (props) => {
 return(
    <TouchableOpacity onPress={props.handleb} {...props} 
        style={{...props.view,}}
        disabled={props.disabled} >
        <View style={{...styles.view, ...props.styleView, backgroundColor: props.disabled ? Colors.whitesmoke2 : Colors.blueb}}>
            <Text style={{...styles.text, ...props.styleText, color: props.disabled ? Colors.grey : Colors.white}}>{props.title}</Text>
            {
                props.animate ? <ActivityIndicator color={Colors.blackGrey} size={'small'} animating={props.animate} /> : null
            }
        </View>
    </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.blue,
        marginHorizontal: 10,
        flexDirection: 'row',
    },

    text:{
        color: Colors.white,
        paddingRight: 5,
        fontSize: 17,
    }
})

export default Button;