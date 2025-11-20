import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Volume2, Terminal } from 'lucide-react';


export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("Hi! I'm Gemini. Tap the mic to chat.");
  
  // Ref to store the SpeechRecognition instance
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop after one sentence
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onend = () => setIsListening(false);

      recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleBackendCommunication(text);
      };

      recognitionRef.current = recognition;
    } else {
      setResponse("Browser not supported. Please use Chrome or Edge.");
    }
  }, []);

  // Function to send text to Node.js Backend
  const handleBackendCommunication = async (text) => {
    setIsThinking(true);
    
    try {
      // Assuming your Node server is running on port 5000
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      
      if (data.reply) {
        setResponse(data.reply);
        speakResponse(data.reply);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to the backend. Is the server running?");
    } finally {
      setIsThinking(false);
    }
  };

  // Text to Speech Logic
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Optional: Select a specific voice (e.g., Google US English)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.name.includes("Google US English"));
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setTranscript(""); // Clear previous input
      window.speechSynthesis.cancel(); // Stop speaking if currently speaking
    }
  };

  return (
     <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-400" />
            <span className="text-slate-200 font-medium">Assistant</span>
          </div>
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
        </div>

        {/* Dynamic Avatar / Orb */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 
              ${isListening ? 'bg-blue-500 opacity-40 scale-125' : 
                isThinking ? 'bg-purple-500 opacity-60 scale-110 animate-pulse' : 
                isSpeaking ? 'bg-green-500 opacity-40 scale-125 animate-pulse' : 
                'bg-transparent'}`} 
            />
            
            <button 
              onClick={toggleListening}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                ${isListening 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/50'}`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : isThinking ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : isSpeaking ? (
                <Volume2 className="w-8 h-8 text-white animate-bounce" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="space-y-6">
          
          {/* User Transcript */}
          <div className={`transition-opacity duration-500 ${transcript ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">You said</p>
            <p className="text-lg text-white leading-relaxed">"{transcript}"</p>
          </div>

          {/* AI Response */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 min-h-[100px] flex items-center">
             <p className="text-slate-300 leading-relaxed">
               {isThinking ? (
                 <span className="animate-pulse">Thinking...</span>
               ) : (
                 response
               )}
             </p>
          </div>

        </div>

        {/* Instructions Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {isListening ? "Listening..." : "Tap the microphone to speak"}
          </p>
        </div>

      </div>
    </div>
  );
}