/* eslint-env jest */
const request = require('supertest')
const app = require('../app.js')
// const { default: test } = require('node:test');
// const { exportAllDeclaration } = require('@babel/types');
const axios = require('axios');

jest.mock('axios'); // Mock axios

test('GET /genre/2 returns games with genre 2', async () => {
    axios.get.mockResolvedValue({
        data: [
                {
                  "id": 57016,
                  "alternative_names": [
                    9704
                  ],
                  "category": 0,
                  "cover": 29746,
                  "created_at": 1504551758,
                  "external_games": [
                    1946731
                  ],
                  "first_release_date": 1062201600,
                  "game_engines": [
                    64
                  ],
                  "game_modes": [
                    1
                  ],
                  "genres": [
                    2,
                    12,
                    31
                  ],
                  "involved_companies": [
                    54007,
                    54002,
                    54001,
                    54003
                  ],
                  "keywords": [
                    164
                  ],
                  "name": "Sinjid: Battle Arena",
                  "platforms": [
                    82
                  ],
                  "player_perspectives": [
                    4
                  ],
                  "release_dates": [
                    112014,
                    112017
                  ],
                  "screenshots": [
                    122355,
                    122357,
                    122356
                  ],
                  "similar_games": [
                    96217,
                    106987,
                    81249,
                    80916,
                    115280,
                    103303,
                    28309,
                    30245,
                    113360,
                    105269
                  ],
                  "slug": "sinjid-battle-arena",
                  "summary": "Sinjid: Battle Arena is the first game in the Sinjid series. It is a role-playing action-adventure game made for flash. It has a turn based battle system.",
                  "tags": [
                    1,
                    268435458,
                    268435468,
                    268435487,
                    536871076
                  ],
                  "themes": [
                    1
                  ],
                  "updated_at": 1739888155,
                  "url": "https://www.igdb.com/games/sinjid-battle-arena",
                  "websites": [
                    56131,
                    56130,
                    404379
                  ],
                  "checksum": "b61d9f9a-5c6f-bf89-b484-d6ca1780760b",
                  "collections": [
                    2912
                  ],
                  "game_type": 0
                },
                {
                  "id": 122945,
                  "category": 0,
                  "cover": 298483,
                  "created_at": 1570442674,
                  "external_games": [
                    1776371,
                    2133774,
                    1914977
                  ],
                  "first_release_date": 1501891200,
                  "game_engines": [
                    64
                  ],
                  "game_modes": [
                    1
                  ],
                  "genres": [
                    2,
                    9,
                    31
                  ],
                  "name": "Seven Photos",
                  "platforms": [
                    82,
                    34,
                    6,
                    39,
                    14
                  ],
                  "player_perspectives": [
                    1
                  ],
                  "release_dates": [
                    468338,
                    468340,
                    468348,
                    468347,
                    468339
                  ],
                  "screenshots": [
                    664083,
                    664084,
                    664086,
                    664087,
                    664088
                  ],
                  "similar_games": [
                    18011,
                    27725,
                    81275,
                    25222,
                    13189,
                    27266,
                    26223,
                    54678,
                    25646,
                    236
                  ],
                  "slug": "seven-photos",
                  "summary": "Seven Photos is a murder mystery game where you have 7 photos to figure out exactly how and why you woke up, without memories, outside a locked room containing two presumably dead people. You try to figure out who the murderer is before you go insane. Could it have been you? Who's lying? You have seven photos to figure that out.",
                  "tags": [
                    19,
                    43,
                    268435458,
                    268435465,
                    268435487
                  ],
                  "themes": [
                    19,
                    43
                  ],
                  "updated_at": 1739888168,
                  "url": "https://www.igdb.com/games/seven-photos",
                  "videos": [
                    87718
                  ],
                  "websites": [
                    236164,
                    389429
                  ],
                  "checksum": "d2bf91e1-9b0f-2b0b-ad85-4c3837412b59",
                  "game_type": 0
                }
        ]
    });

    const response = await request(app).get('/game/genre/2');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 

    if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('id'); 
        expect(response.body[0]).toHaveProperty('genres'); 
        expect(response.body[0].genres).toContain(2); 
    }
});