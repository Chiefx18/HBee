const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hiveRoutes = require('./routes/hive.route');
const cropRoutes = require('./routes/crop.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/hives', hiveRoutes);
app.use('/api/crops', cropRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Hive & Crop API 🚀');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected ✅');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error ❌', err);
});
