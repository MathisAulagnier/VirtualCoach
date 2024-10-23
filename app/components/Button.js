import { Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'



const Button = (props) => {
 return(
    <TouchableOpacity onPress={props.handleb} {...props} style={{...props.view}} disabled={props.disabled} >
        <View style={{...styles.view, ...props.styleView}}>
            <Text style={{...styles.text, ...props.styleText}}>{props.title}</Text>
            <ActivityIndicator color={Colors.white} size={'small'} animating={props.animate} />
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