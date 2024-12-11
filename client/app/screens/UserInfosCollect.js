import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Animated, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosSlideItem from "../components/UserInfosSlideItem";
import NextBtnPaginator from "../components/NextBtnPaginator";
import HomeScreen from "./HomeScreen";
import NextBtn from "../components/NextBtn";
import slidesUserInfo from "../../constants/slidesUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";
import UserInfoStepTwo from "./UserInfoStepTwo";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";

export default function UserInfosCollect({ props }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHomePage, setShowHomePage] = useState(false);
    const [isAlreadyLaunchedHome, setIsAlreadyLaunchedHome] = useState(false);
    const [showStepTwoPage, setShowStepTwoPage] = useState(true);
    
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);

    const AlreadyLaunchedHome = async () => {
        const launched = await AsyncStorage.getItem('isAlreadyLaunchedHome');

        if(launched == null || false) {
            setIsAlreadyLaunchedHome(false);
            setLoading(false)
        } else {
            setIsAlreadyLaunchedHome(true);
            setLoading(false)
        }
    };

    useEffect(() => {
        setUser(reduxUserData);
    }, [reduxUserData]);

    useEffect(() => {
        AlreadyLaunchedHome();
    }, []);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const saveObjectWorkoutSpec = async (nbrWorkout, timeWorkout) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            nbrWorkout: nbrWorkout,
            timeWorkout: timeWorkout,
        }));
        } catch (error) {
            console.log('Error saving data workout spec:', error);
        }
    };

    const saveObjectCurrentStrength = async (bodyWeightSquat, pushUp, pullUp) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            upper: (pushUp < 10 || pullUp < 3) ? 0 : 1,
            lower: (bodyWeightSquat < 10) ? 0 : 1,		
        }));
        } catch (error) {
            console.log('Error saving data current strength:', error);
        }
    };

    const scrollTo = async (nbrWorkout, timeWorkout, bodyWeightSquat, pushUp, pullUp) => {
        console.log("/n");
        console.log("################################################################scrolllllll");
        
        if (user.imc > 30) {
            navigation.navigate("Home");
        } else {
            if (currentIndex < slidesUserInfo.length - 1) {
                if (nbrWorkout && timeWorkout) {
                    saveObjectWorkoutSpec(nbrWorkout, timeWorkout)
                }
                slideRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
                saveObjectCurrentStrength(bodyWeightSquat, pushUp, pullUp)
                navigation.navigate("Endurance", {cardio : bodyWeightSquat});
            }
        }
    };

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

        if (showStepTwoPage && isAlreadyLaunchedHome == false) {
            return (
                <UserInfoStepTwo
                    onPress={() => {
                        setShowStepTwoPage(false);
                    }}
                    navigation={navigation}
                />
            );
        }
    
        if (!showHomePage && !showStepTwoPage) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 8 }}>
                        <FlatList
                            data={slidesUserInfo}
                            renderItem={({ item }) => <UserInfosSlideItem item={item} navigation={navigation} scrollTo={scrollTo} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={true}
                            pagingEnabled
                            bounces={false}
                            keyExtractor={(item) => item.id.toString()} // Assurez-vous que `item.id` est une chaîne
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                                useNativeDriver: false,
                            })}
                            scrollEventThrottle={32}
                            onViewableItemsChanged={viewableItemsChanged}
                            viewabilityConfig={viewConfig}
                            ref={slideRef}
                        />
                    </View>
                    <View style={{ flex: 2, alignItems: "center" }}>
                        <NextBtnPaginator data={slidesUserInfo} scrollX={scrollX} />
                        <NextBtn scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slidesUserInfo.length)} />
                    </View>
                </View>
            );
        }
    
        return <HomeScreen navigation={navigation} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
    },
});
