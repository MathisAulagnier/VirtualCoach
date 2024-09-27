const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Assure-toi que cors est importé
const app = express();

// Middleware pour activer CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Change cela pour correspondre à l'URL de ton application React
    methods: ['GET', 'POST', 'OPTIONS'],  // Autorise les méthodes appropriées
}));

// Middleware pour parser les JSON dans les requêtes
app.use(express.json());

// Route pour interagir avec le modèle Ollama hébergé
app.post('/api/virtual-coach', async (req, res) => {
    console.log('Requête reçue:', req.body);  // Log pour vérifier la requête

    const { prompt } = req.body;

    try {
        const response = await axios.post('http://localhost:8001/api/virtual-coach', {
            prompt: prompt
        });

        console.log('Réponse du serveur Python:', response.data);  // Log pour voir la réponse

        // Retourner la réponse au client
        res.json({
            status: 'success',
            data: response.data.message.content  // Récupère le contenu du message
        });
    } catch (error) {
        console.error('Erreur lors de la communication avec Ollama:', error);
        res.status(500).json({
            status: 'failure',
            error: error.message
        });
    }
});

// Lancer le serveur Node.js
const PORT = 8000;  // Utilise le port 8000
app.listen(PORT, () => {
    console.log(`Serveur Node.js en cours d'exécution sur le port ${PORT}`);
});