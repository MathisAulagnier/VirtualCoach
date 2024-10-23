import React from "react";
import { Button, StyleSheet, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation } from "@react-navigation/native";

export default StepFiveScreen = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <InputIcon label={"Biking"} 
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
})