# 🤟 SignLink AI: Real-Time Sign Language Recognition Bridge

![Status](https://img.shields.io/badge/Status-Functional%20Prototype-success)
![Stack](https://img.shields.io/badge/Stack-MERN%20+%20Flask%20+%20TensorFlow-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**SignLink AI** is a full-stack machine learning application designed to bridge communication gaps by translating American Sign Language (ASL) into text in real-time.

Currently, the system deploys a **CNN (Convolutional Neural Network)** for high-speed static character recognition (A-Z). The architecture is designed to support a future upgrade to a **CNN-LSTM Fusion** model for recognizing dynamic, sequence-based gestures (e.g., words like "Hello" or "Thank You").

## 🌟 Features

* **Real-Time Inference:** Processes webcam feed instantly with low latency (<100ms).
* **Decoupled Architecture:** React Frontend and Flask Backend communicate via REST API, ensuring modularity.
* **Robust Preprocessing:** Backend automatically resizes and normalizes inputs to match model tensors `(64, 64, 3)`.
* **Live Dashboard:** Visual feedback for prediction confidence and translation logs.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast, responsive UI with `lucide-react` icons. |
| **Backend** | Python (Flask) | Lightweight API server acting as the ML bridge. |
| **ML Engine** | TensorFlow / Keras | CNN model for spatial feature extraction. |
| **Data Handling** | NumPy & Pillow | Efficient image array manipulation and preprocessing. |


## 📂 Project Structure

```text
SIGN-BRIDGE-VITE/
├── backend/                   # Python Server (The "Brain")
│   ├── models/                # Trained .h5 model files
│   │   └── sign_language_model.h5
│   └── main.py                # Flask API Entry Point
├── frontend/                  # React Application (The "Face")
│   ├── src/
│   │   ├── assets/            # CSS and Static Assets
│   │   └── Workspace.jsx      # Main Logic: Webcam & API Calls
│   └── package.json           # Frontend Dependencies
└── README.md                  # Project Documentation


### 6. Installation & Setup
The step-by-step guide for running the code.

```markdown
## 🚀 Installation & Setup Guide

Follow these steps to get the project running locally.

### Prerequisites
* Node.js (v16+)
* Python (v3.10+)
* Webcam

### Step 1: Set Up the Backend
The backend serves the model and handles predictions.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install Python dependencies:**
    ```bash
    pip install flask flask-cors tensorflow numpy pillow
    ```

3.  **Run the Flask Server:**
    ```bash
    python main.py
    ```
    *Terminal Output should say: `Running on http://127.0.0.1:5000`*

### Step 2: Set Up the Frontend
The frontend displays the video and results.

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Node packages:**
    ```bash
    npm install
    ```

3.  **Start the React App:**
    ```bash
    npm run dev
    ```
    *Terminal will provide a local URL, typically: `http://localhost:5173`*


    ## 🧠 Model Architecture (Deep Dive)

### Current Implementation: Spatial Recognition (CNN)
The current model excels at identifying static hand shapes.
* **Input:** `(64, 64, 3)` RGB Images.
* **Structure:** 3 Convolutional Layers (Feature Extraction) -> Flatten -> Dense Layers (Classification).
* **Normalization:** Pixel values scaled to `[0, 1]`.

### Future Roadmap: Spatio-Temporal Recognition (CNN-LSTM)
The codebase is structured to support the "Fusion" upgrade:
1.  **TimeDistributed CNN:** Will extract features from a sequence of 30 frames.
2.  **LSTM Layer:** Will analyze the temporal evolution of these features to classify motion-based signs.
3.  **Word Stitching:** Logic to combine recognized characters into full sentences automatically.


## 🔧 Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"Reshape" Error** | Model input shape mismatch. | Ensure `main.py` resizes images to exactly `(64, 64)`. |
| **CORS Error** | Frontend blocked by Backend. | Verify `CORS(app)` is enabled in `backend/main.py`. |
| **No Camera Feed** | Browser permissions. | Allow camera access in your browser settings when prompted. |


## 🔮 Future Improvements

- [ ] **CNN-LSTM Integration:** Training on video sequences for dynamic action recognition.
- [ ] **Data Pipeline:** Scripting automated data collection for temporal sequences.
- [ ] **Smart Smoothing:** Implementing a prediction buffer to reduce label flickering in the UI.

---

## 👨‍💻 Author

**[Your Name]**
*Full-Stack ML Enthusiast | Aspiring AI Engineer*