const express = require('express');
const app = express();
const port = 4000;

app.use(express.json);
app.use(express.static('frontend'));

app.get('/message', (req, res) => {
    res.json({message: 'Hello, world!'});
})

app.listen(port, () => {
    console.log('listening on port')
})