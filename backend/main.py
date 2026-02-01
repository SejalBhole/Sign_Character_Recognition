from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# 1. Load your model
model = tf.keras.models.load_model('models/sign_language_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 2. Receive image from React
        file = request.files['image'].read()
        image = Image.open(io.BytesIO(file)).convert('RGB')
        
        # 3. Preprocess to match your model.py load_data() function
        # Your model expects 64x64 RGB
        image = image.resize((64, 64)) 
        image_array = np.array(image) / 255.0  # Normalize to [0, 1] exactly like your script
        
        # Add the batch dimension: (1, 64, 64, 3)
        image_array = np.expand_dims(image_array, axis=0)

        # 4. Predict
        predictions = model.predict(image_array)
        result_index = np.argmax(predictions)
        confidence = float(np.max(predictions) * 100)

        # Map index back to Alphabet (A=0, B=1, etc.)
        prediction_label = chr(result_index + 65)

        return jsonify({
            'prediction': prediction_label,
            'confidence': round(confidence, 2)
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Running on port 5000
    app.run(debug=True, port=5000)