import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Animated, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfosSlideItem from "../../components/UserInfosSlideItem";
import NextBtnPaginator from "../../components/NextBtnPaginator";
import NextBtn from "../../components/NextBtn";
import slidesUserInfo from "../../../constants/slidesUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../hooks/globalSlice";
import UserInfoStepTwo from "../UserInfoStepTwo";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../constants/Colors";

export default function PerformanceStepOne() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const scrollX = useRef(new Animated.Value(0)).current;
    const slideRef = useRef(null);

    useEffect(() => {
        setUser(reduxUserData);
        setLoading(false)
    }, [reduxUserData]);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const scrollTo = async () => {
        if (user.imc > 30) {
            navigation.navigate("Home");
        } else {
            if (currentIndex < slidesUserInfo.length - 1) {
                slideRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
                navigation.navigate("StepTreeView");
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
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={slideRef}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <NextBtnPaginator data={slidesUserInfo} scrollX={scrollX} />
                    <NextBtn scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slidesUserInfo.length)} />
                </View>
            </View>
        );
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
