const express = require('express');
const cors = require('cors');
require('dotenv').config();
const databaseOld = require('./databaseOld.js');
const database = require('./database.js');
const BlogRoutes = require('./routes/BlogRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

database.connectDB();

//server health check
app.get('/', (req, res) => {
    res.send('Server is running...');
});

//routing /api/blogs to Router
app.use('/api/blogs', BlogRoutes);




app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

module.exports = { app };