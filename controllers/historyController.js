// controllers/historyController.js
const db = require("../config/db");

// Controller function to fetch all predictions and their image URLs, including crop
exports.getHistory = (req, res) => {
  const userId = req.user.id; 

  const query = `
    SELECT 
        p.id, 
        p.image_id, 
        p.crop,
        p.disease, 
        p.confidence, 
        p.suggestions,
        p.explanation,
        p.created_at,
        i.url AS image_url
    FROM predictions p
    JOIN images i ON p.image_id = i.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC;
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching history:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch history." });
    }

    res.status(200).json({ success: true, predictions: rows });
  });
};
