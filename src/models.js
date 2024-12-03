const fs = require('fs');
const axios = require('axios');
const path = require('path');

let attemptCount = 0; // Initialisation du compteur de tentatives
const maxRetries = 10; // Nombre maximum de tentatives

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
            "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0 and no lower body bodyweight exercises if lower is set to 0). " +
            "Include the only muscle group targeted for each exercise who is inside this list [Shoulder, Biceps, Triceps, Chest, Abs, Back, Glutes, Legs, Others, Stretching]. " +
            "Just return the json file with the names, sets, repetitions, rest_time, GIF_path, and muscle_group without an text introduction or other text out of the json file."
        )
    };
    messages.push(warmupPrompt);
    const warmupJson = await globalCall(messages,3)
    messages.pop();
    console.log(warmupJson);

    // Génération des étirements
    console.log("Génération des étirements...");
    const stretchPrompt = {
        role: "user",
        content: (
            "Please create a stretching routine of only 3 different exercise names to follow after the workout, considering the user's goal, restrictions, and cardio level. " +
            "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0 and no lower body bodyweight exercises if lower is set to 0). " +
            "Include the only muscle group targeted for each exercise who is inside this list [Shoulder, Biceps, Triceps, Chest, Abs, Back, Glutes, Legs, Others, Stretching]. " +
            "Just return the json file with the names, sets, repetitions, rest_time, GIF_path, and muscle_group without an text introduction or other text out of the json file."
        )
    };
    messages.push(stretchPrompt);
    const stretchJson = await globalCall(messages,3)
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
                "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0 and no lower body bodyweight exercises if lower is set to 0). " +
                "Include the only muscle group targeted for each exercise who is inside this list [Shoulder, Biceps, Triceps, Chest, Abs, Back, Glutes, Legs, Others, Stretching]. " +
                "Just return the json file with the names, sets, repetitions, rest_time, gif_path, and muscle_group without an text introduction or other text out of the json file."
            )
        };
        messages.push(workoutPrompt);

        const workoutJson = await globalCall(messages,(userInfo['timeWorkout'] - 15) / 15)
        newExerciseNames = workoutJson.map(exercise => exercise.exercise_name);
        exerciseNames = exerciseNames.concat(newExerciseNames);

        console.log(workoutJson);
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
    console.log("outputFile :", outputFile);
    const folderPath = '../client/data/training_plan_json';

    // Vérifier si le dossier existe, sinon le créer
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Écrire le fichier JSON
    fs.writeFileSync(path.join(folderPath, outputFile), JSON.stringify(trainingPlan, null, 4));
    console.log('Fichier JSON écrit avec succès !');

    console.log("Generation effectuee");
    return trainingPlan;
}

async function findNameFiles(name_repo){
    return new Promise((resolve, reject) => {
        try{
            // Chemin vers le dossier "data_gifs/name_repo"
            const name_path = '../client/data/data_gifs/'+name_repo;
            const folderPath = path.join(__dirname, name_path);

            // Lire les fichiers dans le dossier
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.error('Erreur lors de la lecture du dossier data_gifs/', name_repo, ' :', err);
                    return;
                }

                // Filtrer uniquement les fichiers (exclure les sous-dossiers, si nécessaire)
                const fileNames = files.filter(file => {
                    const fullPath = path.join(folderPath, file);
                    return fs.statSync(fullPath).isFile();
                });

                resolve(fileNames);
            });
        } catch (error) {
            console.error('Erreur lors de la lecture des noms de fichier dans le dossier data_gifs/', name_repo, ' :', error.message);
            throw error;
        }
    });
}

