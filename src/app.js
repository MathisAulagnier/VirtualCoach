// app.js (serveur Node.js)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const models = require('./models'); // Import du fichier models.js
const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Permettre les requêtes cross-origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route pour servir une page HTML simple
app.get('/', (req, res) => {
    console.log('Page demandée');
    res.send(`<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interaction avec Ollama</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/babel">
            const { useState } = React;

            function App() {
                const [message, setMessage] = useState('');

                const handleSubmit = async (event) => {
                    event.preventDefault();

                    try {
                        const userDataFile = 'user3.json'; // Nom du fichier utilisateur
                        const response = await fetch('/api/generate-training', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ userDataFile }), // Envoyer la valeur de userDataFile
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || 'Erreur lors de la génération du plan d entraînement');
                        }

                        const data = await response.json();
                        setMessage(data.message);
                    } catch (error) {
                        console.error("Erreur lors de la génération:", error);
                        setMessage(\`Erreur: \${error.message}\`);
                    }
                };

                return (
                    <div>
                        <h1>Interaction avec Ollama</h1>
                        <form onSubmit={handleSubmit}>
                            <button type="submit">Communiquer</button>
                        </form>
                        {message && <p>Réponse: {message}</p>}
                    </div>
                );
            }

            ReactDOM.render(<App />, document.getElementById('app'));
        </script>
    </body>
    </html>`);
});

// Nouvelle route pour générer le plan d'entraînement
app.post('/api/generate-training', async (req, res) => {
    const { userDataFile } = req.body; // Lire la valeur envoyée depuis React

    if (!userDataFile) {
        return res.status(400).json({ message: 'Nom de fichier utilisateur requis' });
    }
    const outputFile = 'training_plan_' + userDataFile.replace('.json', '') + '.json';

    try {
        // Appel à la fonction de génération d'entraînement depuis models.js
        const workoutPlan = await models.generateTrainingPlan(userDataFile, outputFile);
        res.json({ message: 'Plan d\'entraînement généré avec succès', data: workoutPlan });
    } catch (error) {
        console.error('Erreur lors de la génération du plan d\'entraînement:', error.message);
        res.status(500).json({ message: 'Erreur lors de la génération du plan d\'entraînement' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur http://localhost:${PORT}`);
});
