import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

interface Vehicle {
  id: number; type: string; brand: string; model: string; year: number;
  price: number; fuelType: string; kmDriven: number; transmission: string;
}
interface ChatMessage { role: 'user' | 'bot'; text: string; }

function Chatbot() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hi! Ask me anything about the cars listed on AutoMate — e.g. "Which car is best under 10 lakh?"' }
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.get('/vehicles').then((res) => setVehicles(res.data));
  }, []);

  const handleAsk = async () => {
    if (!question.trim()) return;
    const userMessage: ChatMessage = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion('');
    try {
      const res = await axios.post('http://localhost:8000/chat', {
        question: userMessage.text,
        vehicles: vehicles.map((v) => ({
          id: v.id, type: v.type, brand: v.brand, model: v.model, year: v.year,
          price: v.price, fuelType: v.fuelType, kmDriven: v.kmDriven, transmission: v.transmission,
        })),
      });
      setMessages((prev) => [...prev, { role: 'bot', text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleAsk(); };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-xl p-6">
        <h2 className="text-xl font-bold text-dark mb-4">🤖 AutoMate AI Assistant</h2>
        <div className="border border-gray-200 rounded-xl p-4 h-96 overflow-y-auto flex flex-col gap-3 mb-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                msg.role === 'user' ? 'self-end bg-primary text-white' : 'self-start bg-white border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="self-start text-gray-400 text-sm">AI is thinking...</div>}
        </div>
        <div className="flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about cars..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-primary text-white px-5 rounded-full hover:opacity-90 transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;