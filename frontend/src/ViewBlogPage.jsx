import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './ViewBlogPage.css'

const ViewBlogPage = () => {

    const { slug } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        fetchBlog(slug);
    }, []);

    async function fetchBlog(blogSlug) {
        console.log(`http://localhost:9000/api/blogs/view/${blogSlug}`);
        const result = await fetch(`http://localhost:9000/api/blogs/view/${blogSlug}`);
        const data = await result.json();
        console.log(data);
        setBlog(data);
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);

        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        console.log(formattedDate); // "June 7, 2025"
        return formattedDate;
    }

    return (
        <div className='blog-content-page'>
            <div className="blog-content-wrapper">
                <div className="blog-header">
                    {blog && blog.title}
                    <div className="blog-timestamp">{blog && formatDate(blog.createdAt)}</div>
                    <div className="blog-tags">
                        {/* blog.tags is mapped when it exists (after fetching) */}
                        {blog.tags && blog.tags.map((tag, index) => (
                            <div className="blog-tag" index={index}>{tag}</div>
                        ))}
                    </div>
                </div>
                
                <div className="blog-content">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default ViewBlogPage
