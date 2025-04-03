/* eslint-env jest */
const request = require('supertest')
const app = require('../app.js')
// const { default: test } = require('node:test');
// const { exportAllDeclaration } = require('@babel/types');

test('POST /1 adds a review to game 1', async () => {
    const review = { 
        review: 'I like this game', 
        rating: 5, 
        userid: 100}

    const response = await request(app)
        .post('/reviews/1')
        .send(review)
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        review: 'I like this game',
        rating: 5,
        userid: 100
    })
})

test('PUT /1 updates the first review', async () => {
    const newReview = { 
        review: 'I don\'t like this game anymore', 
        rating: 1, 
        userid: 100}

    const response = await request(app)
        .put('/reviews/1')
        .send(newReview)
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        review: 'I don\'t like this game anymore', 
        rating: 1, 
        userid: 100
    })
})


test('GET /1 returns all reviews on game 1', async() => {
    const response = await request(app).get('/reviews/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
})