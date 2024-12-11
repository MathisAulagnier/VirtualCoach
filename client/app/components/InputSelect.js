import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from "@expo/vector-icons";


export default InputSelect = (props) => {
    return (
        <RNPickerSelect
            onValueChange={props.onValueChange}
            items={props.data}
            placeholder={props.placeholder}
            style={pickerSelectStyles}
        >
            <View style={styles.button} >
                <Text style={{ fontSize: 17, fontWeight: '600' }} >{props.label}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 15, paddingHorizontal: 4 }} >{props.value}</Text>
                    <AntDesign name="right" size={17} color={"#000"} />
                </View>
            </View>
        </RNPickerSelect>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontWeight: "400",
        fontSize: 17,
        paddingBottom: 15,
        width: SIZES.width - 10,
        color: Colors.blueb,
        textAlign: "left",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        paddingHorizontal: 4,
        marginVertical: 10,
        color: Colors.black,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    buttonSelect: {
        paddingVertical: 5,
    },
    dropdown: {
        height: 50,
        borderColor: Colors.whitesmoke,
        backgroundColor: Colors.whitesmoke,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 15,
        height: SIZES.height / 15,
        marginTop: 4,
        marginBottom: 4,
        width: SIZES.width - 25,
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderWidth: 0,
        borderColor: Colors.white,
        color: 'black',
        // paddingRight: 30,
        backgroundColor: 'red',
        // width: SIZES.width/4,
    },
    inputAndroid: {
        fontSize: 15,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 0,
        borderColor: Colors.white,
        color: 'black',
        // paddingRight: 30,
    },

});