import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image, useImage } from 'expo-image';
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputSearch from "../components/InputSearch";
import { Ionicons } from "@expo/vector-icons";
import CustomImage from "../components/CustomImage";

export default ListeExercice = () => {

    const navigation = useNavigation();

    const imagePath = '../../data/data_gifs/Shoulder/dumbbell-external-shoulder-rotation.gif';

    // const imageSource = require(imagePath);
        

    const route = useRoute();
    const [data, setData] = useState(route.params.data);


    return (
        <View style={{ width: SIZES.width, flex: 1, backgroundColor: Colors.whitesmoke2,}} >
            <View style={{ paddingTop: 15, paddingHorizontal: 8, flex: 0.15}}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.blueb, paddingBottom: 8, }}>{route.params.name}</Text>
                <View style={{ }} >
                    <InputSearch style= {{backgroundColor: Colors.whitesmoke,}}/>
                </View>
            </View>
            <ScrollView style={{ width: SIZES.width, flex: 0.8 }} >
                <View style={styles.cardsView} >
                    {data.map((item, index) => (
                        <TouchableOpacity style={styles.cardButton} key={index}
                            onPress={() => {
                                console.log((item.gif_path).toString());
                                
                                navigation.navigate("DetailsExercice", {
                                    data: item,
                                })
                            }}
                        >
                            <View style={{ borderTopEndRadius: 8, }} >
                                {/* <Image source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }} style={styles.gif}/> */}
                                <Image
                                    // source={require((item.gif_path).toString())}
                                    source={{ uri: item.gif_path }}
                                    style={styles.gif}
                                    resizeMethod="auto"
                                    contentFit="contain"
                                />
                                {/* <CustomImage imagePath={"https://github.com/MathisAulagnier/VirtualCoach/blob/main/data/data_gifs/Shoulder/front-raises.gif"} style={styles.gif}/> */}
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }} >
                                <Text style={{ fontSize: 14, fontWeight: '400', color: Colors.green, paddingTop: 10}}>{item.exercise_name}</Text>
                                <View style={{flexDirection: "row", alignItems: "center",}}>
                                    <Text style={{fontSize: 16, fontWeight: "400", padding: 5, color: Colors.blueb }}>Sets : {item.sets}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black
    },
    cardsView: {
        flex: 10,
        flexWrap: 'wrap', 
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: Colors.whitesmoke2,
        justifyContent: "space-between",
        alignSelf: 'center',
        width: SIZES.width,
    },
    cardButton: {
        backgroundColor: Colors.whitesmoke,
        borderColor: Colors.whitesmoke,
        width: SIZES.width/2.3,
        margin: 10,
        borderRadius: 8,
    },
    gif: {
        width: SIZES.width/2.3,
        height: SIZES.width/2.3,
        borderTopEndRadius: 8, 
        borderTopLeftRadius: 8,
        backgroundColor: Colors.white
    },
})