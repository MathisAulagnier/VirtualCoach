from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

# Route pour traiter les requêtes et obtenir une réponse du modèle
@app.route('/api/virtual-coach', methods=['POST'])
def get_response():
    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        # Interagir avec le modèle Ollama
        response = ollama.chat(model='mistral', messages=[
            {'role': 'user','content': prompt,},])
        
        # Log pour voir la réponse d'Ollama
        print("Réponse d'Ollama:", response)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failure'
        }), 500

app.run(host='0.0.0.0', port=8001)
