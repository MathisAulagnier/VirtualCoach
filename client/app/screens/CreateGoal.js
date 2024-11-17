import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { SIZES } from "../../constants/styles";
import { Colors } from "../../constants/Colors";

export default CreateGoal = () => {

    const [loading, setLoading] = useState(false);

    const handleCreateGoal = async () => {
        try {
            setLoading(true)
            const userDataFile = 'user3.json'; // Nom du fichier utilisateur
            const response = await fetch('http://192.168.0.175:4000/api/generate-training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userDataFile }), // Envoyer la valeur de userDataFile
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la génération du plan d\'entraînement');
            }
            console.log('Plan d\'entraînement généré avec succès:', data);
            setLoading(false)
        } catch (error) {
            console.error('Erreur:', error.message);
            setLoading(false)
        }
    };


    return loading ? (
        <ActivityIndicator
            visible={loading}
            textContent={'Loading...'}
            size='large'
            color={Colors.blueGrey}
            style= {{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.white,}}
            />
        ) : (
        <View style={styles.container} >
            <View >
                <TouchableOpacity style={styles.view} onPress={
                            () => handleCreateGoal()
                        }    
                    >
                    <Text style={{
                        color: Colors.white,
                        padding: 20,
                        fontSize: 16,
                    }} >Create workout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    view:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.blueb,
        marginVertical: 25,
        borderRadius: 5,
        flexDirection: 'row',
        width: SIZES.width -10,
        alignSelf: "center"
    },
})