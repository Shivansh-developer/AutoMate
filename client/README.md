# AutoMate — AI-Powered Car & Bike Marketplace

AutoMate is a full-stack automobile marketplace platform that combines a traditional buy/sell marketplace with AI/ML-powered features — price prediction, personalized recommendations, and a RAG-based conversational assistant.

## Features

- **User Authentication** — JWT-based register/login
- **Vehicle Marketplace** — list, browse, search, and filter cars/bikes
- **Image Upload** — multi-image vehicle listings
- **Vehicle Comparison** — side-by-side spec comparison
- **Vehicle Detail Page** with **EMI Calculator**
- **Live Car News Feed** — real-time automotive news via GNews API
- **AI Price Prediction** — ML regression model estimates fair market price
- **AI Recommendation Engine** — content-based similarity to suggest comparable vehicles
- **RAG-based AI Chatbot** — natural language Q&A over live vehicle listings using LangChain + Groq + FAISS

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, Sequelize, PostgreSQL (Neon), Multer, JWT
**ML Service:** Python, FastAPI, scikit-learn, LangChain, Groq (Llama 3), FAISS, HuggingFace Embeddings

## Architecture

The project follows a microservice architecture with three independently running services:
## AI/ML Components

1. **Price Prediction** — RandomForestRegressor trained on vehicle specs (brand, year, km driven, fuel type, transmission) to estimate fair resale value.
2. **Recommendation Engine** — Content-based filtering using cosine similarity across encoded vehicle features.
3. **RAG Chatbot** — Vehicle listings are embedded (sentence-transformers) and stored in a FAISS vector store; user queries are answered by an LLM (Groq/Llama 3) grounded in retrieved listings.

## Local Setup

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### ML Service
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Each service requires its own `.env` file with the necessary credentials (database URL, JWT secret, Groq API key, GNews API key).

## Author

Shivansh — Final Year B.Tech CSE (AI/ML), G.L. Bajaj Institute of Technology and Management
