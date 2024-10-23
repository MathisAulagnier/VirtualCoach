import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";

import slides from "../../constants/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator  from "./Paginator";
import NexButton  from "./NextButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "../screens/Login";
import MainRegister from "../screens/MainRegister";


export default function Onboarding({navigation}){

    const [currentIndex, setCurrentIndex] = useState(0);

    const [showHomePage, setShowHomePage] = useState(false);

    const [start, setStart] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);
    const viwableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = async () => {
        if (currentIndex <  slides.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 }); 
        }else {
            try {
                setShowHomePage(true);
            } catch (error) {
                console.log('Error @setItem: ', error);
            }
        }
    }
    if(!showHomePage) {
        return (
            <View style={styles.container}>
                <View style={{flex: 3}}>
                    <FlatList
                        data={slides}
                        renderItem={({ item }) => <OnboardingItem item={item} />} 
                        horizontal
                        showsHorizontalScrollIndicator= {false}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(iten) => iten.id}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX } } }], {
                            useNativeDriver: false,
                        })}
                        scrollEventThrottle={32}
                        onViewableItemsChanged={(viwableItemsChanged)}
                        viewabilityConfig={viewConfig}
                        ref={slideRef}                                                             
                    />
                </View>
                <Paginator data={slides} scrollX={scrollX} />
                {
                    start? (
                        <View>
                            <Text>Start</Text>
                        </View>
                    ) :

                    <NexButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
                }
            </View>
        )
    }

    return(
        <MainRegister navigation={navigation}/>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center"
    },
})