import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'expo-image';
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { Divider } from "react-native-paper";

export default DetailsExercice = () => {

    const route = useRoute();
    const icon = 'fitness-center'
    const size = 22

    const [seconds, setSeconds] = useState(route.params.data.rest_time);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startCountdown = () => {
        setIsActive(true);
    };

    const resetCountdown = () => {
        setSeconds(route.params.data.rest_time);
        setIsActive(false);
    };


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={[styles.timeView, {backgroundColor: isActive ? Colors.red : Colors.greenb}]} >
                        <Text style={styles.timerText}>00 : {seconds}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingVertical: 7, }}>
                        <Button styleView={styles.styleViewb} title="Start" onPress={startCountdown} disabled={isActive} animate={isActive} styleText={styles.styleText} />
                        <Button styleView={styles.styleViewb} title="Reset" onPress={resetCountdown} animate={false} styleText={styles.styleText}/>
                    </View>
                </View>
                    
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: Colors.white, marginVertical: 5, borderRadius: 8}} >
                    <Text style={{ fontSize: 25, fontWeight: '600', fontStyle: "italic"}} >{route.params.data.exercise_name}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 8}}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.black, paddingTop: 10 }}>Sets</Text>
                        <Text style={{ fontSize: 20, fontWeight: '400', color: Colors.green, paddingTop: 10 }}>{route.params.data.sets}/{route.params.data.sets}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "column", alignItems: "flex-start", paddingBottom: 8,  }}>
                    <View style={styles.ItemGroup}>
                        <View style={styles.Item}>
                            <Text style={styles.title} >Repetitions</Text>
                            <View style={{ flexDirection: "row", paddingHorizontal: 8}}>
                                <Text style={styles.text} >{route.params.data.repetitions} x</Text>
                                <MaterialIcons name={"cached"} size={size} color={Colors.whitesmoke3} />
                            </View>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.Item}>
                            <Text style={styles.title} >Muscle group</Text>
                            <View style={{ flexDirection: "row", paddingHorizontal: 8}}>
                                <Text style={styles.text} >{route.params.data.muscle_group}</Text>
                                <MaterialIcons name={"directions-walk"} size={size} color={Colors.whitesmoke3} />
                            </View>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.Item}>
                            <Text style={styles.title} >Rest time</Text>
                            <View style={{ flexDirection: "row", paddingHorizontal: 8}}>
                                <Text style={styles.text} >{route.params.data.rest_time} s</Text>
                                <MaterialIcons name={"access-time"} size={size} color={Colors.whitesmoke3} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: "center", }} >
                    <TouchableOpacity style={{ borderTopEndRadius: 8, padding: 15, position: "absolute", right: 0, zIndex: 100 }}
                        onPress={
                            () => Alert.alert("Alert !", "Not yet implemented")
                        }    
                    >
                        <FontAwesome name="refresh" size={35} color={Colors.red} />
                    </TouchableOpacity>
                    {/* <Image source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }} style={styles.gif}/> */}
                    <Image
                        source={{uri : route.params.data.gif_path}}
                        style={styles.gif}
                        resizeMethod="auto"
                        contentFit="contain"
                    />
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
        backgroundColor: Colors.whitesmoke,
        paddingHorizontal: 10,
    },
    gif: {
        width: SIZES.width - 20,
        height: SIZES.height / 3,
        borderRadius: 8,
        backgroundColor: Colors.white,
        marginBottom: 20,
    },
    timerText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.white
    },
    timeView: {
        borderRadius: 100,
        width: SIZES.width/2.8,
        height: SIZES.width/2.8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15,
    },
    styleViewb: {
        marginTop: 15,
        height: SIZES.height/20,
        width: SIZES.width /2.5,
        alignSelf: 'center',
        borderRadius: 3,
        marginHorizontal: 0,
    },
    styleText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600',
    },
    ItemGroup: {
        marginVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        elevation: 0.3,
        width: "100%",
        borderRadius: 8
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginVertical: 8,    
    },
    text: {
        fontSize: 15,
        color: Colors.blueb,
        paddingHorizontal: 5,
        fontWeight: "600"
    },
    title: {
        color: Colors.black,
        fontSize: 16.5,
        alignSelf: 'center',
    },
})