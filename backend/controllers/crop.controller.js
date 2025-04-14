const Crop = require('../models/Crop');

// Add Crop Entry
const addCrop = async (req, res) => {
  try {
    const {
      name,
      floweringStart,
      floweringEnd,
      latitude,
      longitude,
      recommendedHiveDensity
    } = req.body;

    if (
      !name || !floweringStart || !floweringEnd ||
      latitude == null || longitude == null || !recommendedHiveDensity
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: 'Invalid latitude or longitude range.' });
    }

    if (new Date(floweringEnd) < new Date(floweringStart)) {
      return res.status(400).json({ message: 'Flowering end must be after start date.' });
    }

    const crop = new Crop({
      name,
      floweringStart,
      floweringEnd,
      latitude,
      longitude,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      recommendedHiveDensity
    });

    await crop.save();
    res.status(201).json({ message: 'Crop entry added successfully.', crop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not add crop.' });
  }
};

// Get Nearby Crop Opportunities
const getNearbyCrops = async (req, res) => {
  try {
    const { latitude, longitude, radius = 100, date } = req.query;

    if (latitude == null || longitude == null) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const searchDate = date ? new Date(date) : new Date();

    const crops = await Crop.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius / 6378.1]
        }
      },
      floweringStart: { $lte: searchDate },
      floweringEnd: { $gte: searchDate }
    });

    res.json({ count: crops.length, crops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not fetch nearby crops.' });
  }
};

module.exports = { addCrop, getNearbyCrops };
