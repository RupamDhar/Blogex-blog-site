const Blog = require('../models/BlogModel.js');

exports.getAllBlogs = async (req, res) => {
    console.log('get all blogs');
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBlogBySlug = async (req, res) => {
    console.log('get blog by slug');
    const { slug } = req.params;
    try {
        const blog = await Blog.findOne({ slug });
        console.log(blog);
        if (!blog) res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}