const db = require("../config/db");

class Feedback {
    static async create(prediction_id, is_correct, notes) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO feedback (prediction_id, is_correct, notes) VALUES (?, ?, ?)",
                [prediction_id, is_correct, notes],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, prediction_id, is_correct, notes });
                }
            );
        });
    }
}

module.exports = Feedback;