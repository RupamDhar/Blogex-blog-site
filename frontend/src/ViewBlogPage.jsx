import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './ViewBlogPage.css'

const ViewBlogPage = () => {

    const { slug } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(()=> {
        fetchBlog(slug);
    }, []);

    async function fetchBlog(blogSlug) {
        const result = await fetch(`http://localhost:9000/api/view/blog/${blogSlug}`);
        const data = await result.json();
        console.log(data[0]);
        setBlog(data[0]);
    }

    return (
        <div className='blog-content-page'>
            <div className="blog-content-wrapper">
                <div className="blog-title">
                    {blog.title}
                    <div className="blog-timestamp">{blog.timestamp}</div>
                </div>

                <div className="blog-content">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default ViewBlogPage
