import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'expo-image';
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputSearch from "../components/InputSearch";
import { Ionicons } from "@expo/vector-icons";

export default ListeExercice = () => {

    const navigation = useNavigation();

    const gifData = [
        require('../../data/gifs/crunch-avec-jambes-verticales.gif'),
        require('../../data/gifs/crunch-machine-abdos.gif'),
        require('../../data/gifs/crunch-papillon-butterfly-sit-ups.gif'),
        require('../../data/gifs/crunch-sangle-suspension-trx.gif'),
        require('../../data/gifs/curl-allonge-a-la-poulie.gif'),
        require('../../data/gifs/curl-au-pupitre-barre-ez-larry-scott.gif'),
        require('../../data/gifs/curl-avec-elastique.gif'),
        require('../../data/gifs/curl-barre.gif'),
        require('../../data/gifs/curl-biceps-avec-halteres-alterne-assis.gif'),
        require('../../data/gifs/curl-biceps-poulie-basse.gif')
    ]

    const route = useRoute();


    return (
        <View style={{ width: SIZES.width, flex: 1}} >
            <View style={{ paddingTop: 15, paddingHorizontal: 8, flex: 0.15}}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.blueb, paddingBottom: 8, }}>{route.params.data}</Text>
                <View style={{ }} >
                    <InputSearch />
                </View>
            </View>
            <ScrollView style={{ width: SIZES.width, flex: 0.8 }} >
                <View style={styles.cardsView} >
                    {gifData.map((item, index) => (
                        <TouchableOpacity style={styles.cardButton} key={index}
                            onPress={() => {
                                navigation.navigate("DetailsExercice", {
                                    imgUrl: item,
                                    exerciseName: route.params.data
                                })
                            }}
                        >
                            <View style={{ borderTopEndRadius: 8, }} >
                                {/* <Image source={{ uri: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }} style={styles.gif}/> */}
                                <Image
                                    source={item}
                                    style={styles.gif}
                                    resizeMethod="auto"
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }} >
                                <Text style={{ fontSize: 15, fontWeight: '600', }} >{route.params.data && route.params.data.length > 18 ? route.params.data.substring(0, 18) +'...' : route.params.data}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: Colors.green, paddingTop: 10}}>Sets/Reps</Text>
                                <View style={{flexDirection: "row", alignItems: "center",}}>
                                    {/* <Ionicons name="flash" size={20} color={Colors.red} /> */}
                                    <Text style={{fontSize: 15, fontWeight: "400", padding: 5, color: Colors.blueb }}>3/20</Text>
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