import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Animated, ActivityIndicator } from "react-native";
import UserInfosSlideItem from "../../components/UserInfosSlideItem";
import NextBtnPaginator from "../../components/NextBtnPaginator";
import NextBtn from "../../components/NextBtn";
import slidesUserInfo from "../../../constants/slidesUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../hooks/globalSlice";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../constants/Colors";

export default function PerformanceStepOne() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    
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

    const saveObjectWorkoutSpec = async (nbrWorkout, timeWorkout) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            nbrWorkout: nbrWorkout,
            timeWorkout: timeWorkout,
        }));
        } catch (error) {
            console.log('Error saving data workout spec: ', error);
        }
    };

    const saveObjectCurrentStrength = async (bodyWeightSquat, pushUp, pullUp) => {
        try {
          dispatch(setUserData({
            ...reduxUserData,
            upper: (pushUp < 10 || pullUp < 3) ? 0 : 1,
            lower: bodyWeightSquat < 10 ? 0 : 1,		
        }));
        } catch (error) {
            console.log('Error saving data current strength:', error);
        }
    };

    const scrollTo = async (nbrWorkout, timeWorkout, bodyWeightSquat, pushUp, pullUp) => {
        // if (isScrolling) return;
        // setIsScrolling(true);
        console.log("scrollTo appelé avec les paramètres :::: ", nbrWorkout, timeWorkout, bodyWeightSquat, pushUp, pullUp);
        if (user.imc > 30) {
            navigation.replace("CreateGoal");
        } else {
            if (currentIndex < slidesUserInfo.length - 1) {
                if (nbrWorkout && timeWorkout) {
                    saveObjectWorkoutSpec(nbrWorkout, timeWorkout)
                }
                slideRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
                saveObjectCurrentStrength(bodyWeightSquat, pushUp, pullUp)
                navigation.replace("Endurance", {cardio : bodyWeightSquat, route: "performance"});
            }
        }
        // setIsScrolling(false);
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
                        renderItem={({ item }) => <UserInfosSlideItem item={item} navigation={navigation} scrollTo={scrollTo}/>}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(item) => item.id.toString()}
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
