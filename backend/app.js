const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes.js');
const reviewsRoutes = require('./routes/reviewsRoutes.js');
const authMiddleware = require('./middleware/authMiddleware.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// getting game information
app.use('/game', authMiddleware, gameRoutes);

// CRUD actions on reviews, require JWT auth
app.use('/reviews', authMiddleware, reviewsRoutes);

module.exports = app; // ✅ Export the Express app (without listening)