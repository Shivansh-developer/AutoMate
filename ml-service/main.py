from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib
import pandas as pd
from recommend import get_similar_vehicles
from chatbot import ask_chatbot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('price_model.pkl')

class CarInput(BaseModel):
    brand: str
    year: int
    km_driven: int
    fuel_type: str
    transmission: str

class VehicleItem(BaseModel):
    id: int
    brand: str
    type: str
    price: float
    year: int
    fuelType: str
    transmission: str
    model: str = ""
    kmDriven: int = 0

class RecommendInput(BaseModel):
    vehicles: List[VehicleItem]
    target_id: int

class ChatInput(BaseModel):
    question: str
    vehicles: List[VehicleItem]

@app.get("/")
def read_root():
    return {"message": "AutoMate ML Service is running"}

@app.post("/predict")
def predict_price(car: CarInput):
    input_df = pd.DataFrame([{
        'brand': car.brand,
        'year': car.year,
        'km_driven': car.km_driven,
        'fuel_type': car.fuel_type,
        'transmission': car.transmission,
    }])
    prediction = model.predict(input_df)[0]
    return {"predicted_price": round(float(prediction), -3)}

@app.post("/recommend")
def recommend(data: RecommendInput):
    vehicles_dicts = [v.dict() for v in data.vehicles]
    similar_ids = get_similar_vehicles(vehicles_dicts, data.target_id)
    return {"similar_vehicle_ids": similar_ids}

@app.post("/chat")
def chat(data: ChatInput):
    vehicles_dicts = [v.dict() for v in data.vehicles]
    answer = ask_chatbot(data.question, vehicles_dicts)
    return {"answer": answer}