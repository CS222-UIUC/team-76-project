const express = require('express')
const db = require('../db.js')

const router = express.Router()

function authMiddleware (req, res, next) {

    const userQuery = db.prepare(`SELECT id FROM users WHERE username = ?`);
    const user = userQuery.get("username");

    if (user) {
        req.user_id = user.id; // Attach user_id to request
        return next(); // User exists, proceed
    }

    const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    const result = insertUser.run("username", "password");

    req.user_id = result.lastInsertRowid;
    next();
}

module.exports = authMiddleware;