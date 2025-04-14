const Hive = require('../models/Hive');

// Add Hive Log
const addHive = async (req, res) => {
  try {
    const { hiveId, datePlaced, latitude, longitude, numColonies } = req.body;

    // Basic validation
    if (!hiveId || !datePlaced || latitude == null || longitude == null || !numColonies) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: 'Invalid latitude or longitude range.' });
    }

    // Check for unique hiveId
    const existing = await Hive.findOne({ hiveId });
    if (existing) {
      return res.status(409).json({ message: 'Hive ID already exists.' });
    }

    const hive = new Hive({
      hiveId,
      datePlaced,
      latitude,
      longitude,
      numColonies
    });

    await hive.save();
    res.status(201).json({ message: 'Hive log added successfully.', hive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not add hive log.' });
  }
};

// Get Hive Logs (with optional date filtering and pagination)
const getHives = async (req, res) => {
    try {
      const { startDate, endDate, page = 1, limit = 10 } = req.query;
  
      const query = {};
      if (startDate || endDate) {
        query.datePlaced = {};
        if (startDate) query.datePlaced.$gte = new Date(startDate);
        if (endDate) query.datePlaced.$lte = new Date(endDate);
      }
  
      const hives = await Hive.find(query)
        .sort({ datePlaced: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Hive.countDocuments(query);
  
      res.json({
        total,
        page: Number(page),
        limit: Number(limit),
        results: hives
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Could not retrieve hive logs.' });
    }
  };

module.exports = { addHive , getHives };
