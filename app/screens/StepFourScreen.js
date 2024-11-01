import React from "react";
import { Button, Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import SimpleNextBtn from "../components/SimpleNextBtn";
import { SIZES } from "../../constants/styles";

export default StepFourScreen = (props) => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container} >
            <View style= {{flexDirection: "column", justifyContent: 'space-between', flex: 1}}>
                <Text style={styles.title}>Run on a treadmill with 0 incline for 30 mins.</Text>
                <View style= {{flex: 0.6, justifyContent: "center"}}>
                    
                    <InputIcon label={"What was your average running speed at the end of 30mins ?"} 
                        style={{marginVertical: 10,}}
                        placeholder= {"0"}
                        keyboardType= {"numeric"}
                        value={props.value} 
                        onFocus={props.onFocus} 
                        onTextInput={props.onTextInputPllup}
                        onChangeText={props.onChangeText}
                    />
                </View>
                <View style= {{flex: 0.3, justifyContent: "flex-end"}} >
                    <SimpleNextBtn onPress={() => {
                        navigation.navigate("Home")
                    }}
                        style={{}}
                    />
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        // flexDirection: "column",
        // justifyContent: 'center',
        // alignContent: "center",
        // alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 15,
    },
    title: {
        fontWeight: '700',
        fontSize: 25,
        width: SIZES.width - 25,
        marginVertical: 20,
        lineHeight: 35,
        color: '#008DD0',
        textAlign: 'left'
    },
})