import json
import re
import ollama

def generate_training_plan(user_data, output_file):
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
            "Include only exercises allowed by the user's equipment availability and cardio level. Each exercise entry should specify the name, sets, repetitions, rest time, GIF path, and the muscle group targeted."
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
            "Include the muscle group targeted for each exercise. "
            "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an introduction."
        )
    }
    messages.append(warmup_prompt)
    warmup_output = ollama.chat(model='llama3', messages=messages)
    messages.pop()
    print("Génération de l'échauffement terminée.")
    warmup_json = extract_json(warmup_output)
    if warmup_json is None:
        return None

    # 2. Générer les étirements
    print("Génération des étirements...")
    stretch_prompt = {
        "role": "user",
        "content": (
            "Please create a stretching routine to follow after the workout, considering the user's goal, restrictions, and cardio level. "
            "Include the muscle group targeted for each exercise. "
            "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an introduction."
        )
    }
    messages.append(stretch_prompt)
    stretch_output = ollama.chat(model='llama3', messages=messages)
    stretch_json = extract_json(stretch_output)
    if stretch_json is None:
        return None
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
                "Include the muscle group targeted for each exercise. "
                "Just return the json file with the exercise names, sets, repetitions, rest time, GIF path, and muscle group without an introduction."
            )
        }
        messages.append(workout_prompt)
        workout_output = ollama.chat(model='llama3', messages=messages)
        messages.append({
            "role": "system",
            "content": workout_output['message']['content']
        })
        workout_json = extract_json(workout_output)
        if workout_json is None:
            return None
        workout_plans.append(workout_json)
        print(f"Séance d'entraînement #{i+1} générée.")

    # Regrouper tous les éléments du programme dans un seul JSON
    training_plan = {
        # "warmup": json.loads(warmup_json),
        # "workouts": json.loads(workout),
        # "stretch": json.loads(stretch_json)
    }
    
    for i, workout in enumerate(workout_plans):
        training_plan["seance" + str(i+1)] = {
            "warmup": json.loads(warmup_json),
            "workouts": json.loads(workout),
            "stretch": json.loads(stretch_json)
        }
    

    # Écrire le plan d'entraînement dans un fichier JSON
    with open(output_file, 'w') as f:
        json.dump(training_plan, f, indent=4)

    return training_plan

def extract_json(output):
    # Supprimer les commentaires du JSON
    json_str_cleaned = re.sub(r'//.*', '', output['message']['content'])
    return json_str_cleaned

# Appel de la fonction avec le fichier utilisateur et le nom de fichier de sortie
user_data = 'user1.json'
output_file = 'training_plan.json'
training_plan = generate_training_plan(user_data, output_file)