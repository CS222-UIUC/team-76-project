//url: http://localhost:3000/
const express = require('express')
const app = express()
const PORT = t000

app.get('/', (req, res) => {
    console.log('um', req.method)
    res.sendStatus(201)
})



app.listen(PORT, () => console.log(`Server has started on: ${PORT}` ))