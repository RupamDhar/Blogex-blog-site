const Blog = require('../models/BlogModel.js');
const { GenerateAISummary } = require('../openai.js');

//GET /api/blogs/get-featured-blogs
exports.getFeaturedBlogs = async (req, res) => {
    console.log('get featured blogs');
    const count = req.query.count || 4;
    try {
        const blogs = await Blog.find().sort({ createdAt: 1 }).limit(count);
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET /api/blogs/get-all-blogs
exports.getAllBlogs = async (req, res) => {
    console.log('get all blogs');
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET /api/blogs/view/:slug
exports.getBlogBySlug = async (req, res) => {
    console.log('get blog by slug');
    const { slug } = req.params;
    try {
        const blog = await Blog.findOne({ slug });
        if (!blog) res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.generateAISummary = async (req, res) => {
    console.log('generate AI Summary');
    const { content } = req.body;
    try {
        const summaryContent = await GenerateAISummary(content);
        res.status(200).json({ summaryContent });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//POST /api/blogs/create-blog
exports.createBlog = async (req, res) => {
    console.log('post new blog');
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//DELETE /api/blogs/deleteBlog
exports.deleteBlog = async (req, res) => {
    console.log('delete blog');
    const { slug } = req.body;
    try {
        const result = await Blog.deleteOne({ slug });
        res.status(200).json({ message: 'Blog deleted succesfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//UPDATE /api/blogs/update-blog/:slug
exports.updateBlog = async (req, res) => {
    console.log('blog update');
    const { slug } = req.params;
    const { tags, content, clippedContent } = req.body;
    try {
        const result = await Blog.updateOne({
            slug: slug
        }, {
            tags: tags,
            content: content,
            clippedContent: clippedContent
        }
        )
        res.status(200).json({ message: 'Blog updated successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}