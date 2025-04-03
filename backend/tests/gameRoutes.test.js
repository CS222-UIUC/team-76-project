/* eslint-env jest */
const request = require('supertest')
const app = require('../app.js')
// const { default: test } = require('node:test');
// const { exportAllDeclaration } = require('@babel/types');

test('GET /1 returns game 1', async() => {
    const response = await request(app).get('/game/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
})