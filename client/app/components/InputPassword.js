import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'

const data = {
    name: 'eye-off',
    active: true
}

const InputPassword = (props) => {

    const [dataChange, setDataChange] = useState(data)


    const ok = () =>{
        setDataChange({...dataChange, active: !dataChange.active, name: !dataChange.active ? 'eye': 'eye-off' })
    }
  
    return (
        <View style={{borderBottomWidth: 1, borderColor: Colors.lightGrey, flexDirection: "row"}}>
            <TextInput 
                secureTextEntry={dataChange.active} 
                placeholderTextColor={Colors.lightGrey} 
                placeholder='••••••••' 
                style={styles.TextInput}
                value={props.value}
                onChangeText= {props.onChangeText} {...props} />

            <TouchableOpacity onPress={ok}>
                <Ionicons name={dataChange.name} size={25} color='grey' />
            </TouchableOpacity>
        </View>
    )
  
}

const styles = StyleSheet.create({
    TextInput: {
        flex: 1, 
        fontSize: 16,  
        // marginTop: 5,
    }
})


export default InputPassword;