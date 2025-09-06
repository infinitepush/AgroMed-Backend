const express = require("express");
const { getPrediction, getSavedPrediction } = require("../controllers/predictController");
const { auth } = require("../controllers/authController"); // import your auth middleware

const router = express.Router();

// Protect the prediction creation route with auth middleware
router.post("/:imageId", auth, getPrediction);  // <-- add auth here

router.get("/saved/:predictionId", auth, getSavedPrediction); // optional: protect this as well

module.exports = router;
