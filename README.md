# 📊 Customer Churn Prediction

A full-stack machine learning application for predicting customer churn using Logistic Regression. The project features a FastAPI backend and a modern React frontend with beautiful UI/UX.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)
![React](https://img.shields.io/badge/React-19.2+-61DAFB.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-38B2AC.svg)

---

## 🌟 Features

- **Machine Learning Model**: Balanced Logistic Regression for accurate churn prediction
- **RESTful API**: FastAPI backend with automatic documentation
- **Modern Frontend**: React with Vite, TailwindCSS, and React Router
- **Real-time Validation**: Field-level error handling with professional UX
- **Interactive Visualization**: Charts and graphs using Recharts
- **Responsive Design**: Beautiful gradient UI that works on all devices

---

## 📁 Project Structure

```
customer_churn_prediction/
├── app.py                          # FastAPI backend server
├── main.py                         # Model training script
├── churn_model.pkl                 # Trained Logistic Regression model
├── scaler.pkl                      # StandardScaler for feature scaling
├── features.pkl                    # Feature names list
├── WA_Fn-UseC_-Telco-Customer-Churn.csv  # Training dataset
├── churn-frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form.jsx           # Input form component
│   │   │   └── Prediction.jsx     # Results display component
│   │   ├── App.jsx                # Main app with routing
│   │   └── index.css              # Tailwind styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

##  Getting Started

### Prerequisites

- **Python 3.8+**
- **Node.js 16+** and npm
- pip (Python package manager)

### Backend Setup

1. **Navigate to the project directory**
   ```bash
   cd customer_churn_predicton
   ```

2. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn pandas scikit-learn joblib
   ```

3. **Train the model (if not already trained)**
   ```bash
   python main.py
   ```
   This will create:
   - `churn_model.pkl` - Trained model
   - `scaler.pkl` - Feature scaler
   - `features.pkl` - Feature names

4. **Start the FastAPI server**
   ```bash
   uvicorn app:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`

5. **Access API Documentation**
   - Swagger UI: `http://127.0.0.1:8000/docs`
   - ReDoc: `http://127.0.0.1:8000/redoc`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd churn-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## 🎯 Usage

### Using the Web Interface

1. Open your browser to `http://localhost:5173`
2. Fill in the customer details:
   - **Tenure** (months)
   - **Monthly Charges** ($)
   - **Total Charges** ($)
   - **Contract Type** (One year / Two year)
   - **Internet Service** (Fiber optic)
   - **Online Security** (Yes/No)
   - **Tech Support** (Yes/No)
3. Click **"Predict Churn"**
4. View the prediction results with probability and visualization

### Using the API Directly

**Example Request:**
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "tenure": 12,
    "MonthlyCharges": 70.5,
    "TotalCharges": 845.6,
    "Contract_One_year": 0,
    "Contract_Two_year": 0,
    "InternetService_Fiber_optic": 1,
    "OnlineSecurity_Yes": 0,
    "TechSupport_Yes": 0
  }'
```

**Example Response:**
```json
{
  "churn_probability": 0.699,
  "churn_prediction": "Yes"
}
```

---

##  Model Details

### Algorithm
- **Logistic Regression** with balanced class weights
- Trained on Telco Customer Churn dataset
- Feature scaling using StandardScaler

### Features Used
- `tenure` - Number of months with the company
- `MonthlyCharges` - Monthly service charges
- `TotalCharges` - Total charges to date
- `Contract_One year` - One year contract (binary)
- `Contract_Two year` - Two year contract (binary)
- `InternetService_Fiber optic` - Fiber optic internet (binary)
- `OnlineSecurity_Yes` - Online security service (binary)
- `TechSupport_Yes` - Tech support service (binary)

Plus 22 additional encoded features from the original dataset.

### Model Performance
The model uses balanced class weights to handle imbalanced churn data and provides probability scores for better decision making.

---

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Pandas** - Data manipulation and analysis
- **Scikit-learn** - Machine learning algorithms
- **Joblib** - Model serialization
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Charting library
- **Lucide React** - Beautiful icons

---

## 📊 API Endpoints

### POST `/predict`

Predict customer churn probability.

**Request Body:**
```json
{
  "tenure": 12,
  "MonthlyCharges": 70.5,
  "TotalCharges": 845.6,
  "Contract_One_year": 0,
  "Contract_Two_year": 0,
  "InternetService_Fiber_optic": 1,
  "OnlineSecurity_Yes": 0,
  "TechSupport_Yes": 0
}
```

**Response:**
```json
{
  "churn_probability": 0.699,
  "churn_prediction": "Yes"
}
```

---

## 🎨 Frontend Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Field Validation** - Real-time error checking with red borders
- **Professional UX** - Gradient backgrounds and smooth transitions
- **Error Handling** - Clear feedback for all validation errors
- **Route Navigation** - Separate pages for form input and results
- **Visual Feedback** - Charts and progress indicators

---

## 🔧 Development

### Building for Production

**Backend:**
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd churn-frontend
npm run build
npm run preview
```

### Linting
```bash
cd churn-frontend
npm run lint
```

---

## 📝 Notes

- The backend runs on port `8000` by default
- The frontend runs on port `5173` during development
- CORS is configured to allow requests from `http://localhost:5173`
- All dropdown fields require explicit selection (no default values)
- Field-level validation prevents submission of invalid data

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
pip install -r requirements.txt  # If requirements.txt exists
# or install packages individually
pip install fastapi uvicorn pandas scikit-learn joblib
```

### CORS errors
- Ensure the backend is running on `http://127.0.0.1:8000`
- Check that CORS middleware is properly configured in `app.py`

### Model file not found
```bash
python main.py  # Re-train the model
```

### Frontend won't start
```bash
cd churn-frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👤 Author

Created as a customer churn prediction machine learning project.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!
