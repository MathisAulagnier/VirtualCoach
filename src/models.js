const fs = require('fs');
const axios = require('axios');

let attemptCount = 0; // Initialisation du compteur de tentatives
const maxRetries = 5; // Nombre maximum de tentatives

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
            "Please create a warmup routine of only 3 different exercise names suitable for the user's goal and cardio level. " +
            "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0). " +
            "Include the muscle group targeted for each exercise. " +
            "Just return the json file with the names, sets, repetitions, rest_time, GIF_path, and muscle_group without an text introduction or other text out of the json file."
        )
    };
    messages.push(warmupPrompt);
    const warmupJson = await chatWithOllama('llama3', messages, 3);
    messages.pop();
    console.log(warmupJson);
    if (!warmupJson) return null;

    // Génération des étirements
    console.log("Génération des étirements...");
    const stretchPrompt = {
        role: "user",
        content: (
            "Please create a stretching routine of only 3 different exercise names to follow after the workout, considering the user's goal, restrictions, and cardio level. " +
            "Include the muscle group targeted for each exercise. " +
            "Just return the json file with the names, sets, repetitions, rest_time, GIF_path, and muscle_group without an text introduction or other text out of the json file."
        )
    };
    messages.push(stretchPrompt);
    const stretchJson = await chatWithOllama('llama3', messages, 3);
    if (!stretchJson) return null;
    console.log(stretchJson);
    messages.pop();

    // Génération des séances d'entraînement
    let workoutPlans = [];
    let exerciseNames = [];
    for (let i = 0; i < userInfo['nbrWorkout']; i++) {
        console.log(`Génération de la séance d'entraînement #${i + 1}...`);
        const workoutPrompt = {
            role: "user",
            content: (
                `The user data is:\n${JSON.stringify(userInfo)}\n\n` +
                `Please create a workout of only ${(userInfo['timeWorkout']-15)/15} different exercise names that aligns with the user's goal, cardio level, and equipment restrictions and who are not among them ${exerciseNames}. ` +
                "Include the muscle group targeted for each exercise. " +
                "Just return the json file with the names, sets, repetitions, rest_time, gif_path, and muscle_group without an text introduction or other text out of the json file."
            )
        };
        messages.push(workoutPrompt);
        const workoutJson = await chatWithOllama('llama3', messages, (userInfo['timeWorkout']-15)/15);
        if (!workoutJson) return null;
        // Récupérer les noms des exercices

        const newExerciseNames = workoutJson.map(exercise => exercise.exercise_name);
        exerciseNames = exerciseNames.concat(newExerciseNames);

        console.log(workoutJson);
        workoutPlans.push(workoutJson);
        messages.pop();
        console.log("kkked");
    }

    // Regrouper tous les éléments du programme dans un seul JSON
    let trainingPlan = {};
    console.log("kkkzzzzzed");
    workoutPlans.forEach((workout, index) => {
        trainingPlan[`seance${index + 1}`] = {
            warmup: warmupJson,
            workouts: workout,
            stretch: stretchJson
        };
    });
    console.log("kkkzaeezezzed");

    // Écrire le plan d'entraînement dans un fichier JSON
    console.log("outputFile :", outputFile);
    fs.writeFileSync(outputFile, JSON.stringify(trainingPlan, null, 4));
    console.log("yiuiui");
    return trainingPlan;
}

