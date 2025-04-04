const express = require('express')
const db = require('../db.js') 

const router = express.Router()

router.post('/register', (req, res) => {
    const { username, password } = req.body
    // save the username and an encrypted password
    
    // encrypt password

    console.log(username, password)
    res.sendStatus(201)
})

router.post('/register', (req, res) => {
    const { username, password } = req.body
    // save the username and an encrypted password
    
    // encrypt password

    console.log(username, password)
    res.sendStatus(201)
})


module.exports = router;