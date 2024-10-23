import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import StepTwoView from "./StepTwoView";
import StepTreeView from "./StepTreeView";

export default function UserInfosSlideItem({ item, initialBodyWeightSquat }) {
    const { width, height } = useWindowDimensions();
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedText, setSelectedText] = useState("");

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
            {item.image ? (
                <Image
                    source={item?.image}
                    style={[styles.image, { width, resizeMode: 'contain' }]}
                />
            ) : null}

            <View style={{ flex: 0.7,}}>
                { item.title? <Text style={styles.title}>{item.title}</Text>: null }
                { item.description? <Text style={styles.description}>{item.description}</Text>: null }
                { item.step_one ? item.step_one.map((text, index) => (
                    <View style={styles.buttonSelect} key={index}>
                        <TouchableOpacity
                            onPress={() => handleButtonPress(text)}
                            style={[
                                styles.button,
                                selectedButton === text && { backgroundColor: "#9AE0FF" } // Change la couleur si sélectionné
                            ]}
                            activeOpacity={0.6}
                        >
                            {/* <AntDesign name="heart" size={20} color={selectedButton === text ? "#fff" : Colors.red} /> */}
                            <Text style={[
                                styles.text,
                                selectedButton === text && { color: Colors.black } // Change le texte en blanc si sélectionné
                            ]}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )) : null}

                {console.log("****",item.step)}
                
                {item.step_two ? 
                    <StepTwoView
                        value={{ bodyWeightSquat, pushUp, pullUp }}
                        onChangeTextBW={handleBodyWeightSquatChange}
                        onChangeTextPshUp={handlePushUpChange}
                        onChangeText={handlePullUpChange}
                    />
                : null}
                {item.step_tree ? 
                    <StepTreeView
                        
                    />
                : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 0.3,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 25,
        width: SIZES.width - 20,
        marginBottom: 10,
        lineHeight: 35,
        color: '#008DD0',
        textAlign: 'left'
    },
    description: {
        fontWeight: '400',
        fontSize: 17,
        paddingBottom: 15,
        width: SIZES.width -10,
        color: '#008DD0',
        textAlign: 'left',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 4,
        color: Colors.black
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - 25,
        height: SIZES.height / 16,
        backgroundColor: Colors.whitesmoke2,
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
    }
});
