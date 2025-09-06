const db = require("../config/db");

class User {
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static create(fullname, email, passwordHash, phone) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO users (fullname, email, password_hash, phone)
                VALUES (?, ?, ?, ?)
            `;
            db.run(query, [fullname, email, passwordHash, phone], function (err) {
                if (err) return reject(err);
                // Return the newly inserted user (fetch it by ID)
                db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static updateProfile(id, { fullname, phone }) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE users SET fullname = ?, phone = ? WHERE id = ?",
                [fullname, phone, id],
                function (err) {
                    if (err) return reject(err);
                    // Fetch updated user
                    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                        if (err) return reject(err);
                        resolve(row);
                    });
                }
            );
        });
    }

    static updatePassword(id, passwordHash) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE users SET password_hash = ? WHERE id = ?",
                [passwordHash, id],
                function (err) {
                    if (err) return reject(err);
                    // Fetch updated user
                    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                        if (err) return reject(err);
                        resolve(row);
                    });
                }
            );
        });
    }
}

module.exports = User;
