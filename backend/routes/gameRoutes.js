const express = require('express')
const db = require('../db.js'); 
const { default: axios } = require('axios');
require('dotenv').config()

const router = express.Router()

let ACCESS_TOKEN = '';

async function getIGDBAccess() {
    console.log(`client_id: ${process.env.CLIENT_ID} secret: ${process.env.CLIENT_SECRET} `)
    try {
        const response = await axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`);
        ACCESS_TOKEN = response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
    }
}

async function getGames(genre){
    try {
        if (!ACCESS_TOKEN) await getIGDBAccess();
        console.log(`client id: ${process.env.CLIENT_ID} auth: ${ACCESS_TOKEN}`)
        const response = await axios.post('https://api.igdb.com/v4/games', 
            `fields *; where genres = (${genre});`,
            {
                headers: {
                    'Client-ID': process.env.CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error fetching game:', error.response?.data || error.message);
        return [];
    }
}

async function getGamesID(ID){
    try {
        if (!ACCESS_TOKEN) await getIGDBAccess();
        console.log(`client id: ${process.env.CLIENT_ID} auth: ${ACCESS_TOKEN}`)
        const response = await axios.post('https://api.igdb.com/v4/games', 
            `fields *; where id = (${ID});`,
            {
                headers: {
                    'Client-ID': process.env.CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error fetching game:', error.response?.data || error.message);
        return [];
    }
}


// get all games
router.get('/all', async (req, res) => { 
    const games = await getGames();
    res.json(games);
})

router.get('/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    const games = await getGames(genre);
    res.json(games);
})

// get game with id = id
router.get('/id/:id', async (req, res) => { 
    const { id } = req.params;
    const games = await getGamesID(id);
    res.json(games);
})

module.exports = router;