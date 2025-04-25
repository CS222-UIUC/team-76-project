const express = require('express')
const db = require('../db.js')

const router = express.Router()

// get all reviews on a game id
router.get('/', (req, res) => { 
    const { game_id } = req.body;

    const getReviews = db.prepare(`SELECT * FROM reviews WHERE game_id = ?`);
    const reviews = getReviews.all(game_id);
    res.json(reviews)
})

router.get('/rating/:game_id', (req, res) => {
    const { game_id } = req.params;

    const getAvgRating = db.prepare(`SELECT AVG(rating) as avgRating FROM reviews WHERE game_id = ?`);
    const row = getAvgRating.get(game_id);
    res.json({ averageRating: row?.avgRating ?? null });
})

// create a new review on a game id
router.post('/', (req, res) => {
    const { rating, review, game_id } = req.body;

    const insertReview = db.prepare(`INSERT INTO reviews (user_id, game_id, review, rating) VALUES (?, ?, ?, ?)`);
    const result = insertReview.run(req.user_id, game_id, review, rating);

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