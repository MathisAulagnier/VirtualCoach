import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";


export default InputDropdown = (props) => {
    return (
        <View style={styles.buttonSelect}>
            <Text style={{ fontSize: 17, fontWeight: '500', paddingVertical: 8 }} >{props.label}</Text>
            <Dropdown
                style={[
                    styles.dropdown,
                    props.isFocus && {
                        borderColor: Colors.whitesmoke2,
                        backgroundColor: Colors.whitesmoke3,
                    },
                ]}
                placeholderStyle={{color: Colors.grey}}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={props.placeholder}
                value={props.value}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onChange={props.onValueChange}
            />
        </View>
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
        width: SIZES.width - 15,
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