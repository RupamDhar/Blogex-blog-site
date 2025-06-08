const Blog = require('../models/BlogModel.js');

//GET /api/blogs/etg-all-blogs
exports.getAllBlogs = async (req, res) => {
    console.log('get all blogs');
    try {
        const blogs = await Blog.find();
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