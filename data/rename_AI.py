import os
import shutil
import ollama
import ast

prompt_sys = """

You are tasked with converting exercise names from French to English for GIF files. The input will consist of French exercise names in the format of filenames (e.g., "pompes-claquees.gif", "developpe-incline-halteres-exercice-musculation.gif", "developpe-couche.gif"). Your job is to generate the appropriate English exercise names, ensuring the following rules are applied:

1. Translate the French exercise name to English.
2. Use the specific English exercise names provided (e.g., "Push-up with Claps" should be converted to "pushup_with_claps").
3. Don't specify the gender if it's included in the French exercise name (e.g., "femme" should not be included in the English exercise name).
4. Replace spaces  with underscores (_) in the resulting English filenames, there is no (-) and not majuscules.

For example:
    input : ["pompes-claquees.gif", "developpe-incline-halteres-exercice-musculation.gif", "developpe-couche.gif", "fente-avant-barre-femme.gif"]
    output : ["pushup_with_claps", "incline_dumbbell_press", "bench_press", "lunge_barbell"]

Please retourne only the English exercise names in the same order as the input.
"""

def ask_ollama(prompt_sys=prompt_sys, prompt=""):
    # Interact with the Ollama model
    response = ollama.chat(model='mistral', messages=[
        {'role': 'system', 'content': prompt_sys,},
        {'role': 'user', 'content': prompt,},])
    return response['message']['content']


# Directory containing GIFs and the destination directory
source_dir = "data/downloaded_gifs"
destination_dir = "data/renamed_gifs"

# Create the destination directory if it doesn't exist
os.makedirs(destination_dir, exist_ok=True)

input = []


for filename in os.listdir(source_dir):
    if filename.endswith(".gif"):
        source_path = os.path.join(source_dir, filename)

        if len(input) > 19:
            response = ast.literal_eval(ask_ollama(prompt_sys, str(input)).strip('\n\t'))
            for i,file in enumerate(input):
                file_path = os.path.join(source_dir, file)
                new_filename = response[i]
                new_file_path = os.path.join(destination_dir, new_filename + ".gif")
                shutil.copy(file_path, new_file_path)
            input = []
            
            break
        input.append(filename)


print("All files processed.")

