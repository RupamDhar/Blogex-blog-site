const express = require('express');
const database = require('./database.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running...');
});

//fetching all blogs
app.get('/api/get-all-blogs', async (req, res) => {
    const blogs = await database.getAllBlogs();
    res.send(blogs);
});

//fetching blog with the blog slug 
app.get('/api/view/blog/:slug', async (req, res) => {
    const { slug } = req.params;
    res.send(await database.getBlog(slug));
});



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})