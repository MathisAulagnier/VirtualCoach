import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { SIZES } from '../../constants/styles';

export default Profile = ({navigation}) => {
    const icon = 'chevron-forward';
    const size = 22;


    // !!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Fonction pour gérer la création d'un objectif
    const handleCreateGoal = async () => {
        try {
            const userDataFile = 'user1.json'; // Nom du fichier utilisateur
            const response = await fetch('http://localhost:4000/api/generate-training', {
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
        } catch (error) {
            console.error('Erreur:', error.message);
        }
    };
    // !!!!!!!!!!!!!!!!!!!!!!!! FIN DE IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <Text style={[styles.title, { paddingTop: 20 }]}>General</Text>
                <View style={styles.ItemGroup}>
                    <TouchableOpacity style={styles.Item} onPress={() => navigation.navigate('MyAccount')}>
                        <Text style={styles.text}>My account</Text>
                        <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                    </TouchableOpacity>
                    <Divider style={styles.divider} />
                    // !!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    <TouchableOpacity style={styles.Item} onPress={handleCreateGoal}>
                        // !!!!!!!!!!!!!!!!!!!!!!!! FIN DE IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        <Text style={styles.text}>Create a goal</Text>
                        <Ionicons name={icon} size={size} color={Colors.blackGrey} />
                    </TouchableOpacity>
                    {/* Autres éléments */}
                </View>
                {/* Autres sections */}
            </ScrollView>
        </SafeAreaView>
    );
};
