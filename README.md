# Virtual Coach - Présentation du projet

## Description du projet :
L’objectif est de développer une application web/mobile qui génère des programmes d’entraînement personnalisés grâce à l'intelligence artificielle en fonction des objectifs et des informations fournies par l’utilisateur.

### Fonctionnalités principales :
- **Collecte d’informations** : Poids, taille, âge, les habitudes d'entraînement, et l'historique des entrainements.
- **Choix d’objectifs** : Maigrir, améliorer l’endurance, développer de la force, ou prise de masse.
- **Fréquence et durée d’entraînement** : L’utilisateur indique combien de fois par semaine il peut s’entraîner et pour combien de temps.
- **Génération de programmes** : L’application fournit un plan d’entraînement détaillé en fonction des objectifs, avec des exercices spécifiques (intégration de dataset d’images pour illustrer les exercices).
- **Évolutivité** : L’utilisateur peut suivre ses progrès, et le programme peut s’adapter à l’évolution des performances.
- **Technologies** : Utilisation de Python pour intégrer un LLM (GPT/Llama) afin de générer des programmes avec des prompts prédéfinis pour une sortie cohérente.

---

## Conclusion :
Le projet Virtual Coach a pour but de faciliter l’entraînement des utilisateurs en leur proposant des programmes personnalisés en fonction de leurs objectifs. Il met en œuvre des technologies avancées d'intelligence artificielle disponnible en open-source pour offrir un coaching virtuel fiable et adaptable à tous les niveaux sportifs.

___

## Utilisation pour le développement :

### Configuration de l'environnement virtuel sous Linux

Ce guide explique comment créer un environnement virtuel Python sous Linux et installer les dépendances à partir d'un fichier `requirements.txt`.

### Prérequis

- Python 3 installé sur votre machine.

#### 1. Créer un environnement virtuel

1. **Installer `virtualenv`** (si ce n'est pas déjà fait) :

```bash
   sudo apt install python3-venv
```

2.	**Créer un environnement virtuel** dans le répertoire de votre projet :
    
```bash
python3 -m venv venv
```

3.	**Activer l’environnement virtuel** :
    
```bash
source venv/bin/activate
```

Vous saurez que l’environnement est activé si vous voyez (env) au début de la ligne de commande.

#### 2. Installer les dépendances

1.	Assurez-vous que l’environnement virtuel est activé.
2.	Installer les dépendances à partir de requirements.txt :

```bash
pip install -r requirements.txt
```

3. Désactiver l’environnement virtuel

Lorsque vous avez terminé de travailler dans l’environnement virtuel, vous pouvez le désactiver avec la commande :
    
```bash
deactivate
```

4. BONUS : Mettre à jour requirements.txt

Si vous installez de nouvelles dépendances, vous pouvez mettre à jour requirements.txt avec la commande suivante :

```bash
pip freeze > requirements.txt
``` 


## Communication JS <--> API ollama :

#### 1. Installer / lancer le serveur Ollama

1. Installer Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

2. Installer llama3

```bash
ollama run llama3
```

3. Lancer le serveur Ollama en local

```bash
ollama serve
```


#### 2. Lancer app.js

1. Ce rendre dans le dossier où est stocké le fichier app.js sur votre terminal

exemple : "cd /mnt/c/Users/ryan4/projetIA/src"

```bash
cd Chemin_du_fichier
```

2. (optionnel) Réparer le dossier node_modules

```bash
rm -rf node_modules
npm init -y
npm install express axios cors path
```

3. lancer le fichier app.js

```bash
node app.js
```
