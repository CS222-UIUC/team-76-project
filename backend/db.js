const { DatabaseSync } = require('node:sqlite')
const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

db.exec(`
    CREATE TABLE reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game_id INTEGER,
        review TEXT,
        rating INTEGER,
        username TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

module.exports = db;