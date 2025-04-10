const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db.js') 

const router = express.Router()

router.post('/register', (req, res) => {
    const { username, password } = req.body
    // encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8)

    //save new user + encrypted password to db
    try {
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        const result = insertUser.run(username, hashedPassword)

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    res.sendStatus(201)
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if (!user) {return res.status(404).send({message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {return res.status(401).send({message: "Invalid password"})}

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    res.sendStatus(201)
})


module.exports = router;