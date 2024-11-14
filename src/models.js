const fs = require('fs');
const axios = require('axios');

// Fonction pour générer un plan d'entraînement
async function generateTrainingPlan(userData, outputFile) {
    // Charger les données utilisateur
    const userInfo = JSON.parse(fs.readFileSync(userData, 'utf8'));

    let messages = [];

    // Ajouter un message système pour la configuration de base
    messages.push({
        role: "system",
        content: (
            "You are a highly knowledgeable and adaptive fitness coach specializing in creating personalized workout programs. " +
            "Your goal is to design an exercise plan based on a user's goal, current physical condition, equipment limitations, and cardiovascular level. " +
            "Based on the provided JSON, generate a structured JSON output with a workout plan that helps the user achieve their goal. " +
            "Include only exercises allowed by the user's equipment availability and cardio level. Each exercise entry should specify the name, sets, repetitions, rest time, GIF path, and the muscle group targeted." +
            `The user data is:\n${JSON.stringify(userInfo)}\n\n`
        )
    });

    // Génération de l'échauffement
    console.log("Génération de l'échauffement...");
    const warmupPrompt = {
        role: "user",
        content: (
            "Please create a warmup routine suitable for the user's goal and cardio level. " +
            "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0). " +
            "Include the muscle group targeted for each exercise. " +
            "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an text introduction or other text out of json file."
        )
    };
    messages.push(warmupPrompt);
    //const warmupOutput = await chatWithOllama('llama3', messages);
    const warmupJson = await chatWithOllama('llama3', messages);
    //console.log(warmupOutput);
    //console.log('Before pop :',messages);
    messages.pop();
    //console.log('After pop :',messages);
    //const warmupJson = extractJson(warmupOutput);
    //const warmupJson = warmupOutput;
    if (!warmupJson) return null;
    //console.log(warmupJson);

    // Génération des étirements
    console.log("Génération des étirements...");
    const stretchPrompt = {
        role: "user",
        content: (
            "Please create a stretching routine to follow after the workout, considering the user's goal, restrictions, and cardio level. " +
            "Include the muscle group targeted for each exercise. " +
            "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an text introduction or other text out of json file."
        )
    };
    messages.push(stretchPrompt);
    //const stretchOutput = await chatWithOllama('llama3', messages);
    const stretchJson = await chatWithOllama('llama3', messages);
    //const stretchJson = extractJson(stretchOutput);
    //const stretchJson = stretchOutput;
    if (!stretchJson) return null;
    //console.log(stretchJson);
    messages.pop();

    // Génération des séances d'entraînement
    let workoutPlans = [];
    for (let i = 0; i < userInfo['nbrWorkout']; i++) {
        console.log(`Génération de la séance d'entraînement #${i + 1}...`);
        const workoutPrompt = {
            role: "user",
            content: (
                `The user data is:\n${JSON.stringify(userInfo)}\n\n` +
                "Please create a workout (not like the previous workout) that aligns with the user's goal, cardio level, and equipment restrictions. " +
                "Include the muscle group targeted for each exercise. " +
                "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an text introduction or other text out of json file."
            )
        };
        messages.push(workoutPrompt);
        //const workoutOutput = await chatWithOllama('llama3', messages);
        const workoutJson = await chatWithOllama('llama3', messages);
        //console.log("iyzeri");
        //const workoutJson = extractJson(workoutOutput);
        if (!workoutJson) return null;
        //console.log(workoutJson);
        workoutPlans.push(workoutJson);
        messages.pop();
    }

    // Regrouper tous les éléments du programme dans un seul JSON
    let trainingPlan = {};
    workoutPlans.forEach((workout, index) => {
        trainingPlan[`seance${index + 1}`] = {
            warmup: warmupJson,
            workouts: workout,
            stretch: stretchJson
        };
    });

    // Écrire le plan d'entraînement dans un fichier JSON
    fs.writeFileSync(outputFile, JSON.stringify(trainingPlan, null, 4));
    return trainingPlan;
}

// Fonction pour envoyer un message à l'API Ollama
async function chatWithOllama(model, messages) {
    try {
        let string_all_reponse = '';

        //console.log('Prompt envoyé à l\'API Ollama:', messages);

        // Envoi de la requête avec réponse en flux
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: JSON.stringify(messages)
        }, {
            responseType: 'stream'  // Recevoir la réponse sous forme de flux (stream)
        });

        // Réception des données en flux
        return new Promise((resolve, reject) => {
            response.data.on('data', (chunk) => {
                const partialResponse = JSON.parse(chunk.toString()); // Convertir le chunk en objet JSON

                if (partialResponse.response) {
                    string_all_reponse += partialResponse.response;  // Ajouter chaque morceau à la réponse complète
                }

                if (partialResponse.done) {
                    // Nettoyage de la réponse en supprimant les parties non-JSON
                    const cleanedResponse = string_all_reponse
                        .replace(/^.*?(\[.*\]).*$/, '$1') // Supprimer les commentaires
                        .trim();

                    try {
                        // Convertir le texte nettoyé en JSON
                        //console.log("yuoollru");
                        console.log(string_all_reponse);
                        //console.log("yuoou");
                        resolve(JSON.parse(string_all_reponse));
                    } catch (err) {
                        console.error("Erreur lors du parsing JSON nettoyé :", err);
                        reject("Erreur lors du parsing JSON");
                    }
                }
            });

            // Gérer les erreurs de flux
            response.data.on('error', (err) => {
                reject(err);  // En cas d'erreur dans le flux
            });
        });

    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API Ollama:', error.message);
        throw error;
    }
}

// Fonction pour extraire le JSON d'une sortie
function extractJson(output) {
    if (output && output.message && output.message.content) {
        const jsonStrCleaned = output.message.content.replace(/\/\/.*/g, '');  // Supprimer les commentaires
        return jsonStrCleaned;
    } else {
        console.error('Structure de sortie inattendue:', output);
        return null;
    }
}

module.exports = { generateTrainingPlan };
