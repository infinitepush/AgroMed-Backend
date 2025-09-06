

const axios = require("axios");
const Prediction = require("../models/Prediction");
const Image = require("../models/Image");
const suggestionsData = require("../data.json");


const normalizeKey = (crop, disease) => {
  return `${crop}___${disease}`
    .replace(/\s+/g, "_")  
    .trim();
};

exports.getPrediction = async (req, res) => {
  try {
    // 1. Parse imageId
    const imageId = parseInt(req.params.imageId, 10);
    if (!imageId) {
      return res.status(400).json({ success: false, message: "Image ID is required." });
    }

    // 2. Find image
    const imageRecord = await Image.findById(imageId);
    if (!imageRecord) {
      return res.status(404).json({ success: false, message: "Image not found." });
    }

    const imageUrl = imageRecord.url;
    console.log("Sending image to ML API:", imageUrl);

    // 3. Call ML API
    const mlResponse = await axios.post(
      "https://cropdisease-api.onrender.com/predict/url",
      { imageUrl },
      { headers: { "Content-Type": "application/json" } }
    );

    const { prediction, confidence } = mlResponse.data;
    const { crop, disease } = prediction;

    // 4. Attach suggestions from data.json
    let cleanDisease = disease.trim();

    if (cleanDisease.startsWith(crop)) {
      cleanDisease = cleanDisease.replace(crop, "").trim();
    }

    cleanDisease = cleanDisease.replace(/\s+/g, "_");

    const generatedKey = `${crop}_${crop}___${cleanDisease}`.trim();

    console.log("Crop:", crop);
    console.log("Original disease:", disease);
    console.log("Clean disease:", cleanDisease);
    console.log("Generated key:", generatedKey);
    console.log("Available keys (sample):", Object.keys(suggestionsData).slice(0, 10));
    console.log("Looking up key:", generatedKey);
    console.log("Suggestion raw:", suggestionsData[generatedKey]);
    console.log("All available keys:", Object.keys(suggestionsData));

    const suggestion = suggestionsData[generatedKey] || {
      remedy: "No remedy data available.",
      prevention: "No prevention data available.",
    };

    // 5. Save prediction (with suggestion text)
    const newPrediction = await Prediction.create({
      image_id: imageId,
      user_id: req.user.id,    
      disease,
      confidence,
      explanation: crop,
      suggestions: JSON.stringify(suggestion),
    });

    // 6. Response
    res.status(200).json({
      success: true,
      message: "Prediction successful and saved to database.",
      prediction: {
        id: newPrediction.id,
        crop,
        disease,
        confidence,
        suggestion,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(
      "Error during prediction process:",
      error.response?.data || error.message || error.stack
    );
    res.status(500).json({
      success: false,
      message: "Prediction failed.",
      error: error.response?.data || error.message,
    });
  }
};


// Get saved prediction by ID
exports.getSavedPrediction = async (req, res) => {
  try {
    const { predictionId } = req.params;
    if (!predictionId) {
      return res.status(400).json({ success: false, message: "Prediction ID is required." });
    }

    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ success: false, message: "Prediction not found." });
    }

    res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error("Error fetching saved prediction:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch prediction.",
      error: error.message,
    });
  }
};
