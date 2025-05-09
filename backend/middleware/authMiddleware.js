const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
    const token = req.headers['authorization']
    if (!token) { return res.status(401).json({message: "no token provided"}) }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({message: "invalid token"}) }
        req.user_id = decoded.id 
        next()
    })
}
// const express = require('express')
// const db = require('../db.js')
// }
// const express = require('express')
// const db = require('../db.js')

// const router = express.Router()
// const router = express.Router()

// function authMiddleware (req, res, next) {
// function authMiddleware (req, res, next) {

//     const userQuery = db.prepare(`SELECT id FROM users WHERE username = ?`);
//     const user = userQuery.get("username");
//     const userQuery = db.prepare(`SELECT id FROM users WHERE username = ?`);
//     const user = userQuery.get("username");

//     if (user) {
//         req.user_id = user.id; // Attach user_id to request
//         return next(); // User exists, proceed
//     }
//     if (user) {
//         req.user_id = user.id; // Attach user_id to request
//         return next(); // User exists, proceed
//     }

//     const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
//     const result = insertUser.run("username", "password");
//     const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
//     const result = insertUser.run("username", "password");

//     req.user_id = result.lastInsertRowid;
//     next();
// }
//     req.user_id = result.lastInsertRowid;
//     next();
// }

module.exports = authMiddleware;