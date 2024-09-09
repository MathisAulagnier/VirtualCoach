import ollama

objectif = 'courir un marathon'
date = '1er janvier 2023'
nbr_trainning = '3'
time_trainning = '1'

prompt1 = f"""Tu es un coach sportif virtuel expérimenté. Je souhaite atteindre {objectif} d'ici le {date}. Je peux m'entraîner {nbr_trainning} fois par semaine pendant environ {time_trainning} heures par séance.
            Propose-moi une liste d'exercices efficaces pour atteindre mon objectif en tenant compte de mes contraintes de temps et de fréquence d'entraînement. 
            """

response = ollama.chat(model='mistral', messages=[
            {'role': 'user','content': prompt1,},])
r1 = response['message']['content']
print(r1)

