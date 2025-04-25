/* eslint-env jest */
const request = require('supertest')
const app = require('../app.js')
// const { default: test } = require('node:test');
// const { exportAllDeclaration } = require('@babel/types');


test('POST / adds a review to game 1', async () => {
    const review = { 
        review: 'I like this game', 
        rating: 5, 
        game_id: 100}

    const response = await request(app)
        .post('/reviews/')
        .send(review)
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        id: 1,
        rating: 5,
        review: 'I like this game'
    })
})

test('PUT /1 updates the first review', async () => {
    const newReview = { 
        review: 'I don\'t like this game anymore', 
        rating: 1
        }

    const response = await request(app)
        .put('/reviews/1')
        .send(newReview)
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        message: "Updated review"
    })
})


test('GET / returns all reviews on game 100', async() => {
    const response = await request(app)
        .get('/reviews/')
        .send ({
            game_id: 100
        });
    expect(response.status).toBe(200);
})