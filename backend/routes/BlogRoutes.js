const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController.js');

router.get('/get-featured-blogs', BlogController.getFeaturedBlogs);
router.get('/get-all-blogs', BlogController.getAllBlogs);
router.get('/view/:slug', BlogController.getBlogBySlug);
router.post('/create-blog', BlogController.createBlog);
router.post('/generate-ai-summary', BlogController.generateAISummary);
router.delete('/delete-blog', BlogController.deleteBlog);
router.patch('/update-blog/:slug', BlogController.updateBlog);

module.exports = router;