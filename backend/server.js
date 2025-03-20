const express = require('express')
const path = require('path')
const gameRoutes = require('./routes/gameRoutes.js')
const reviewsRoutes = require('./routes/reviewsRoutes.js')
const authMiddleware = require('./middleware/authMiddleware.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

// getting game information
app.use('/game', gameRoutes)

// CRUD actions on reviews, require JWT auth
app.use('/reviews', authMiddleware, reviewsRoutes)


app.listen(PORT, () => console.log(`Server has started on: ${PORT}` ))