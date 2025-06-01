const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema, 'Blogs');