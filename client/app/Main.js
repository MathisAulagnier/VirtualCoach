import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './components/Onboarding';
import { AuthStack } from './navigations/StackNavigator';
import { UserInfoCollectStack } from './navigations/navigationStacks';

export default class Main extends Component {
    state = {
        firstLaunch: null,
        log: null,
    };

    async componentDidMount() {
        try {
            const [launched, login] = await Promise.all([
                AsyncStorage.getItem('isAlreadyLaunched'),
                AsyncStorage.getItem('login'),
            ]);

            if (launched === null) {
                await AsyncStorage.setItem('isAlreadyLaunched', "true");
                this.setState({ firstLaunch: true });
            } else {
                this.setState({ firstLaunch: false });
            }

            this.setState({ log: login !== null && login === "true" });
        } catch (error) {
            console.error("Error loading app state: ", error);
        }
    }

    render() {
        const { firstLaunch, log } = this.state;

        if (firstLaunch === null || log === null) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {firstLaunch ? (
                    <Onboarding />
                ) : !log ? (
                    <AuthStack />
                ) : (
                    <UserInfoCollectStack />
                )}
            </SafeAreaView>
        );
    }
}
