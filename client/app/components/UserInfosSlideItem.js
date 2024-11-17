import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import StepTwoView from "../screens/StepTwoView";
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from "react-native-gesture-handler";
import { data } from "../../constants/dataObjective";
import StepTreeView from "../screens/StepTreeView";
import Nb_workout_step from "../screens/nb_workout_step";

export default function UserInfosSlideItem({ item, navigation }) {
    const { width, height } = useWindowDimensions();
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedText, setSelectedText] = useState("");

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false); 

    const [bodyWeightSquat, setBodyWeightSquat] = useState('');
    const [pushUp, setPushUp] = useState('');
    const [pullUp, setPullUp] = useState('');

    const handleButtonPress = (buttonText) => {
        setSelectedButton(buttonText);
        setSelectedText(buttonText);
    };

    const handleBodyWeightSquatChange = (text) => {
        setBodyWeightSquat(text);
    };

    const handlePushUpChange = (text) => {
        setPushUp(text);
    };

    const handlePullUpChange = (text) => {
        setPullUp(text);
    };

    console.log(bodyWeightSquat, pushUp, pullUp);

    return (
        <View style={[styles.container, { width }]}>
            {/* {item.image ? (
                <Image
                    source={item?.image}
                    style={[styles.image, { width, resizeMode: 'contain' }]}
                />
            ) : null} */}

            <ScrollView style={{ flex: 0.7, marginBottom: 10,}}>
                {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
                {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
                {item.step_one ?
                    <View style={{ flex: 0.7, alignItems: "center" }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            paddingHorizontal: 4,
                            marginVertical: 10,
                            color: Colors.black,
                            textAlign: "left",
                            alignSelf: "flex-start",
                        }}>Obejective</Text>
                        {item.step_one.map((text, index) => (
                            <View style={styles.buttonSelect} key={index}>
                                <TouchableOpacity
                                    onPress={() => handleButtonPress(text)}
                                    style={[
                                        styles.button,
                                        selectedButton === text && { backgroundColor: Colors.whitesmoke3 }
                                    ]}
                                    activeOpacity={0.6}
                                >
                                    <Text style={[
                                        styles.text,
                                        selectedButton === text && { color: Colors.black }
                                    ]}>
                                        {text}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            paddingHorizontal: 4,
                            marginTop: 15,
                            color: Colors.black,
                            textAlign: "left",
                            alignSelf: "flex-start",
                        }}>Specification</Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: Colors.whitesmoke2 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={
                                selectedButton == "Lose Weight" ? data.lose_weight :
                                selectedButton == "Stay Fit" ? data.stay_fit :
                                selectedButton == "Get Stronger" ? data.get_stronger :
                                selectedButton == "Improve Cardio" ? data.improve_cardio :
                                selectedButton == "Gain Muscle Mass" ? data.increase_muscle_mass :
                                selectedButton == "Tone and Sculpt" ? data.tone_and_sculpt :
                                selectedButton == "Prepare for an Event" ? data.prepare_for_event :
                                selectedButton == "Learn a Movement" ? data.learn_movement :
                                selectedButton == "Rehabilitate After an Injury" ? data.rehabilitate_after_injury :
                                []
                            }
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? selectedButton : selectedButton}
                            searchPlaceholder="Search specification..."
                            value={value}
                            disable={selectedButton ? false : true}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? Colors.blueb : 'black'}
                                    name="book"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                    : null}

                {item.step_two ?
                    <StepTwoView
                        value={{ bodyWeightSquat, pushUp, pullUp }}
                        onChangeTextBW={handleBodyWeightSquatChange}
                        onChangeTextPshUp={handlePushUpChange}
                        onChangeText={handlePullUpChange}
                        navigation={navigation}
                    />
                    : null}

                {item.nb_workout_step ?
                    <Nb_workout_step
                        value={{ bodyWeightSquat, pushUp, pullUp }}
                        onChangeTextBW={handleBodyWeightSquatChange}
                        onChangeTextPshUp={handlePushUpChange}
                        onChangeText={handlePullUpChange}
                        navigation={navigation}
                    />
                    : null}
                {item.step_tree ?
                    <StepTreeView />
                    : null}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
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
        color: Colors.blueb,
        textAlign: 'left',
        marginTop: 15,
    },
    description: {
        fontWeight: '400',
        fontSize: 17,
        paddingBottom: 15,
        width: SIZES.width - 10,
        color: Colors.blueb,
        textAlign: 'left',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 4,
        color: Colors.blackGrey
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 25,
        height: SIZES.height / 16,
        backgroundColor: Colors.whitesmoke,
        borderRadius: 8,
        padding: 5,
    },
    buttonSelect: {
        paddingVertical: 5,
    },
    stepview: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        width: SIZES.width - 25,
        height: SIZES.height / 14,
        backgroundColor: Colors.whitesmoke2,
        borderRadius: 5,
        padding: 5,
    },
    icon: {
      marginRight: 8,
    },
    dropdown: {
        height: 50,
        borderColor: Colors.whitesmoke,
        backgroundColor: Colors.whitesmoke,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        height: SIZES.height / 15,
        marginTop: 10,
        marginBottom: 20,
        width: SIZES.width - 25,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
});
