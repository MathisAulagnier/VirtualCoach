import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputIcon from "./InputIcon";

export default StepTwoView = (props) => {

    const  {navigation} = props;
    return (
        <View style={styles.container} >
            <InputIcon label={"How many bodweight squat can you do ?"} 
                style={{marginVertical: 10}} 
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                onFocus={props.onFocus} 
                onTextInput={props.onTextInput}
                onChangeText={props.onChangeTextBW}
            />
            <InputIcon label={"How many push-up can you do ?"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                onFocus={props.onFocus} 
                onTextInput={props.onTextInput}
                onChangeText={props.onChangeTextPshUp}
                
            />
            <InputIcon label={"How many pull-ups can you do ?"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                onFocus={props.onFocus} 
                onTextInput={props.onTextInputPllup}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        paddingVertical: 15
    }
})