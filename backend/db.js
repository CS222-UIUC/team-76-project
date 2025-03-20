import {DatabaseSync} from 'node:sqlite'
const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

db.exec(`
    CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT
    )
`)

db.exec(`
    CREATE TABLE reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game_id INTEGER
        review TEXT,
        rating INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
        FOREIGN KEY(game_id) REFERENCES games(id)
    )
`)

export default db