// Fonction pour envoyer un message à l'API Ollama
async function chatWithOllama(model, messages, nb_exercise) {
    try {
        let string_all_reponse = '';
        let last_chunk = '';

        console.log(messages);

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

                if( (last_chunk.slice(-1) === ":" && ((partialResponse.response.slice(-1) >= '0' && partialResponse.response.slice(-1) <= '9') || (partialResponse.response.slice(-1) === '-') )) ||
                    (((last_chunk.slice(-1) >= '0' && last_chunk.slice(-1) <= '9') || (last_chunk.slice(-1) === '-')) && partialResponse.response.slice(0,1) === ",") ) {
                    string_all_reponse += '"';
                }


                // Vérification si partialResponse contient une clé 'response' valide
                if (partialResponse.response && partialResponse.response !== "],") {
                    string_all_reponse += partialResponse.response; // Ajouter chaque morceau à la réponse complète
                }

                //console.log(partialResponse.response);

                if (partialResponse.done) {
                    // Ajout de ']' si nécessaire
                    if (last_chunk.slice(-1) !== "]" && partialResponse.response !== "]") {
                        string_all_reponse += "]";
                    }

                    // Nettoyage de la réponse en supprimant les parties non-JSON
                    let cleanedResponse = string_all_reponse
                        .replace(/^.*?(\[.*\]).*$/, '$1') // Supprimer les commentaires
                        .trim();

                    // Remplacement de "(" par "["
                    cleanedResponse = cleanedResponse.replace(/\(/g, "[");

                    // Remplacement de ")" par "]"
                    cleanedResponse = cleanedResponse.replace(/\)/g, "]");

                    cleanedResponse = cleanedResponse.replace(/"-/g, "\"");
                    cleanedResponse = cleanedResponse.replace(/-"/g, "\"");

                    // Remplacement de "}],\n[{" par "},{"
                    cleanedResponse = cleanedResponse.replace(/}],\s*\[{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}]\s*\[{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}\s*\[{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}]\s*{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/},\s*\[{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}],\s*{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}","{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/},"{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}",{/g, "},{");
                    cleanedResponse = cleanedResponse.replace(/}\s*{/g, "},{");


                    // Remplacement de "exercise" par "name"
                    cleanedResponse = cleanedResponse.replace(/"name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"exercise"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Exercise"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Exercise_name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Exercise_Name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Exercise Name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"exercise name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Exercise name"/g, "\"exercise_name\"");
                    cleanedResponse = cleanedResponse.replace(/"Name"/g, "\"exercise_name\"");


                    // Remplacement de "Rest_time" par "rest_time"
                    cleanedResponse = cleanedResponse.replace(/rest time/g, "rest_time");
                    cleanedResponse = cleanedResponse.replace(/Rest time/g, "rest_time");
                    cleanedResponse = cleanedResponse.replace(/Rest_time/g, "rest_time");

                    cleanedResponse = cleanedResponse.replace(/\s*seconds\s*",/g, "\",");
                    cleanedResponse = cleanedResponse.replace(/\s*seconds\s*,/g, "\",");
                    cleanedResponse = cleanedResponse.replace(/\s*second\s*,/g, "\",");
                    cleanedResponse = cleanedResponse.replace(/\s*second\s*",/g, "\",");

                    cleanedResponse = cleanedResponse.replace(/:\s*hold\s*,/g, ": \"hold\",");
                    cleanedResponse = cleanedResponse.replace(/:\s*hold\s*"\s*,/g, ": \"hold\",");
                    cleanedResponse = cleanedResponse.replace(/:\s*"\s*hold\s*,/g, ": \"hold\",");

                    // Remplacement de "GIF_path" par "gif_path"
                    cleanedResponse = cleanedResponse.replace(/Gif_path/g, "gif_path");
                    cleanedResponse = cleanedResponse.replace(/gif path/g, "gif_path");
                    cleanedResponse = cleanedResponse.replace(/GIF_path/g, "gif_path");

                    // Remplacement de "muscle group" par "muscle_group"
                    cleanedResponse = cleanedResponse.replace(/muscle group/g, "muscle_group");
                    cleanedResponse = cleanedResponse.replace(/Muscle_group/g, "muscle_group");
                    cleanedResponse = cleanedResponse.replace(/Muscle group/g, "muscle_group");
                    cleanedResponse = cleanedResponse.replace(/muscle_groupe/g, "muscle_group");

                    cleanedResponse = cleanedResponse.replace(/}].*$/, "}]");
                    cleanedResponse = cleanedResponse.replace(/^.*?\[\{/s, "[{");
                    cleanedResponse = cleanedResponse.replace(/}\,\"\].*$/, "}]");

                    // Remplacement pour supprimer tout après "}]"
                    cleanedResponse = cleanedResponse.replace(/}\s*\].*$/, "}]");

                    // Remplacement pour supprimer tout avant "[{"
                    cleanedResponse = cleanedResponse.replace(/^.*?\[\s*\{/s, "[{");


                    const count_exercise = (cleanedResponse.match(/"exercise_name"/g) || []).length;
                    const count_sets = (cleanedResponse.match(/"sets"/g) || []).length;
                    const count_repetitions = (cleanedResponse.match(/"repetitions"/g) || []).length;
                    const count_rest_time = (cleanedResponse.match(/"rest_time"/g) || []).length;
                    const count_gif_path = (cleanedResponse.match(/"gif_path"/g) || []).length;
                    const count_muscle_group = (cleanedResponse.match(/"muscle_group"/g) || []).length;
                    console.log(cleanedResponse);
                    if( (count_exercise !== nb_exercise) || (count_sets !== nb_exercise) ||
                        (count_repetitions !== nb_exercise) || (count_rest_time !== nb_exercise) ||
                        (count_gif_path !== nb_exercise) || (count_muscle_group !== nb_exercise) )
                    {
                        console.log(count_exercise, " , ", count_sets, " , ", count_repetitions, " , ", count_rest_time, " , ", count_gif_path, " , ", count_muscle_group, " !== ", nb_exercise);
                        // Déclencher manuellement une erreur pour capturer l'exception
                        try {
                            throw new Error("Le nombre d'occurrences de 'exercise_name' ne correspond pas à 'nb_exercise'.");
                        } catch (err) {
                            console.error("Erreur de correspondance du nombre d'exercices :", err);
                             console.log(attemptCount, " < ", maxRetries);
                            // Ajout d'une logique pour limiter la récursion
                            if (attemptCount < maxRetries) { // Vous devez définir attemptCount et maxRetries
                                attemptCount++;
                                console.log(attemptCount, " < ", maxRetries);
                                resolve(chatWithOllama(model, messages, nb_exercise));
                            } else {
                                reject("Erreur lors du parsing JSON après plusieurs tentatives.");
                            }
                        }
                    } else {
                        try {
                            console.log(count_exercise, " , ", count_sets, " , ", count_repetitions, " , ", count_rest_time, " , ", count_gif_path, " , ", count_muscle_group, " !== ", nb_exercise);

                            // Convertir le texte nettoyé en JSON
                            resolve(JSON.parse(cleanedResponse));
                        } catch (err) {
                            console.error("Erreur lors du parsing JSON nettoyé :", err);
                            console.log(attemptCount, " < ", maxRetries);
                            // Ajout d'une logique pour limiter la récursion
                            if (attemptCount < maxRetries) { // Vous devez définir attemptCount et maxRetries
                                attemptCount++;
                                console.log(attemptCount, " < ", maxRetries);
                                resolve(chatWithOllama(model, messages, nb_exercise));
                            } else {
                                reject("Erreur lors du parsing JSON après plusieurs tentatives.");
                            }
                        }
                    }
                }
                if (partialResponse.response !== " ") {
                    last_chunk = partialResponse.response;
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

module.exports = { generateTrainingPlan };
