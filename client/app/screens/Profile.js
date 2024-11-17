import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { SIZES } from '../../constants/styles'

export default Profile = ({navigation}) => {
    const icon = 'chevron-forward'
    const size = 22
  return (
    <SafeAreaView style={ styles.Container } >
        <ScrollView>
            <Text style={ [styles.title, {paddingTop: 20,}] } >General</Text>
            <View  style={ styles.ItemGroup }>
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => navigation.navigate('MyAccount')
                    }
                >
                    <Text style={styles.text} >My account</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item } onPress= {
                        () => navigation.navigate('PerformanceStepOne')
                    }
                >
                    <Text style={styles.text} >Performance</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item } onPress= {
                        () => navigation.navigate('CreateGoal')
                    }
                >
                    <Text style={styles.text} >Create a goal</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
            </View>

            <Text style={ [styles.title, {paddingTop: 15,}] } >Security</Text>
            <View  style={ styles.ItemGroup }>
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >Privacy Policy</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >Terms of Use</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
            </View>

            <Text style={ styles.title } >Help</Text>
            <View  style={ styles.ItemGroup }>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >FAQ</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >How it works ?</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
            </View>
            <View  style={ styles.ItemGroup }>
                
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >Contacts</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
                <TouchableOpacity  style={ styles.Item }
                    onPress= {
                        () => {}
                    }
                >
                    <Text style={styles.text} >About</Text>
                    <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                </TouchableOpacity>
                <Divider  style={styles.divider} />
            </View>

            <View >
                <TouchableOpacity style={styles.view} >
                    <Text style={{
                        color: Colors.white,
                        padding: 20,
                        fontSize: 16,
                    }} >Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.whitesmoke,
    },
    ItemGroup: {
        marginVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        elevation: 0.3,
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginVertical: 15,    
    },
    title: {
        color: Colors.blackGrey,
        fontSize: 16.5,
        backgroundColor: Colors.whitesmoke,
        alignSelf: 'center',
        width: SIZES.width,
        paddingLeft: 15,
        paddingBottom: 5,

    },
    text: {
        fontSize: 15.5,
        color: Colors.black,
    },
    divider: {
        height: 1, 
        backgroundColor: Colors.whitesmoke, 
        width: SIZES.width, 
        alignSelf: 'center',
    },
    view:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.red,
        marginVertical: 25,
        borderRadius: 5,
        flexDirection: 'row',
        width: SIZES.width -10,
        alignSelf: "center"
    },
})    