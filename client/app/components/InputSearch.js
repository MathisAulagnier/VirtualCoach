import { StyleSheet, View, TextInput, } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/styles';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const InputSearch = (props) => {
  return(
    <View style={{...styles.view, ...props.style}}>
      <Ionicons name='search' size={20} color={Colors.grey} style={{marginLeft: 6}} />
      <TextInput 
        style={styles.input} 
        placeholderTextColor={Colors.grey} 
        placeholder={props.placeholder ? props.placeholder: "Search Exercises"} 
        value={props.value}
        defaultValue={props.defaultValue} 
        textContentType={props.textContentType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
      />
    </View>
 )
}

const styles = StyleSheet.create({
    view:{
      flexDirection: 'row',
      alignItems: 'center',
      // borderWidth: 1,
      // borderColor: Colors.lightGrey,
      borderRadius:30,
      backgroundColor: Colors.whitesmoke2,
      paddingHorizontal: 6
  },
  input:{
    paddingLeft:5,
    paddingVertical: 5,
    width: SIZES.width-40,
    height: SIZES.height/18,
    fontSize: 14,
    color: Colors.black,
},
})

export default InputSearch;