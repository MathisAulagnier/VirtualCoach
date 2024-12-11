import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import NextBtn from "../components/NextBtn";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { sexe } from "../../constants/userInfo";
import { setUserData } from "../../hooks/globalSlice";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";


export default UserInfoStepTwo = ({ navigation, onPress }) => {
    const dispatch = useDispatch();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);
    const [loading, setLoading] = useState(true);

    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedHeight, setSelectedHeight] = useState('');

    useEffect(() => {
        setUser(reduxUserData);
        console.log("Reduuuuuuuuuuuuuuuuuuuux", reduxUserData);
        
        if (reduxUserData) {
            setLoading(false)
        }
    }, [reduxUserData]);

    const ageRange = Array.from({ length: 150 }, (_, i) =>11 + i + 1).map(age => ({
        label: age.toString(),
        value: age
    }));
    const weightRange = Array.from({ length: 291 }, (_, i) => 20 + i).map(weight => ({
        label: weight.toString(),
        value: weight
    }));
    const heightRange = Array.from({ length: 350 }, (_, i) => 29 + i + 1).map(height => ({
        label: height.toString(),
        value: height
    }));
    const onSubmit = () => {
        if (!selectedWeight) {
            Alert.alert("Alert !", "Weight is required. Please provide it.")
            return;
        }
        if (!selectedHeight) {
            Alert.alert("Alert !", "Height is required. Please provide it.")
            return;
        }else {
            dispatch(setUserData({
                ...user,
                sexe: selectedGender,
                age: selectedAge,
                weight: selectedWeight,
                height: selectedHeight,
                imc: (selectedWeight/(selectedHeight*selectedHeight)),
            }));
        }
    };
    console.log("++++++++UserInfoStepTwo: ", user)

    if (loading) {
        return (
            <ActivityIndicator
                visible={loading}
                textContent={'Loading...'}
                size='large'
                color={Colors.blueb}
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.white }}
            />
        );
    } else {

        return (
            <View style={[styles.container, { backgroundColor: Colors.white }]}>
                <Text style={styles.title}>Hi {user?.name ? user?.name + ', ' : null}please provide the following information.</Text>
                <Text style={styles.description}>MyCoach can unlock your body's hidden potential, but to do that, it needs the most accurate information from you.</Text>

                <View style={{ flex: 8, marginVertical: 20 }}>
                    <View style={{ marginTop: 20 }} >
                        <RNPickerSelect 
                            onValueChange={(value) => setSelectedGender(value)}
                            items={sexe}
                            placeholder={{}}
                            style={pickerSelectStyles}
                        >
                            <View style={styles.button}>
                                <Text style={{ fontSize: 17, fontWeight: '600' }} >
                                    Gender
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 15, paddingHorizontal: 4 }} >{selectedGender}</Text>
                                    <AntDesign name="right" size={17} color={"#000"} />
                                </View>
                            </View>
                        </RNPickerSelect>
                        <RNPickerSelect 
                            onValueChange={(value) => setSelectedAge(value)}
                            items={ageRange}
                            placeholder={{}}
                            style={pickerSelectStyles}
                        >
                            <View style={styles.button} >
                                <Text style={{ fontSize: 17, fontWeight: '600' }} >
                                    Age
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 15, paddingHorizontal: 4 }} >{selectedAge}</Text>
                                    <AntDesign name="right" size={17} color={"#000"} />
                                </View>
                            </View>
                        </RNPickerSelect>
                        <RNPickerSelect 
                            onValueChange={(value) => setSelectedWeight(value)}
                            items={weightRange}
                            placeholder={{}}
                            style={pickerSelectStyles}
                        >
                            <View style={styles.button} >
                                <Text style={{ fontSize: 17, fontWeight: '600' }} >
                                    Weight
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 15, paddingHorizontal: 4 }} >{selectedWeight+ ' kg'}</Text>
                                    <AntDesign name="right" size={17} color={"#000"} />
                                </View>
                            </View>
                        </RNPickerSelect>
                        <RNPickerSelect 
                            onValueChange={(value) => setSelectedHeight(value)}
                            items={heightRange}
                            placeholder={{}}
                            style={pickerSelectStyles}
                        >
                            <View style={styles.button} >
                                <Text style={{ fontSize: 17, fontWeight: '600' }} >
                                    Height
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 15, paddingHorizontal: 4 }} >{selectedHeight+ ' cm'}</Text>
                                    <AntDesign name="right" size={17} color={"#000"} />
                                </View>
                            </View>
                        </RNPickerSelect>
                    </View>
                </View>

                <View style={{ flex: 2 }}>
                    <NextBtn 
                        scrollTo={onSubmit} 
                        onPress={() => {
                            if (selectedHeight && selectedWeight) {
                                onPress();
                            }
                        }} 
                        
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    image: {
        flex: 0.3,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 25,
        width: SIZES.width - 25,
        marginBottom: 10,
        lineHeight: 35,
        color: '#008DD0',
        textAlign: 'left'
    },
    description: {
        fontWeight: '400',
        fontSize: 16,
        paddingBottom: 15,
        width: SIZES.width - 25,
        color: Colors.blackGrey,
        textAlign: 'left',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 4,
        color: Colors.blackGrey
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:  'red',
        width: SIZES.width - 25,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginVertical: 10,
        borderBottomColor: Colors.whitesmoke2,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderWidth: 0,
        borderColor: Colors.white,
        color: 'black',
        // paddingRight: 30,
        // backgroundColor: 'red',
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