import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosSlideItem from "../components/UserInfosSlideItem";
import NextBtnPaginator from "../components/NextBtnPaginator";
import HomeScreen from "./HomeScreen";
import NextBtn from "../components/NextBtn";
import slidesUserInfo from "../../constants/slidesUserInfo";
import { useDispatch } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";
import UserInfoStepTwo from "./UserInfoStepTwo";
import { useNavigation } from "@react-navigation/native";



export default function UserInfosCollect({}){
    
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0);

    const [showHomePage, setShowHomePage] = useState(false);

    const [showStepTwoPage, setShowStepTwoPage] = useState(true);

    const changeData = () => {
        const newUserData = { name: "John Doe", age: 30 };
        dispatch(setUserData(newUserData)); // Mettre à jour Redux
    };

    const [start, setStart] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);
    const viwableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = async () => {
        if (currentIndex <  slidesUserInfo.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 }); 
        }else {
            try {
                // setShowHomePage(true)
                navigation.navigate("StepTreeView")

            } catch (error) {
                console.log('Error @setItem: ', error);
            }
        }
    }

    if (showStepTwoPage) {
        return (
            <UserInfoStepTwo onPress={() => {
                setShowStepTwoPage(false)
                console.log('onPress UserInfoCollect: showHomePage >>', showHomePage);
            }}
                navigation={navigation}

            />
        )
    }

    if(!showHomePage && !showStepTwoPage) {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <FlatList
                        data={slidesUserInfo}
                        renderItem={({ item }) => <UserInfosSlideItem item={item} />} 
                        horizontal
                        showsHorizontalScrollIndicator= {false}
                        scrollEnabled={true}
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
                <View style={{flex: 2}}>
                    <NextBtnPaginator data={slidesUserInfo} scrollX={scrollX} />
                    <NextBtn scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slidesUserInfo.length)} />
                </View>
            </View>
        )

    }
    // if (showHomePage) {
    //     return(
    //         <HomeScreen navigation={navigation}/>
    //     )
    // }
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center"
    },
})