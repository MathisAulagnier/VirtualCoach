import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";

export default nb_workout_step = (props) => {

    const  {navigation} = props;
    return (
        <View style={styles.container} >
            <InputIcon label={"Number of training sessions per week"} 
                style={{marginVertical: 10}} 
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                maxLength={2}
                onFocus={props.onFocus} 
                onTextInput={props.onTextInput}
                onChangeText={props.onChangeTextBW}
            />
            <InputIcon label={"Number of minutes per session"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                maxLength={2}
                onFocus={props.onFocus} 
                onTextInput={props.onTextInput}
                onChangeText={props.onChangeTextPshUp}
                
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        paddingVertical: 15
    }
})