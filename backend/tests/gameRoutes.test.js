const request = require('supertest')
const gameRoutes = require('../routes/gameRoutes.js')
const { default: test } = require('node:test');
const { exportAllDeclaration } = require('@babel/types');

test('GET /1 returns game 1', async() => {
    const response = await request(gameRoutes).get('/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
})