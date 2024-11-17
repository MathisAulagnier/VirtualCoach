import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { useSelector } from 'react-redux'
import { SIZES } from '../../constants/styles'

export default MyAccount = ({navigation}) => {

    const reduxUserData = useSelector((state) => state.global.userData);


  return (
    <View style={styles.container} >
        <View style={{flexDirection: 'row', alignSelf: 'center'}} >
            <View style={{}} >
                <Image source={{uri: "https://cegepgranby.ca/wp-content/uploads/2022/09/entete-services-offerts-salle-de-conditionnement-physique.jpg"}} style={{height: 100, width: 100, borderRadius: 100, }}/>
            </View>
            <TouchableOpacity style={{
                borderRadius: 50, 
                backgroundColor: Colors.white, 
                height: 40, width: 40, 
                justifyContent: 'center', 
                alignItems: 'center',
                marginLeft: -20,
                marginBottom: 10,
                alignSelf:'flex-end',
                elevation: 4

            }} >
                <Ionicons name='pencil-sharp' size={25} color={Colors.blue} style={{}} />
            </TouchableOpacity>
        </View>
        
        <View style={{alignSelf: 'center', padding: 10}} >
            <Text style={{fontWeight: '700'}} >{reduxUserData?.username}</Text>
            <Text style={{fontWeight: '400', alignSelf: 'center'}} >{reduxUserData?.phoneNumber}</Text>
        </View>        
        <ScrollView>
            <View style={{padding: 10, flex: 1,}}>
                <TouchableOpacity style={styles.items} 
                    onPress= {
                        () => navigation.navigate('AccountDetails')
                    }
                >
                    <Ionicons name='folder-open-outline' size={25} color={Colors.yellow} style={styles.listIcon} />
                    <Text style={styles.itemsText}>My personal information</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled style={[styles.items, {backgroundColor: Colors.whitesmoke2}]} 
                    onPress= {
                        () => {Alert.alert("Alert !", "In progress")}
                    }
                >
                    <Ionicons name='ban' size={25} color={Colors.grey} style={styles.listIcon} />
                    <Text style={[styles.itemsText, {color: Colors.grey}]}>My black list</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.whitesmoke,
    },
    items: {
        paddingVertical: 20, 
        borderRadius: 5, 
        backgroundColor: Colors.white, 
        flexDirection: 'row', 
        alignItems: 'center',
        // elevation: 1,
        marginVertical: 6,
    },
    listIcon: {
        paddingHorizontal: 10,
    },
    view:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.red,
        marginVertical: 25,
        borderRadius: 8,
        flexDirection: 'row',
        width: SIZES.width -10,
        alignSelf: "center"
    },

    text:{
        color: Colors.white,
        padding: 10,
        fontSize: 16,
    },
    itemsText: {
        color: Colors.black,
    }
})