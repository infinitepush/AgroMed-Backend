// models/Image.js
const db = require("../config/db");

class Image {
    static create(url) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO images (url) VALUES (?)`;
            db.run(query, [url], function (err) {
                if (err) return reject(err);

                // Fetch the inserted image by ID
                db.get("SELECT * FROM images WHERE id = ?", [this.lastID], (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM images WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = Image;
