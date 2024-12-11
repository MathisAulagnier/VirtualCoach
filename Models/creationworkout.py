import json
import re
import ollama

def generate_training_plan(user_data):
    # Charger les données utilisateur
    with open(user_data, 'r') as f:
        user_info = json.load(f)
    
    messages = []
    
    # Ajout du message système pour la configuration de base
    messages.append({
        "role": "system",
        "content": (
            "You are a highly knowledgeable and adaptive fitness coach specializing in creating personalized workout programs. "
            "Your goal is to design an exercise plan based on a user's goal, current physical condition, equipment limitations, and cardiovascular level. "
            "Based on the provided JSON, generate a structured JSON output with a workout plan that helps the user achieve their goal. "
            "Include only exercises allowed by the user's equipment availability and cardio level. Each exercise entry should specify the name, sets, repetitions, rest time, and GIF path."
            f"The user data is:\n{json.dumps(user_info)}\n\n"
        )
    })

    # 1. Générer l'échauffement
    print("Génération de l'échauffement...")
    warmup_prompt = {
        "role": "user",
        "content": (
            "Please create a warmup routine suitable for the user's goal and cardio level. "
            "Ensure that it respects any restrictions (e.g., no upper body bodyweight exercises if upper is set to 0). "
            "Just return the json file with the exercise names, sets, repetitions, rest time, and GIF path without an introduction."
        )
    }
    messages.append(warmup_prompt)
    # print("Prompt pour l'échauffement :", warmup_prompt["content"], "\n")
    warmup_output = ollama.chat(model='llama3', messages=messages)
    # messages.append(
    #     {
    #         "role": "system",
    #         "content": warmup_output['message']['content']
    #     }
    # )
    messages.pop()
    print("Génération de l'échauffement terminée.")
    
    # Traitement du résultat pour l'échauffement
    warmup_json = extract_json(warmup_output)


    # print("Échauffement généré :", warmup_json, "\n______________________________________________________\n")

    
    # 2. Générer les étirements
    print("Génération des étirements...")
    stretch_prompt = {
        "role": "user",
        "content": (
            "Please create a stretching routine to follow after the workout, considering the user's goal, restrictions, and cardio level. "
            "Just return the json file with the exercise names, sets, repetitions, rest time, and GIF path without an introduction."
        )
    }
    messages.append(stretch_prompt)
    # print("Prompt pour les étirements :", stretch_prompt["content"])
    stretch_output = ollama.chat(model='llama3', messages=messages)
    
    # Traitement du résultat pour les étirements
    stretch_json = extract_json(stretch_output)
    # print("Étirements générés :", stretch_json)
    messages.pop()



    # 3. Générer les séances d'entraînement
    workout_plans = []
    for i in range(user_info['nbrWorkout']):
        print(f"Génération de la séance d'entraînement #{i+1}...")
        workout_prompt = {
            "role": "user",
            "content": (
                f"The user data is:\n{json.dumps(user_info)}\n\n"
                f"Please create a workout (not like the previous workout) that aligns with the user's goal, cardio level, and equipment restrictions. "
                "For example, avoid upper body bodyweight exercises if 'upper' is set to 0. "
                "Just return the json file with the exercise names, sets, repetitions, rest time, and GIF path without an introduction."
            )
        }
        messages.append(workout_prompt)
        # print(f"Prompt pour la séance d'entraînement #{i+1} :", workout_prompt["content"])
        workout_output = ollama.chat(model='llama3', messages=messages)
        print(workout_output)
        messages.append(
            {
                "role": "system",
                "content": workout_output['message']['content']
            }
        )
        # Traitement du résultat pour chaque séance d'entraînement
        workout_json = extract_json(workout_output)
        # print("__________\n__________\n")
        # print(f"Session d'entraînement #{i+1} générée :", workout_json)
        # print("__________\n__________\n")

        workout_plans.append(workout_json)
        print(f"Séance d'entraînement #{i+1} générée.")
        print(len(workout_plans))
    
    # Regrouper tous les éléments du programme dans un seul JSON
    seances = []
    for i in range(len(workout_plans)):
        print("_________Seance", i+1,"__________\n")
        print(warmup_json, "\n")
        print(workout_plans[i], "\n")
        print(stretch_json, "\n")

        seance = {
            "warmup": warmup_json,
            "workout": workout_plans[i],
            "stretch": stretch_json
        }
    return seances


def extract_json(output):
    # Supprimer les commentaires du JSON
    json_str_cleaned = re.sub(r'//.*', '', output['message']['content'])
    # print(json_str_cleaned)
    # print(type(json_str_cleaned))
    print('___________________EXTRACT___________________________________')
    return json_str_cleaned



# Appel de la fonction avec le fichier utilisateur
user_data = 'user1.json'
training_plan = generate_training_plan(user_data)