async function askGifOllama(model, name_exercise, name_muscle_group) {
    try {
        // Obtenir les noms de fichiers disponibles
        const names_of_files = await findNameFiles(name_muscle_group); // Appeler avec `await`

        if (names_of_files.length === 0) {
            throw new Error('Aucun fichier trouvé pour ce groupe musculaire.');
        }

        let messages = [];

        // Ajouter un message système pour la configuration de base
        messages.push({
            role: "user",
            content: (
                `please, from this exercise name: ${name_exercise}, give me the only good .gif file that you think matches the given exercise.`+
                "If you can't find a .gif file that matches the name of the exercise, just choose “unknown.gif”. " +
                'You should only return a message in the form : {“gif_file" : "filename.gif" like json file. ' +
                `You should choose from the following list of files: \n${JSON.stringify(names_of_files)}\n\n`
            )
        });

        // Envoi de la requête avec réponse en flux
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: JSON.stringify(messages)
        }, {
            responseType: 'stream'  // Recevoir la réponse sous forme de flux (stream)
        });

        // Réception des données en flux
        return new Promise((resolve, reject) => {
            let string_all_reponse = '';

            response.data.on('data', (chunk) => {
                try{
                    const partialResponse = JSON.parse(chunk.toString()); // Convertir le chunk en objet JSON

                    string_all_reponse += partialResponse.response;

                    if (partialResponse.done) {
                        // Nettoyage de la réponse en supprimant les parties non-JSON
                        let cleanedResponse = string_all_reponse

                        // Remplacement pour supprimer tout après "}]"
                        cleanedResponse = cleanedResponse.replace(/}\s*\].*$/, "}]");

                        // Remplacement pour supprimer tout avant "[{"
                        cleanedResponse = cleanedResponse.replace(/^.*?\[\s*\{/s, "[{");

                        const count_gif_file = (cleanedResponse.match(/"gif_file"/g) || []).length;
                        if(count_gif_file !== 1){
                            try {
                                throw new Error("Le nombre d'occurrences de 'gif_file' ne correspond pas à 1.");
                            } catch (err) {
                                console.error("Erreur de correspondance du nombre de gif_file :", err);
                                console.log(attemptCount, " < ", maxRetries);
                                // Ajout d'une logique pour limiter la récursion
                                if (attemptCount < maxRetries) {
                                    attemptCount++;
                                    console.log(attemptCount, " < ", maxRetries);
                                    resolve(askGifOllama(model, name_exercise, name_muscle_group));
                                } else {
                                    reject("Erreur lors du parsing JSON après plusieurs tentatives.");
                                }
                            }
                        }else{
                            try{
                                resolve(JSON.parse(cleanedResponse));
                            }catch (err) {
                                console.error('Erreur lors de la creation du nom du gif:', err);
                                console.log(attemptCount, " < ", maxRetries);
                                // Ajout d'une logique pour limiter la récursion
                                if (attemptCount < maxRetries) {
                                    attemptCount++;
                                    console.log(attemptCount, " < ", maxRetries);
                                    resolve(askGifOllama(model, name_exercise, name_muscle_group));
                                } else {
                                    reject("Erreur lors du parsing JSON après plusieurs tentatives.");
                                }
                            }
                        }

                    }
                } catch (error) {
                    console.error('Erreur lors de l’analyse du chunk gif:', error.message);
                    console.log(attemptCount, " < ", maxRetries);
                    // Ajout d'une logique pour limiter la récursion
                    if (attemptCount < maxRetries) {
                        attemptCount++;
                        console.log(attemptCount, " < ", maxRetries);
                        resolve(askGifOllama(model, name_exercise, name_muscle_group));
                    } else {
                        reject("Erreur lors du parsing JSON après plusieurs tentatives.");
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

async function isTrueGif(gif,name_muscle_group){
    try{
        // Obtenir les noms de fichiers disponibles
        const names_of_files = await findNameFiles(name_muscle_group);

        return new Promise((resolve, reject) => {
            let res = false;
            if(names_of_files.includes(gif)){
                res = true;
            }
            resolve(res);
        });

    }catch (error) {
        console.error('Erreur lors de la vérification du gif:', error.message);
        throw error;
    }
}

// Fonction appel global avec gestion Gif
async function globalCall(messages, nb_exercice){
    try {
        let workoutJson;
        let newExerciseNames;
        let ExerciseMuscleGroup;
        let rerun = false;
        do {
            // Appel de l'API pour obtenir un plan d'entraînement
            workoutJson = await chatWithOllama('llama3', messages, nb_exercice);

            if (!workoutJson) {
                console.error("Erreur : Aucun plan d'entraînement reçu.");
                return null;
            }

            // Récupérer les noms des exercices et les groupes musculaires
            newExerciseNames = workoutJson.map(exercise => exercise.exercise_name);
            ExerciseMuscleGroup = workoutJson.map(exercise => exercise.muscle_group);

            // Vérifier si tous les groupes musculaires sont valides
            rerun = false;
            for (let i = 0; i < ExerciseMuscleGroup.length; i++) {
                if (
                    ExerciseMuscleGroup[i] !== 'Shoulder' &&
                    ExerciseMuscleGroup[i] !== 'Biceps' &&
                    ExerciseMuscleGroup[i] !== 'Triceps' &&
                    ExerciseMuscleGroup[i] !== 'Chest' &&
                    ExerciseMuscleGroup[i] !== 'Abs' &&
                    ExerciseMuscleGroup[i] !== 'Back' &&
                    ExerciseMuscleGroup[i] !== 'Glutes' &&
                    ExerciseMuscleGroup[i] !== 'Legs' &&
                    ExerciseMuscleGroup[i] !== 'Others' &&
                    ExerciseMuscleGroup[i] !== 'Stretching'
                ) {
                    rerun = true;
                    console.warn(`Groupe musculaire invalide trouvé : ${ExerciseMuscleGroup[i]}`);
                    break; // Pas besoin de continuer si un groupe invalide est détecté
                }
            }
        } while (rerun === true);

        let gif_path_array = [];
        let gifPath ;
        let gifExist;
        for (let i = 0; i < newExerciseNames.length; i++) {
            gifPath = await askGifOllama('llama3', newExerciseNames[i], ExerciseMuscleGroup[i]);
            gifExist = await isTrueGif(gifPath.gif_file, ExerciseMuscleGroup[i]);
            if(gifExist === false){
                gifPath.gif_file = 'unknown.gif'
            }
            gif_path_array.push(gifPath);
        }

        return new Promise((resolve, reject) => {
            // Remplacer la valeur de gif_path dans workoutJson avec gif_file depuis gif_path_array
            for (let i = 0; i < workoutJson.length; i++) {
                if (gif_path_array[i] && gif_path_array[i].gif_file) {
                    workoutJson[i].gif_path = 'data_gifs/'+ExerciseMuscleGroup[i]+'/'+gif_path_array[i].gif_file; // Remplacement de la valeur
                } else {
                    console.warn(`Aucun gif trouvé pour l'exercice : ${workoutJson[i].exercise_name}`);
                }
            }
            resolve(workoutJson);
        });
    } catch (error) {
        console.error('Erreur lors de la communication global avec l\'API Ollama:', error.message);
        throw error;
    }
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
                    cleanedResponse = cleanedResponse.replace(/"stretching_name"/g, "\"exercise_name\"");
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

                    cleanedResponse = cleanedResponse.replace(/([a-zA-Z])\s*,/g, '$1",');
                    cleanedResponse = cleanedResponse.replace(/,\s*([a-zA-Z])/g, ',"$1');
                    cleanedResponse = cleanedResponse.replace(/:\s*([a-zA-Z])/g, ': "$1');


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
                            if (attemptCount < maxRetries) {
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
                            if (attemptCount < maxRetries) {
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
