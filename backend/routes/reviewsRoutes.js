const express = require('express')
const db = require('../db.js')

const router = express.Router()

// get all reviews on a game id
router.get('/:game_id', (req, res) => { 
    const { game_id } = req.params;

    const getReviews = db.prepare(`SELECT * FROM reviews WHERE game_id = ? AND user_id != ?`);
    const reviews = getReviews.all(game_id, req.user_id);
    res.json(reviews)
})

router.get('/mine/:game_id', (req, res) => {
    const { game_id } = req.params;


    const getUserReview = db.prepare(`
        SELECT * FROM reviews 
        WHERE game_id = ? AND user_id = ?
    `);
    const review = getUserReview.get(game_id, req.user_id);

    if (!review) {
        return res.status(404).json({ message: 'No review found for this game by the user.' });
    }

    res.json(review);
});

router.get('/rating/:game_id', (req, res) => {
    const { game_id } = req.params;

    const getAvgRating = db.prepare(`SELECT AVG(rating) as avgRating FROM reviews WHERE game_id = ?`);
    const row = getAvgRating.get(game_id);
    res.json({ averageRating: row?.avgRating ?? null });
})

// create a new review on a game id
router.post('/', (req, res) => {
    const { rating, review, game_id } = req.body;

    const userQuery = db.prepare('SELECT username FROM users WHERE id = ?');
    const user = userQuery.get(req.user_id);
    console.log(user)
    console.log(user.username)
    const insertReview = db.prepare(`INSERT INTO reviews (user_id, game_id, review, rating, username) VALUES (?, ?, ?, ?, ?)`);
    const result = insertReview.run(req.user_id, game_id, review, rating, user.username);

    res.json({id: result.lastInsertRowid, rating, review});
})

// update a review
router.put('/:review_id', (req, res) => {
    const { review_id } = req.params;
    const { rating, review } = req.body;

    const updatedReview = db.prepare(`UPDATE reviews SET rating = ?, review = ? WHERE id = ?`);
    updatedReview.run(rating, review, review_id);

    res.json({message: "Updated review"});
})

// delete a review
router.delete('/:review_id', (req, res) => {
    const { review_id } = req.params;

    const deleteReview = db.prepare(`DELETE FROM reviews WHERE id = ?`);
    deleteReview.run(review_id)
    res.json({message: "Deleted"})
})

module.exports = router;