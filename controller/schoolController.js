const db = require("../config/db");
const calculateDistance = require("../utils/distance");

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body || {};

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (
    typeof name !== "string" ||
    typeof address !== "string" ||
    isNaN(latitude) ||
    isNaN(longitude)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data types",
    });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (lat < -90 || lat > 90) {
    return res.status(400).json({
      success: false,
      message: "Latitude must be between -90 and 90",
    });
  }

  if (lon < -180 || lon > 180) {
    return res.status(400).json({
      success: false,
      message: "Longitude must be between -180 and 180",
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name.trim(), address.trim(), lat, lon], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error while adding school",
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
};

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required",
    });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude must be numbers",
    });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  const query = "SELECT * FROM schools";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error while fetching schools",
        error: err.message,
      });
    }

    const sortedSchools = results
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2)),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: sortedSchools.length,
      data: sortedSchools,
    });
  });
};

module.exports = { addSchool, listSchools };