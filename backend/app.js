const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes.js');
const reviewsRoutes = require('./routes/reviewsRoutes.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/test-review', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'reviews.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/authPages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/authPages', 'register.html'));
});

app.get('/ratings', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'ratings.html'));
});

app.get('/game/v', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'ratings.html'));
});

app.get('/genre/:genre_id', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'genre.html'));
});

// getting game information
app.use('/game', authMiddleware, gameRoutes);

// CRUD actions on reviews, require JWT auth
app.use('/reviews', authMiddleware, reviewsRoutes);

app.use('/auth', authRoutes)


module.exports = app; 