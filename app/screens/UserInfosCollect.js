import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Animated } from "react-native";
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

export default function UserInfosCollect() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHomePage, setShowHomePage] = useState(false);
    const [isAlreadyLaunchedHome, setIsAlreadyLaunchedHome] = useState(null);
    const [showStepTwoPage, setShowStepTwoPage] = useState(true);
    
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);

    // Fonction pour vérifier si l'application a déjà été lancée
    const AlreadyLaunchedHome = async () => {
        const launched = await AsyncStorage.getItem('isAlreadyLaunchedHome');
        if(!launched == null || false) {
            setIsAlreadyLaunchedHome(false);
        } else {
            setIsAlreadyLaunchedHome(true);
        }
        
        console.log('////////////////////////',JSON.parse(launched));
    };

    useEffect(() => {
        setUser(reduxUserData);
    }, [reduxUserData]);

    
    // Mettre à jour les données utilisateur dans Redux
    const changeData = () => {
        const newUserData = { name: "John Doe", age: 30 };
        dispatch(setUserData(newUserData));
    };

    useEffect(() => {
        AlreadyLaunchedHome();
    }, []);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const viwableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const scrollTo = async () => {
        if (user.IMC > 30 ) {
            navigation.navigate("Home");
        } else {
            if (currentIndex < slidesUserInfo.length - 1) {
                slideRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
                navigation.navigate("StepTreeView");
            }
        }
    };

    if (showStepTwoPage && isAlreadyLaunchedHome == true) {
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
                        renderItem={({ item }) => <UserInfosSlideItem item={item} />} 
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
                        onViewableItemsChanged={viwableItemsChanged}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
    },
});
