import { StyleSheet, View, TextInput, Text, } from 'react-native'
import React from 'react'
import { MaterialIcons, } from "@expo/vector-icons"
import { Colors } from '../../constants/Colors'
import { SIZES } from '../../constants/styles'


const InputIcon = (props) => {
  return(
    <View style={{

    }} >
        <View style={{flexDirection: 'row',}} >
            <Text style={{padding: 5, fontSize: 16, color: Colors.black}} >{props.label}</Text>
            <Text style={{ fontSize: 16, color: Colors.red}} >{props.require}</Text>
        </View>
        <View style={{...styles.view, ...props.style}}>
            <MaterialIcons name={props.name} size={20} color={Colors.grey} style={{marginLeft: 10}} />
            <TextInput 
                style={styles.input} 
                // placeholderTextColor={Colors.black} 
                placeholder={props.placeholder} 
                value={props.value} 
                onFocus={props.onFocus} 
                onTextInput={props.onTextInput}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
            />
        </View>
        {props.requireInput ?
            <Text style={{color: Colors.red, paddingVertical: 5}} >Please fill in this field!</Text>
            : null
        }
    </View>
    
 )
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: Colors.white,
        borderWidth: 1,
        backgroundColor: Colors.whitesmoke,
    },
    input:{
        paddingLeft: 15,
        paddingVertical: 5,
        width: SIZES.width - 25,
        height: SIZES.height / 16,
        fontSize: 16,
        color: Colors.black,
    },
})

export default InputIcon;