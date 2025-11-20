🎙️ Gemini AI Voice Assistant

A powerful, real-time voice assistant built with React.js and Node.js, powered by Google's Gemini 1.5 Flash model. It listens to your voice, processes the query using AI, and speaks back the response instantly.

(You can replace this link with a screenshot of your actual UI)

🚀 Features

🗣️ Voice-to-Text: Uses the browser's native Web Speech API to transcribe your voice.

🧠 Smart AI Brain: Connected to Google Gemini 1.5 Flash for intelligent and fast responses.

🔊 Text-to-Speech: Speaks out the AI's response naturally.

⚡ Low Latency: Optimized backend for quick interactions.

🎨 Modern UI: A futuristic interface designed with Tailwind CSS and Lucide React.

🔄 Auto-Retry System: The backend automatically handles server overloads (Error 503) by retrying requests.

🛠️ Tech Stack

Frontend

Library: React.js (Vite)

Styling: Tailwind CSS

Icons: Lucide React

APIs: Web Speech API (SpeechRecognition & SpeechSynthesis)

Backend

Runtime: Node.js

Framework: Express.js

AI Model: Google Generative AI (Gemini 1.5 Flash)

Tools: dotenv (Security), cors (Cross-Origin Resource Sharing)

⚙️ Installation & Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone [https://github.com/your-username/gemini-voice-assistant.git](https://github.com/your-username/gemini-voice-assistant.git)
cd gemini-voice-assistant


2. Backend Setup 🧠

Navigate to the backend folder and install dependencies.

cd backend
npm install


Create a .env file in the backend folder and add your Google Gemini API Key:

GOOGLE_API_KEY=your_gemini_api_key_here


Start the Backend Server:

node server.js
# Server should run on http://localhost:5000


3. Frontend Setup 🎨

Open a new terminal, navigate to the frontend folder, and install dependencies.

cd ../frontend
npm install


Start the React App:

npm run dev
# App should run on http://localhost:5173


🎯 How to Use

Ensure both Backend (Port 5000) and Frontend (Port 5173) are running.

Open the Frontend URL in your browser (Chrome/Edge recommended).

Click the Microphone Icon 🎙️.

Speak your query (e.g., "What is the weather today?").

The AI will think 🧠 and then speak back the answer! 🔊

📁 Project Structure

📂 gemini-voice-assistant
├── 📂 backend           # Node.js Server
│   ├── server.js        # Main backend logic (Express + Gemini)
│   ├── package.json     # Backend dependencies
│   └── .env             # API Secrets
│
├── 📂 frontend          # React Application
│   ├── src
│   │   ├── App.jsx      # Main UI & Logic
│   │   └── index.css    # Tailwind Styles
│   └── package.json     # Frontend dependencies
│
└── README.md            # Project Documentation


🐛 Troubleshooting

Error: "Browser not supported" -> Please use Google Chrome or Microsoft Edge. Firefox does not fully support the Web Speech API.

Error: "404 Not Found" (Backend) -> Update your @google/generative-ai package: npm install @google/generative-ai@latest.

Error: "Network Error" -> Ensure your backend server is running on port 5000.

👨‍💻 Author

Built with ❤️ by Subham Singh.
