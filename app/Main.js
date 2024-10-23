import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';
// import { AuthStack, HomeStack } from './Navigations/StackNavigator';
import Onboarding from './components/Onboarding';
import HomeScreen from './screens/HomeScreen';
import MainRegister from './screens/MainRegister';
import UserInfosCollect from './screens/UserInfosCollect';
import { AuthStack, UserInfoCollectStack } from './navigations/StackNavigator';


export default class Main extends Component {

  state = {
      firstLaunch: null,
      log: null
  }

  async AlreadyLaunched() {
      let launched = await AsyncStorage.getItem('isAlreadyLaunched')
      if(launched == null) {
          await AsyncStorage.setItem('isAlreadyLaunched', "true")
          this.setState({firstLaunch: true})
      } else {
          this.setState({firstLaunch: false})
      }
  }
  
  async LoggedIn() {
      let login = await AsyncStorage.getItem('login')
    //   request = JSON.parse(request)
      if(login == null || !login) {
          this.setState({log: false})
      } else {
          this.setState({log: true})
      }
  }

  async componentDidMount() {
      this.LoggedIn()
      this.AlreadyLaunched()
    //   SplashScreen.hide();
  }

  render() {
      let {firstLaunch, log} = this.state
      return (
         <SafeAreaView style={{flex: 1}}>
            {
                firstLaunch == null ? null:
                firstLaunch == true ? <Onboarding />:
                firstLaunch == false && !log ? <AuthStack />:
                <UserInfoCollectStack />
            }
         </SafeAreaView>
      )
  }
}
