const db = require("../config/db");

class Prediction {
    static create({ image_id, user_id, crop, disease, confidence, explanation, suggestions }) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO predictions (image_id, user_id, crop, disease, confidence, explanation, suggestions)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.run(
                query,
                [
                    image_id,
                    user_id,
                    crop,
                    disease,
                    confidence,
                    explanation,
                    JSON.stringify(suggestions || {})
                ],
                function (err) {
                    if (err) return reject(err);

                    db.get("SELECT * FROM predictions WHERE id = ?", [this.lastID], (err, row) => {
                        if (err) return reject(err);

                        // ✅ Parse suggestions when reading
                        try {
                            row.suggestions = JSON.parse(row.suggestions);
                        } catch {
                            row.suggestions = row.suggestions;
                        }

                        resolve(row);
                    });
                }
            );
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM predictions WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);

                if (row) {
                    try {
                        row.suggestions = JSON.parse(row.suggestions);
                    } catch {
                        // leave as string
                    }
                }

                resolve(row);
            });
        });
    }

    static findByImage(image_id) {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT * FROM predictions WHERE image_id = ? ORDER BY created_at DESC",
                [image_id],
                (err, rows) => {
                    if (err) return reject(err);

                    rows.forEach(r => {
                        try {
                            r.suggestions = JSON.parse(r.suggestions);
                        } catch {
                            // leave as string
                        }
                    });

                    resolve(rows);
                }
            );
        });
    }

    // NEW method: find all predictions for a specific user
    static findByUser(user_id) {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC",
                [user_id],
                (err, rows) => {
                    if (err) return reject(err);

                    rows.forEach(r => {
                        try {
                            r.suggestions = JSON.parse(r.suggestions);
                        } catch {
                            // leave as string
                        }
                    });

                    resolve(rows);
                }
            );
        });
    }
}

module.exports = Prediction;
