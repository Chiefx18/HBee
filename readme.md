# 🐝 Humble Bee - Hive Log & Crop Calendar API

A simple RESTful API built with Node.js, Express.js, and MongoDB Atlas to manage beehive logs and crop flowering calendars, along with nearby crop opportunity discovery.

---

## 🚀 Features

- ✅ Add Hive Log with validations (unique ID, location range)
- ✅ Retrieve Hive Logs (with optional date filtering & pagination)
- ✅ Add Crop Calendar entries
- ✅ Discover nearby crop opportunities based on geolocation and date

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- dotenv
- Body-parser

---

## 📦 Installation

```bash
git clone https://github.com/your-username/hive-crop-api.git
cd hive-crop-api
npm install
```

## 🌐 Environment Variables

- Create a .env file in the root folder and add the following:

env
```bash
MONGO_URI=your-mongodb-atlas-connection-string
PORT=3000
```

## 📡 API Endpoints

- 1. Add Hive Log
```bash
POST /api/hives
Payload:
json
{
  "hiveId": "HIVE004",
  "datePlaced": "2025-04-08",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "numColonies": 5
}
```
## 2. Get Hive Logs
```bash
GET /api/hives
Query Params (optional):
startDate

endDate

page (default: 1)

limit (default: 10)
```

## 3. Add Crop Calendar Entry

```bash
POST /api/crops
Payload:
json


{
  "name": "Sunflower",
  "floweringStart": "2025-04-10",
  "floweringEnd": "2025-04-25",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "recommendedHiveDensity": 5
}
```

## 4. Get Nearby Crop Opportunities
```bash
GET /api/crops/nearby
Query Params:
latitude (required)

longitude (required)

radius (optional, default: 100)

date (optional, defaults to today)
```

## ⚠️ Edge Cases Handled
```bash
Duplicate hiveId

Invalid or out-of-range coordinates

Overlapping flowering windows

Empty response handling

Future vs past dates
```

## 🧪 Testing

Use Postman or cURL to test endpoints locally.
