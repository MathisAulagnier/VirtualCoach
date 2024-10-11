import os
import json

# Directory containing GIFs
directory = "data/downloaded_gifs"
output_file = "data/exercises.json"

# List to hold exercise data
exercises = []

# Loop through all GIF files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".gif"):
        exercise_name = filename[:-4]  # Remove .gif extension
        path = f"data/{directory}/{filename}"
        exercises.append({"name": exercise_name, "path": path})

# Write to JSON file
with open(output_file, "w") as f:
    json.dump(exercises, f, indent=4)

print(f"JSON file created: {output_file}")