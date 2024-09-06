# VirtualCoach
Generation of sports programs using artificial intelligence to achieve personal goals

# Virtual Coach - Présentation du projet

## Description du projet :
L’objectif est de développer une application web/mobile qui génère des programmes d’entraînement personnalisés en fonction des objectifs et des informations fournies par l’utilisateur.

### Fonctionnalités principales :
- **Collecte d’informations** : Poids, taille, âge, et informations sur les habitudes d'entraînement.
- **Choix d’objectifs** : Maigrir, améliorer l’endurance, développer de la force, atteindre un objectif précis (comme soulever un poids spécifique).
- **Fréquence et durée d’entraînement** : L’utilisateur indique combien de fois par semaine il peut s’entraîner et pour combien de temps.
- **Génération de programmes** : L’application fournit un plan d’entraînement détaillé en fonction des objectifs, avec des exercices spécifiques (intégration de dataset d’images pour illustrer les exercices).
- **Évolutivité** : L’utilisateur peut suivre ses progrès, et le programme peut s’adapter à l’évolution des performances.
- **Technologies** : Utilisation de Python pour intégrer GPT/Llama afin de générer des programmes avec des prompts prédéfinis pour une sortie cohérente.

---

## Étapes clés du projet :

1. **Conception fonctionnelle et UX/UI** :
   - Définir les écrans et les parcours utilisateurs.
   - Concevoir un design minimaliste et intuitif.
   - Développer une interface pour saisir les informations utilisateur (taille, poids, etc.).

2. **MVP** (Minimum Viable Product) – Running Focus :
   - Concentrer d’abord sur un programme pour la course à pied.
   - Demander la fréquence d'entraînement, la distance cible, et les objectifs (perdre du poids, améliorer la vitesse, etc.).
   - Générer un plan d’entraînement pour une période définie (par ex. 2 mois).

3. **Développement Backend** :
   - Intégration avec GPT ou Llama via des prompts prédéfinis.
   - Gestion des inputs utilisateur pour personnaliser les réponses de GPT.
   - Stockage des données utilisateurs (Firebase, JSON, ou base de données).

4. **Intégration d'un Dataset d’Exercices** :
   - Rechercher et intégrer des datasets d’exercices (images et descriptions).
   - Assurer que chaque plan d’entraînement inclut des illustrations d’exercices.

5. **Suivi et ajustement du programme** :
   - Ajouter des fonctionnalités de suivi des performances (poids, répétitions, distances, etc.).
   - Adapter les plans en fonction des progrès de l’utilisateur.

6. **Lancement et Scalabilité** :
   - Ajouter d'autres types de sports (musculation, crossfit).
   - Améliorer la gestion des objectifs spécifiques comme soulever 100 kg au deadlift.

---

## Obstacles potentiels :

1. **Complexité de l’algorithme** : Générer des programmes personnalisés en fonction de multiples variables pourrait devenir complexe, surtout si les objectifs et les niveaux de condition physique varient beaucoup.

2. **Dataset d'exercices** : Trouver un dataset libre de droit ou créer un dataset complet pourrait demander du temps, surtout pour garantir la qualité des images et des descriptions.

3. **Intégration de GPT/Llama** : Bien que GPT soit puissant, il peut générer des réponses imprécises ou inadaptées. Il faudra tester les prompts pour garantir que les programmes générés sont cohérents et pertinents.

4. **Gestion des données utilisateurs** : Collecter et stocker des informations sensibles (poids, taille, etc.) doit se faire avec une attention particulière à la sécurité des données.

5. **Adaptation des programmes** : Prévoir une façon simple de faire évoluer les programmes d’entraînement en fonction des progrès sans surcharger l'utilisateur de modifications.

---

## Conclusion :
Le projet Virtual Coach a pour but de faciliter l’entraînement des utilisateurs en leur proposant des programmes personnalisés en fonction de leurs objectifs. Il met en œuvre des technologies avancées comme GPT/Llama pour offrir un coaching virtuel fiable et adaptable à tous les niveaux sportifs.
