import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image, } from 'react-native'
import PhoneInput from "react-native-phone-number-input";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";
import Button from "../components/Button";
// import Modal from "../components/Modal";
import InputIcon from "../components/InputIcon";

export default Register = (props) => {

    const { navigation } = props;

    const [formattedValue, setFormattedValue] = useState("");
    const [showmodal, setShowmodal] = useState(false);
    const [title, setTitle] = useState('');
    const [texte, setTexte] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        formatPhoneNumber: '',
    }); 

    console.log('Register : ',user.name, user.phoneNumber, user.formatPhoneNumber, user.email);
    

    const checkTextInput = () => {
        if (!user.name) {
          Alert.alert("Alert !", "Please enter a name to continue.")
          return;
        }
        props.onSubmit(user)
    };

    const formatPhoneNumber = (number) => {
        // Supprimer tous les espaces, parenthèses ou tirets du numéro de téléphone
        const cleaned = ('' + number).replace(/\D/g, '');
      
        // Ajouter des espaces après chaque groupe de chiffres
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          return `${match[1]} ${match[2]} ${match[3]}`;
        }
      
        return number;
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }} >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ color: Colors.black, textAlign: 'center', marginTop: 50, fontSize: 30, fontWeight: '700' }}>Sign up</Text>
                    <Text style={{ fontSize: 17, color: Colors.black, alignSelf: 'center', marginTop: 25, marginBottom: 50, textAlign: 'center' }} >Please fill in the following information.</Text>
                    <View style={{}} >
                        <InputIcon placeholder={"Enter your user name"} require={"*"} name={"account-circle"} label={"User name"} value={user.name}
                            onChangeText={(value) => {
                                setUser({...user, name: value})
                            }}
                        />
                    </View>
                    <View style={{}} >
                        <InputIcon placeholder={"Enter your email"} name={"email"} label={"Email"} value={user.email}
                            onChangeText={(value) => {
                                setUser({...user, email: value})
                            }}
                        />
                    </View>
                    <View style={styles.view} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ padding: 5, fontSize: 16, color: Colors.black }} >Phone number</Text>
                            <Text style={{ fontSize: 16, color: Colors.grey }} >{'(Optional)'}</Text>
                        </View>
                        <PhoneInput
                            defaultValue={user.phoneNumber}
                            defaultCode="CA"
                            layout="first"
                            containerStyle={styles.phoneInput}
                            placeholder='Phone number'
                            onChangeFormattedText={(text) => {
                                setUser({...user, formatPhoneNumber: text});
                            }}
                            onChangeText={(text) => {
                                setUser({...user, phoneNumber: text});
                                
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                            // autoFocus
                            textInputProps={{
                                maxLength: 10,
                            }}
                        />
                    </View>
                    

                    <Button title="Sign up" animate={props.animate} disabled={props.animate} styleView={styles.styleViewb} handleb={() => {
                        checkTextInput()
                    }}
                    />
                    <View style={{ flexDirection: 'column', maxWidth: SIZES.width, justifyContent: 'space-between', alignItems: "center" }} >
                        <Text style={{ fontSize: 14.5, }} >By logging in, you agree to our </Text>
                        <TouchableOpacity
                        // onPress={() => 
                        //   navigation.navigate('Login')
                        //   }
                        >
                            <Text style={{ color: Colors.red, fontSize: 14.5, fontWeight: '400', }} >Terms of Use</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Modal title={title} texte={texte} showmodal={showmodal} onPress={() => setShowmodal(false)} /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',

    },
    view: {
        paddingVertical: 15,
    },
    styleViewb: {
        marginTop: 35,
        marginBottom: 15,
        height: SIZES.height / 16,
        width: SIZES.width - 15,
        alignSelf: 'center',
        borderRadius: 50,
    },
    TextInput: {
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        fontSize: 18,
        marginTop: 8,
        width: SIZES.width - 85,
    },
    phoneInput: {
        height: SIZES.height / 15,
        width: SIZES.width - 20,
        fontSize: 15,
        borderRadius: 8,
        paddingHorizontal: 5,
        backgroundColor: Colors.whitesmoke,
    },
})