import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8001/api/virtual-coach', {  // Assurez-vous que l'URL est correcte
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }

      const data = await res.json();
      console.log("Réponse reçue du serveur:", data);  // Log pour vérifier la réponse

      if (data.status === 'success') {
        setResponse(data.data);  // Récupère la réponse du serveur
      } else {
        setResponse('Erreur lors de la récupération de la réponse du serveur.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setResponse('Erreur lors de la communication avec le serveur.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Virtual Coach</h1>
      
      {response && (
        <div>
          <h3>Réponse du LLM:</h3>
          <p>{response}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre prompt ici..."
          style={{ padding: '10px', marginBottom: '20px' }}
        />
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;