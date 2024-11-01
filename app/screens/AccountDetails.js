import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Switch, useContext } from 'react-native-gesture-handler'
import Button from '../components/Button'
import { Colors } from '../../constants/Colors'
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '../../constants/styles'
import InputIcon from '../components/InputIcon'
import { useSelector } from 'react-redux'

const AccountDetails = (props) => {

    const reduxUserData = useSelector((state) => state.global.userData);
    const [user, setUser] = useState(reduxUserData);

    const [open, setOpen] = useState(false)
    const [requireUsername, setRequireUsername] = useState(false);
    const [requirePrenom, setRequirePrenom] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)


    let userData = {
        username: "",
        phoneNumber: "",
        email: "",
        weight: "",
        gender: null,
        height: "",
        age: "",
        IMC: "",
        myHabits: {
            tobacco: false,
            alcohol: false,
            physicaActivity: false,
        },
    }
    const [userInfo, setUserInfo] = useState(userData)

    useEffect(() => {
        setLoadingPage(true);
        setUserInfo(reduxUserData);
        setLoadingPage(false);
    }, [reduxUserData]);

    

    const toggleTabac = () => {
        setUserInfo({...userInfo, myHabits: { ...userInfo.myHabits, tobacco : !userInfo.myHabits.tobacco}});
    };

    async function checkTextInput (){
        if (!userInfo.username.trim()) {
            setRequireUsername(true)            
            return;
        }
        setRequireUsername(false);
        setLoading(true)
        
    };


  return (
    <View style={styles.container} >
        { loadingPage ? (
            <ActivityIndicator
                visible={loadingPage}
                textContent={'Loading...'}
                size='large'
                color={Colors.blue}
                style= {{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.whitesmoke2,}}
                />
            ) : (
        <ScrollView>
            <View>
                <Text style={{fontWeight: '600', paddingVertical: 20, fontSize: 18, color: Colors.blueb,}} >My personal information</Text>
                <InputIcon style={{backgroundColor: Colors.whitesmoke2}} placeholder={"Username"} name={"person"} label={"Username"} requireInput={requireUsername} value={userInfo.username} 
                    onChangeText={(value) =>{
                        setUserInfo({...userInfo, username : value})
                        setRequireUsername(false);
                    }}
                />
                <InputIcon style={{backgroundColor: Colors.whitesmoke2}} placeholder={"Phone"} name={"call"} label={"Phone number"} keyboardType={'phone-pad'} value={userInfo.formatPhoneNumber}
                    onChangeText={(value) =>{
                        setUserInfo({...userInfo, phoneNumber : value})
                    }}
                />
                <InputIcon style={{backgroundColor: Colors.whitesmoke2}} placeholder={"Email"} name={"email"} label={"Email"} requireInput={requireUsername} value={userInfo.email} 
                    onChangeText={(value) =>{
                        setUserInfo({...userInfo, email : value})
                        setRequireUsername(false);
                    }}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', }} >
                    <View style={{ paddingHorizontal: 0, marginVertical: 5,marginHorizontal: 5, width: SIZES.width/2.4, }}>
                        <Text style={{paddingVertical: 5, fontSize: 16,}} >My size</Text>
                        <View style={styles.viewInput}>
                            <MaterialCommunityIcons name={"human-male-height"} size={20} color={Colors.grey} style={{marginLeft: 6}} />
                            <TextInput style={styles.input} placeholderTextColor={Colors.grey} placeholder={'82'} keyboardType={'numeric'} value={userInfo.height}  
                                onChangeText={(value) =>{
                                    setUserInfo({...userInfo, taille : value})
                                }}
                            />
                            <Text 
                                style={{
                                    paddingHorizontal: 9, 
                                    alignSelf: 'flex-end', 
                                    height: '100%', 
                                    textAlignVertical: 'center', 
                                    borderBottomRightRadius: 5, 
                                    borderTopRightRadius: 5}} 
                                    >cm
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 0, marginVertical: 5,marginHorizontal: 5, width: SIZES.width/2.4}}>
                        <Text style={{paddingVertical: 5, fontSize: 16,}} >My weight</Text>
                        <View style={styles.viewInput}>
                            <MaterialCommunityIcons name={"weight-kilogram"} size={20} color={Colors.grey} style={{marginLeft: 6}} />
                            <TextInput style={styles.input} placeholderTextColor={Colors.grey} placeholder={'150'} keyboardType={'numeric'} value={userInfo.weight}
                                onChangeText={(value) =>{
                                    setUserInfo({...userInfo, weight : value})
                                }}
                            />
                            <Text 
                                style={{
                                    paddingHorizontal: 9, 
                                    height: '100%', 
                                    textAlignVertical: 'center', 
                                    borderBottomRightRadius: 5, 
                                    borderTopRightRadius: 5}} 
                                >kg
                            </Text>
                        </View>
                    </View>
                </View>
                <InputIcon style={{backgroundColor: Colors.whitesmoke2}} placeholder={"Age"} name={"calendar-month"} label={"Age"} 
                    // value={moment(date).format('ll')} 
                    value={userInfo.age}
                    onFocus={() => setOpen(true)} 
                    // onTextInput={() => setOpen(true)}
                />                 
                <View>
                    <Text style={{fontWeight: '600', paddingVertical: 20, fontSize: 18, color: Colors.red,}}> My babits</Text>
                    <View style={styles.switchView} >
                        <View style={{flexDirection: 'row', alignItems: 'center',}} >
                            <MaterialIcons name='smoking-rooms' size={25} color={Colors.red} />
                            <Text style={{fontSize: 15, fontWeight: '400', color: Colors.black, paddingLeft: 10,}} >Tabacco</Text>
                        </View>
                        <Switch
                            rackColor={{ false: Colors.blackGrey, true: Colors.blueGrey}}
                            onValueChange={toggleTabac}
                            value={userInfo.myHabits?.tobacco}
                        />
                    </View>
                    <View style={styles.switchView} >
                        <View style={{flexDirection: 'row', alignItems: 'center',}} >
                            <Entypo name='drink' size={25} color={Colors.red} />
                            <Text style={{fontSize: 15, fontWeight: '400', color: Colors.black, paddingLeft: 10,}} >Alcohol</Text>
                        </View>
                        <Switch
                            rackColor={{ false: Colors.blackGrey, true: Colors.blueGrey}}
                            onValueChange={toggleTabac}
                            value={userInfo.myHabits?.tobacco}
                        />
                    </View>
                    <View style={styles.switchView} >
                        <View style={{flexDirection: 'row', alignItems: 'center',}} >
                            <MaterialIcons name='sports-gymnastics' size={25} color={Colors.red} />
                            <Text style={{fontSize: 15, fontWeight: '400', color: Colors.black, paddingLeft: 10,}} >Physica Activity</Text>
                        </View>
                        <Switch
                            rackColor={{ false: Colors.blackGrey, true: Colors.blueGrey}}
                            onValueChange={toggleTabac}
                            value={userInfo.myHabits?.tobacco}
                        />
                    </View>
                </View>
                <Button title="Save" animate={loading} disabled={loading} styleView ={styles.styleViewb} handleb={() => 
                    {
                        checkTextInput()
                    }} 
                />
            </View>  
        </ScrollView>
        )}
    </View>
  )
}

export default AccountDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whitesmoke,
        padding: 8,
    },
    viewInput:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.white,
        borderColor: Colors.whitesmoke,
        borderWidth: 1,
    },
    styleViewb: {
      marginTop: 25,
      marginBottom: 15,
      height: SIZES.height/17,
      width: SIZES.width - 20,
      alignSelf: 'center',
      borderRadius: 3,
    },
    switchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    input:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: SIZES.height/18,
        fontSize: 14,
        color: Colors.black,
        width: SIZES.width/5,
    },
    grpsang: {
        borderColor: Colors.grey, 
        borderWidth: 1,
        padding: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    view:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.blue,
        marginVertical: 25,
        borderRadius: 3,
        flexDirection: 'row',
    },

    text:{
        color: Colors.white,
        padding: 10,
        fontSize: 16,
    },
})