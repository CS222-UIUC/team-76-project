const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db.js') 
// const admin = require('firebase-admin');

const router = express.Router()

// const serviceAccount = require('../firebaseServiceAccountKey.json');
// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

router.post('/register', (req, res) => {
    const { username, password } = req.body
    // encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8)

    //save new user + encrypted password to db
    try {
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        const result = insertUser.run(username, hashedPassword);
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});

        res.json({token});

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
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
})

// router.post('/google-login', async (req, res) => {
//     const { idToken } = req.body;

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         const email = decodedToken.email;
//         const uid = decodedToken.uid;


//         const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
//         let user = getUser.get(email);

//         if (!user) {
//             const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
//             insertUser.run(email, 'google-oauth-user');
//             user = getUser.get(email);
//         }

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//         res.json({ token });
//     } catch (err) {
//         console.error('Google login error:', err);
//         res.status(401).json({ error: 'Invalid Google token' });
//     }
// });


module.exports = router;