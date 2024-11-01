// app.js (serveur Node.js)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4000;

// Mémoire pour stocker les conversations des utilisateurs
let conversations = {};

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
                const [name, setName] = useState('');
                const [prompt, setPrompt] = useState('');
                const [message, setMessage] = useState('');

                const handleSubmit = async (event) => {
                    event.preventDefault();

                    // Validation simple du nom et du prompt avant l'envoi
                    if (!name.trim()) {
                        setMessage('Le nom est requis.');
                        return;
                    }
                    if (!prompt.trim()) {
                        setMessage('Le texte du prompt est requis.');
                        return;
                    }

                    try {
                        const response = await fetch('/api/message', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name, prompt })
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || 'Erreur lors de la communication avec le serveur');
                        }

                        const data = await response.json();
                        setMessage(data.message);
                        setPrompt(''); // Réinitialiser le prompt après envoi
                    } catch (error) {
                        console.error("Erreur lors de l'envoi de la requête:", error);
                        setMessage(\`Erreur: \${error.message}\`);
                    }
                };

                return (
                    <div>
                        <h1>Interaction avec Ollama</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Entrez votre nom"
                            />
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Entrez votre message ici"
                            />
                            <button type="submit">Envoyer</button>
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

// Ajouter cette fonction pour nettoyer la réponse
function cleanResponse(response) {
    return response.replace(/\s+/g, ' ').trim();
}


// Route pour traiter les requêtes API du formulaire
app.post('/api/message', async (req, res) => {
    const { name, prompt } = req.body;

    // Validation de la donnée d'entrée
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Le nom est requis.' });
    }
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({ message: 'Le prompt est requis.' });
    }

    // Récupérer l'historique de la conversation de l'utilisateur ou initialiser une nouvelle
    if (!conversations[name]) {
        conversations[name] = [];
    }

    // Ajouter la nouvelle entrée au prompt en incluant l'historique
    let fullPrompt = conversations[name].join('\\n') + name + ': ' + prompt +' ; (answers in json format please)';
    console.log('Prompt complet de l\'API Ollama:', fullPrompt);

    try {
        let string_all_reponse = '';

        // Appel à l'API Ollama avec l'historique de la conversation
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "llama3",
            prompt: fullPrompt
        }, {
            responseType: 'stream' // Recevoir la réponse sous forme de flux (stream)
        });

        response.data.on('data', (chunk) => {
            const partialResponse = JSON.parse(chunk.toString()); // Convertir le chunk en objet JSON
            if (partialResponse.response) {
                // Nettoyer la réponse ici
                //const cleanedResponse = cleanResponse(partialResponse.response);
                //string_all_reponse += cleanedResponse + ' '; // Ajouter chaque morceau à la réponse
                string_all_reponse += partialResponse.response + ' '; // Ajouter chaque morceau à la réponse
            }

            if (partialResponse.done) {
                // Ajouter la réponse complète à l'historique
                conversations[name].push('Me (' + name + '): ' + prompt);
                conversations[name].push('You (llama3): ' + string_all_reponse.trim());

                // Envoyer la réponse complète à l'utilisateur
                res.json({ message: string_all_reponse.trim() });
            }
        });

        response.data.on('end', () => {
            console.log('Réponse complète de l\'API Ollama:', string_all_reponse);
        });

    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API Ollama:', error.message);
        return res.status(500).json({ message: 'Erreur lors de la communication avec l\'API Ollama' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur http://localhost:${PORT}`);
});
