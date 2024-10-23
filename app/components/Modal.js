import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RNModal from 'react-native-modal'
import { Colors } from '../../constants/Colors'


const Modal = (props) => {

    return (

        <RNModal
            isVisible={props.showmodal}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            animationOutTiming={1}
        >
            <View style={styles.rnmodalView} >
                <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.black, }} >{props.title}</Text>
                <Text style={{ marginVertical: 25, fontSize: 16, color: Colors.blackGrey, }} >{props.texte} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }} >
                    <TouchableOpacity
                        style={styles.modalBtn}
                        onPress={props.onPress}
                    >
                        <Text style={{ color: Colors.blue, fontSize: 16, }} >Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </RNModal>

    )
}

export default Modal

const styles = StyleSheet.create({
    rnmodalView: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        shadowColor: Colors.lightGrey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginLeft: 10,
        // elevation: 2,
        // shadowColor: Colors.black,
        // shadowOffset: {
        //     width: 2,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.5,
    },
})