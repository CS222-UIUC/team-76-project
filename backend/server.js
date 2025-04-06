/* eslint-env node */
const app = require('./app'); // ✅ Import the Express app
const PORT = process.env.PORT || 5000;

//routes
app.use('/auth', authRoutes)


app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));