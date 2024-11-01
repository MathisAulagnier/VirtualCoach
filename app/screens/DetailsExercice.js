import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";

export default DetailsExercice = () => {

    const route = useRoute();

    const [seconds, setSeconds] = useState(60);
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
        setSeconds(60);
        setIsActive(false);
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={[styles.timeView, {backgroundColor: isActive ? Colors.red : Colors.greenb}]} >
                        <Text style={styles.timerText}>00 : {seconds}</Text>
                    </View>
                    <Button styleView={styles.styleViewb} title="Start" onPress={startCountdown} disabled={isActive} animate={isActive} styleText={styles.styleText} />
                    <Button styleView={styles.styleViewb} title="Reset" onPress={resetCountdown} animate={false} styleText={styles.styleText}/>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }} >
                    <Text style={{ fontSize: 20, fontWeight: '600', }} >{route.params.exerciseName}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: Colors.green, paddingTop: 10 }}>Step</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Ionicons name="flash" size={20} color={Colors.red} />
                        <Text style={{ fontSize: 18, fontWeight: "400", padding: 5, color: Colors.blueb }}>2/3</Text>
                    </View>
                </View>
                <View style={{ borderTopEndRadius: 8, alignItems: "center"}} >
                    <TouchableOpacity style={{ backgroundColor: Colors.white, padding: 15, position: "absolute", right: 0, zIndex: 100 }}
                        onPress={
                            () => Alert.alert("Alert !", "Not yet implemented")
                        }    
                    >
                        <FontAwesome name="refresh" size={35} color={Colors.red} style={{ }} />
                    </TouchableOpacity>
                    {/* <Image source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }} style={styles.gif}/> */}
                    <Image
                        source={route.params.imgUrl}
                        style={styles.gif}
                        resizeMethod="auto"
                        resizeMode="contain"
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
    },
    gif: {
        width: SIZES.width - 20,
        height: SIZES.height / 3,
        borderRadius: 8,
        backgroundColor: Colors.white
    },
    timerText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.white
    },
    timeView: {
        borderRadius: 100,
        width: SIZES.width/2.5,
        height: SIZES.width/2.5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15,
    },
    styleViewb: {
        marginTop: 15,
        height: SIZES.height/16,
        width: SIZES.width /2.5,
        alignSelf: 'center',
        borderRadius: 3,
    },
    styleText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600',
    }
})