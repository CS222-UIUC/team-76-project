/* eslint-env node */
const app = require('./app'); // ✅ Import the Express app
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));