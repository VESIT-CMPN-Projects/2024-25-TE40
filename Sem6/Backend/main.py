from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

@app.get('/')
def index():
    return{'message': 'Crop Prediction'}

# Load the trained model
with open('rf_model.pkl', 'rb') as model_file:
    rf_model = pickle.load(model_file)

# Define a mapping dictionary for Soil_Color and District_Name
soil_color_mapping = {
    'Black': 1,
    'Red ': 2,  # Notice the trailing space, keep it as it appears in the data
    'Medium Brown': 3,
    'Dark Brown': 4,
    'Red': 5,
    'Light Brown': 6,
    'Reddish Brown': 7
}

district_name_mapping = {
    'Kolhapur': 1, 
    'Solapur': 2, 
    'Satara': 3, 
    'Sangli': 4, 
    'Pune': 5
}

# Reverse mapping from integer to crop name
reverse_crop_mapping = {
    1: 'Sugarcane',
    2: 'Jowar',
    3: 'Cotton',
    4: 'Rice',
    5: 'Wheat',
    6: 'Groundnut',
    7: 'Maize',
    8: 'Tur',
    9: 'Urad',
    10: 'Moong',
    11: 'Gram',
    12: 'Masoor',
    13: 'Soybean',
    14: 'Ginger',
    15: 'Turmeric',
    16: 'Grapes'
}

# Define the request body schema
class CropInput(BaseModel):
    Soil_color: str
    Nitrogen: float
    Phosphorus: float
    Potassium: float
    pH: float
    Rainfall: float
    Temperature: float
    District_Name: str

# Define the prediction endpoint
@app.post("/predict")
def predict_crop(input_data: CropInput):
    try:
        # Map the input string values to their respective integers
        soil_color = soil_color_mapping.get(input_data.Soil_color, 0)
        district_name = district_name_mapping.get(input_data.District_Name, 0)
        
        input_df = pd.DataFrame([{
            'Soil_color': soil_color,
            'Nitrogen': input_data.Nitrogen,
            'Phosphorus': input_data.Phosphorus,
            'Potassium': input_data.Potassium,
            'pH': input_data.pH,
            'Rainfall': input_data.Rainfall,
            'Temperature': input_data.Temperature,
            'District_Name': district_name
        }])
        
        prediction = rf_model.predict(input_df)
        crop_name = reverse_crop_mapping[prediction[0]]
        return {"Crop": crop_name}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
