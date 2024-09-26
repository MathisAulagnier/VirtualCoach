from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

# Charger le modèle Ollama
model = ollama.Model('ton-modele-ollama')  # Remplace par le nom de ton modèle Ollama

# Route pour traiter les requêtes et obtenir une réponse du modèle
@app.route('/api/virtual-coach', methods=['POST'])
def get_response():
    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        # Interagir avec le modèle Ollama
        response = model.generate(prompt)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failure'
        }), 500

# Lancer le serveur
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)