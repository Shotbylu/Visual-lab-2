# Visual-lab-Dashboard-2

## Description
A full-stack application for an Auto Machine Learning workflow with a FastAPI backend and React frontend. Features include dataset upload, model training, and metric visualization.

---

## Features

### Backend (FastAPI)
- File upload handling with CSV parsing
- Dataset statistics calculation
- RandomForest model training
- Trained model download functionality
- CORS support for frontend communication

### Frontend (React)
- Responsive design with Tailwind CSS
- Tabs and Cards for UI organization
- Real-time updates for model training
- Metrics visualization (accuracy, precision, recall, F1)
- CSV file upload and preview

---

## Usage

### Prerequisites
- Node.js & npm
- Python 3.9 or higher

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
