from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import os


model = joblib.load("churn_model.pkl")
scaler = joblib.load("scaler.pkl")
features = joblib.load("features.pkl")

app = FastAPI(title="Customer Churn Prediction API")


origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://*.onrender.com",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class CustomerInput(BaseModel):
    tenure: int
    MonthlyCharges: float
    TotalCharges: float
    Contract_One_year: int
    Contract_Two_year: int
    InternetService_Fiber_optic: int
    OnlineSecurity_Yes: int
    TechSupport_Yes: int

@app.post("/predict")
def predict(data: CustomerInput):

    
    input_dict = dict.fromkeys(features, 0)
    field_mapping = {
        'Contract_One_year': 'Contract_One year',
        'Contract_Two_year': 'Contract_Two year',
        'InternetService_Fiber_optic': 'InternetService_Fiber optic',
    }
    for key, value in data.dict().items():
        mapped_key = field_mapping.get(key, key)
        input_dict[mapped_key] = value

    df = pd.DataFrame([input_dict])

    df_scaled = scaler.transform(df)

    import math

    score = model.decision_function(df_scaled)[0]
    prob = 1 / (1 + math.exp(-score))  # sigmoid


    if prob < 0.4:
        risk = "Low"
    elif prob < 0.7:
        risk = "Medium"
    else:
        risk = "High"

    return {
    "churn_probability": round(float(prob), 3),
    "risk_level": risk,
    "churn_prediction": "Yes" if prob >= 0.5 else "No"
}


@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}
if os.path.exists("churn-frontend/dist"):
    app.mount("/assets", StaticFiles(directory="churn-frontend/dist/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = os.path.join("churn-frontend/dist", full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse("churn-frontend/dist/index.html")
