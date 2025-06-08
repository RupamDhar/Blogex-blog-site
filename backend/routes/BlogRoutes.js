const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController.js');

router.get('/get-all-blogs', BlogController.getAllBlogs);
router.get('/view/:slug', BlogController.getBlogBySlug);
router.post('/create-blog', BlogController.createBlog);

module.exports = router;