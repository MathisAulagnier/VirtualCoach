import os
import shutil
import ollama

prompt_sys = """
I will provide you with a list of exercises in French. I want you to classify them into the following muscle groups:
muscle_groups_names : ["arms", "shoulders", "back", "chest", "abs", "legs", "glutes"]
You will have to return a list of the same length as the input list, with the name of the muscle group to which each exercise belongs.
Additionally, generalize the exercise name and return it in the following format: group/
You have to return only a LIST without any print.
Here is an example of input:
["Les_fentes", "Les_développés_couchés", "Les_tractions","Les_crunchs","Les_squats","Les_élévations_latérales","Les_curls_biceps","Les_extensions_triceps" ,"Les_ponts_pour_les_fessiers" ,"La_planche", "dips"]
You have to return:
[legs/,"chest/" ,"back/" ,"abs/","legs/","shoulders/","arms/","arms/","glutes/","abs/", "arms/"]
Be careful with the spelling and the format of the names.
"""

muscle_groups = {
    "arms": [],
    "shoulders": [],
    "back": [],
    "chest": [],
    "abs": [],
    "legs": [],
    "glutes": []
}

def ask_ollama(prompt_sys=prompt_sys, prompt=""):
    # Interact with the Ollama model
    response = ollama.chat(model='llama3', messages=[
        {'role': 'system', 'content': prompt_sys},
        {'role': 'user', 'content': prompt}
    ])
    return response['message']['content'].strip()

# Directory containing GIFs and the destination directory
source_dir = "downloaded_gifs"
destination_dir = "renamed_organized_gifs"

# Create the destination directory if it doesn't exist
os.makedirs(destination_dir, exist_ok=True)

indice = 0
input = []

# Create folders for each muscle group
for group in muscle_groups.keys():
    os.makedirs(os.path.join(destination_dir, group), exist_ok=True)

length = len(os.listdir(source_dir))
print(f"Total number of files: {length}")

for filename in os.listdir(source_dir):
    if filename.endswith(".gif"):
        input.append(filename)

        if len(input) >= 20:
            response = ask_ollama(prompt_sys, '\n'.join(input))
            response = response[response.find("["):response.find("]")+1]
            english_names = response[1:-1].replace('\n', '').replace('"', '').replace(' ', '').split(',')

            print(input)
            print('____')
            print(english_names)
            # Copy and rename files based on English names
            for original_name, english_name in zip(input, english_names):
                source_path = os.path.join(source_dir, original_name)
                target_path = os.path.join(destination_dir, english_name, original_name)

                # Copy the file if the source file exists, otherwise skip
                try:
                    shutil.copy(source_path, target_path)
                except FileNotFoundError:
                    print(f"Skipping file '{original_name}' - source or destination path not found.")
            
            # Clear input list for the next batch
            indice += 20
            print(f"{indice}/{length} files processed")
            input = []

# Process any remaining files if they don't complete a batch of 20
if input:
    response = ask_ollama(prompt_sys, '\n'.join(input))
    response = response[response.find("["):response.find("]")+1]
    english_names = response[1:-1].replace('\n', '').replace('"', '').replace(' ', '').split(',')

    for original_name, english_name in zip(input, english_names):
        source_path = os.path.join(source_dir, original_name)
        target_path = os.path.join(destination_dir, english_name, original_name)
        
        # Copy the file if the source file exists, otherwise skip
        try:
            shutil.copy(source_path, target_path)
        except FileNotFoundError:
            print(f"Skipping file '{original_name}' - source or destination path not found.")