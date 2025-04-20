import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
#Define a mapping dictionary for district_name_Color
District_Name_mapping = {
    'Kolhapur': 1, 
    'Solapur': 2, 
    'Satara': 3, 
    'Sangli': 4, 
    'Pune': 5

}
# Map the district_name values to integers
data['District_Name'] = data['District_Name'].map(District_Name_mapping)
data.head(5)

#Define a mapping dictionary for Soil_Color
soil_color_mapping = {
    'Black': 1,
    'Red ': 2,  # Notice the trailing space, keep it as it appears in the data
    'Medium Brown': 3,
    'Dark Brown': 4,
    'Red': 5,
    'Light Brown': 6,
    'Reddish Brown': 7

}
# Define a mapping dictionary for Crop
crop_mapping = {
    'Sugarcane': 1,
    'Jowar': 2,
    'Cotton': 3,
    'Rice': 4,
    'Wheat': 5,
    'Groundnut': 6,
    'Maize': 7,
    'Tur': 8,
    'Urad': 9,
    'Moong': 10,
    'Gram': 11,
    'Masoor': 12,
    'Soybean': 13,
    'Ginger': 14,
    'Turmeric': 15,
    'Grapes': 16
}

# Map the Crop values to integers
data['Crop'] = data['Crop'].map(crop_mapping)
data.head()
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
X = data[['Soil_color', 'Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature','District_Name']]
y = data['Crop']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# Create and fit the Random Forest Classifier
rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_train, y_train)
# Make predictions
y_train_pred = rf_model.predict(X_train)
y_test_pred = rf_model.predict(X_test)
# Reverse mapping from integer to crop name
reverse_crop_mapping = {v: k for k, v in crop_mapping.items()}

# Function to predict crop and return crop name
def predict_crop(soil_color, nitrogen, phosphorus, potassium, pH, rainfall, temperature, district_name):
    # Map the input string values to their respective integers
    soil_color = soil_color_mapping.get(soil_color, 0)
    district_name = District_Name_mapping.get(district_name, 0)
    
    input_data = pd.DataFrame([{
        'Soil_color': soil_color,
        'Nitrogen': nitrogen,
        'Phosphorus': phosphorus,
        'Potassium': potassium,
        'pH': pH,
        'Rainfall': rainfall,
        'Temperature': temperature,
        'District_Name': district_name
    }])
    
    prediction = rf_model.predict(input_data)
    crop_name = reverse_crop_mapping[prediction[0]]
    return crop_name

# Input values for prediction
soil_color = "Black"
nitrogen = 5.6
phosphorus = 2.5
potassium = 3.2
pH = 6.5
rainfall = 250.4
temperature = 27.0
district_name = "Kolhapur"

# Get the predicted crop name
predicted_crop = predict_crop(soil_color, nitrogen, phosphorus, potassium, pH, rainfall, temperature, district_name)
print("Predicted Crop:", predicted_crop)
import pickle
# Save the trained model to a file using pickle
with open('rf_model.pkl', 'wb') as model_file:
    pickle.dump(rf_model, model_file)

print("Model saved successfully!")



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
