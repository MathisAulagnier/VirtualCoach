import pandas as pd

# load csv
df = pd.read_csv('exercises.csv')

# afficher que la colonne nom et url
print(df[['bodyPart', 'gifUrl']])

