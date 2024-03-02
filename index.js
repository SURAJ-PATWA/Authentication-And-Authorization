const express = require('express');
const app = express();
require('dotenv').config();
const PORT =  4000;

app.use(express.json()); // Corrected: Added parentheses

require('./config/database').connect();

// Route import and mount
const user = require('./routes/user');
// Mount
app.use('/api/v1', user);

// Activate
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`); // Corrected: Used backticks for string interpolation
});
