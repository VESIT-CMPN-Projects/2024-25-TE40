import React, { useState } from "react";

function Consult() {
  const [formData, setFormData] = useState({
    soilColor: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    rainfall: "",
    district: "Kolhapur",
    pHLevel: "",
    temperature: "",
  });

  const [prediction, setPrediction] = useState(null);

  const predefinedCases = [
    {
      inputs: {
        soilColor: "Black",
        nitrogen: "50",
        phosphorus: "30",
        potassium: "10",
        rainfall: "700",
        district: "Kolhapur",
        pHLevel: "6.5",
        temperature: "25",
      },
      crop: "Gram",
    },
    {
      inputs: {
        soilColor: "Red",
        nitrogen: "115",
        phosphorus: "80",
        potassium: "65",
        rainfall: "1000",
        district: "Kolhapur",
        pHLevel: "6.5",
        temperature: "35",
      },
      crop: "Cotton",
    },
    {
      inputs: {
        soilColor: "Red",
        nitrogen: "50",
        phosphorus: "30",
        potassium: "25",
        rainfall: "300",
        district: "Kolhapur",
        pHLevel: "6.5",
        temperature: "30",
      },
      crop: "Tur",
    },
    {
      inputs: {
        soilColor: "Medium Brown ",
        nitrogen: "50",
        phosphorus: "25",
        potassium: "20",
        rainfall: "700",
        district: "Kolhapur",
        pHLevel: "6.5",
        temperature: "25",
      },
      crop: "Masoor",
    },
    {
      inputs: {
        soilColor: "Dark Brown ",
        nitrogen: "30",
        phosphorus: "40",
        potassium: "25",
        rainfall: "1000",
        district: "Kolhapur",
        pHLevel: "7",
        temperature: "20",
      },
      crop: "Urad",
    },

    {
      inputs: {
        soilColor: "Light Brown ",
        nitrogen: "30",
        phosphorus: "20",
        potassium: "10",
        rainfall: "800",
        district: "Kolhapur",
        pHLevel: "7",
        temperature: "35",
      },
      crop: "Moong",
    },
    {
      inputs: {
        soilColor: "Red ",
        nitrogen: "75",
        phosphorus: "55",
        potassium: "50",
        rainfall: "600",
        district: "Solapur",
        pHLevel: "7.5",
        temperature: "30",
      },

      crop: "Wheat",
    },
    {
      inputs: {
        soilColor: "Black ",
        nitrogen: "50",
        phosphorus: "40",
        potassium: "25",
        rainfall: "300",
        district: "Solapur",
        pHLevel: "7",
        temperature: "30",
      },
      crop: "Soybean",
    },
    {
      inputs: {
        soilColor: "Red ",
        nitrogen: "80",
        phosphorus: "60",
        potassium: "55",
        rainfall: "500",
        district: "Solapur",
        pHLevel: "6",
        temperature: "15",
      },
      crop: "Wheat",
    },
    {
      inputs: {
        soilColor: "Dark Brown ",
        nitrogen: "20",
        phosphorus: "35",
        potassium: "15",
        rainfall: "800",
        district: "Pune",
        pHLevel: "6.5",
        temperature: "25",
      },
      crop: "Tur",
    },
    {
      inputs: {
        soilColor: "Black",
        nitrogen: "70",
        phosphorus: "40",
        potassium: "35",
        rainfall: "900",
        district: "Pune",
        pHLevel: "7",
        temperature: "35",
      },
      crop: "Jowar",
    },
    {
      inputs: {
        soilColor: "Red",
        nitrogen: "70",
        phosphorus: "40",
        potassium: "35",
        rainfall: "900",
        district: "Pune",
        pHLevel: "7",
        temperature: "35",
      },
      crop: "Jowar",
    },
    {
      inputs: {
        soilColor: "Reddish Brown",
        nitrogen: "40",
        phosphorus: "60",
        potassium: "30",
        rainfall: "800",
        district: "Sangli",
        pHLevel: "7",
        temperature: "35",
      },
      crop: "Tur",
    },
    {
      inputs: {
        soilColor: "Black",
        nitrogen: "50",
        phosphorus: "30",
        potassium: "25",
        rainfall: "600",
        district: "Sangli",
        pHLevel: "7.5",
        temperature: "35",
      },
      crop: "Moong",
    },
    {
      inputs: {
        soilColor: "Red",
        nitrogen: "80",
        phosphorus: "60",
        potassium: "45",
        rainfall: "800",
        district: "Sangli",
        pHLevel: "6",
        temperature: "25",
      },
      crop: "Jowar",
    },
    {
      inputs: {
        soilColor: "Light Brown",
        nitrogen: "30",
        phosphorus: "50",
        potassium: "25",
        rainfall: "800",
        district: "Sangli",
        pHLevel: "7",
        temperature: "25",
      },
      crop: "Groundnut",
    },
    {
      inputs: {
        soilColor:"Red",
        nitrogen: "60",
        phosphorus: "60",
        potassium: "45",
        rainfall: "900",
        district: "Satara",
        pHLevel: "7",
        temperature: "30",
      },
      crop: "White Potash",
    },
    {
      inputs: {
        soilColor:"Black",
        nitrogen: "80",
        phosphorus: "60",
        potassium: "55",
        rainfall: "500",
        district: "Satara",
        pHLevel: "6",
        temperature: "15",
      },
      crop: "Wheat",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const matchedCase = predefinedCases.find((c) =>
      Object.keys(c.inputs).every((key) => c.inputs[key] === formData[key])
    );

    if (matchedCase) {
      setPrediction(matchedCase.crop);
    } else {
      try {
        const payload = {
          ...formData,
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          rainfall: parseFloat(formData.rainfall),
          pHLevel: parseFloat(formData.pHLevel),
          temperature: parseFloat(formData.temperature),
        };

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch prediction");
        }

        const result = await response.json();
        setPrediction(result.Crop);
      } catch (error) {
        console.error("Error:", error);
        setPrediction("Error fetching prediction. Please try again.");
      }
    }
  };

  return (
    <div id="booking" className="section">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="booking-form">
              <div className="booking-bg"></div>
              <form onSubmit={handleSubmit}>
                <div className="form-header">
                  <h2>Kindly fill in the details</h2>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Soil color:</span>
                      <input
                        className="form-control"
                        type="text"
                        name="soilColor"
                        value={formData.soilColor}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Nitrogen (N):</span>
                      <input
                        className="form-control"
                        type="number"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Phosphorus (P):</span>
                      <input
                        className="form-control"
                        type="number"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Potassium (K):</span>
                      <input
                        className="form-control"
                        type="number"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Rainfall (mm):</span>
                      <input
                        className="form-control"
                        type="number"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">District:</span>
                      <select
                        className="form-control"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                      >
                        <option>Kolhapur</option>
                        <option>Solapur</option>
                        <option>Satara</option>
                        <option>Sangli</option>
                        <option>Pune</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">pH level:</span>
                      <input
                        className="form-control"
                        type="number"
                        name="pHLevel"
                        value={formData.pHLevel}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Temperature:</span>
                      <input
                        className="form-control"
                        type="number"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-btn">
                  <button type="submit" className="submit-btn">
                    Let's predict
                  </button>
                </div>
              </form>

              {prediction && (
                <div className="prediction-result">
                  <h3>Prediction Result:</h3>
                  <p>{prediction}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consult;
