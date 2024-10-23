import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation } from "@react-navigation/native";

export default StepFourScreen = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <InputIcon label={"What was your average running speed at the end of 30mins ?"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                keyboardType= {"numeric"}
                value={props.value} 
                onFocus={props.onFocus} 
                onTextInput={props.onTextInputPllup}
                onChangeText={props.onChangeText}
            />
            <Button title="Next" onPress={() => {
                navigation.navigate("Home")
            }}/>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    }
})