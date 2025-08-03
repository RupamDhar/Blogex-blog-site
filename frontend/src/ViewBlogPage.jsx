import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './ViewBlogPage.css'
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const ViewBlogPage = () => {

    const { slug } = useParams();
    const [blog, setBlog] = useState({});
    const [summary, setSummary] = useState();
    const [isSummaryGenerated, setIsSummaryGenerated] = useState(true);

    useEffect(() => {
        fetchBlog(slug);
    }, []);
    useEffect(() => {
        document.title = `${blog.title}`;
    }, [blog]);

    async function fetchBlog(blogSlug) {
        const result = await fetch(`${BASE_API_URL}/api/blogs/view/${blogSlug}`);
        const data = await result.json();
        console.log(data);
        setBlog(data);
    }

    async function handleGenerateSummary() {
        setIsSummaryGenerated(false);
        try {
            const result = await fetch(`${BASE_API_URL}/api/blogs/generate-ai-summary`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: blog.content })
            });
            const data = await result.json();
            console.log(data);
            setSummary(data);
            setIsSummaryGenerated(true);
        }
        catch (error) {
            console.error(error);
        }
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
                    {blog && blog.title}   <br />
                    <div className="written-by">by {blog && blog.author}</div>
                    <div className="blog-timestamp">{blog && formatDate(blog.createdAt)}</div>
                    <div className="blog-tags">
                        {/* blog.tags is mapped when it exists (after fetching) */}
                        {blog.tags && blog.tags.map((tag, index) => (
                            <div className="blog-tag" key={index}>{tag}</div>
                        ))}
                    </div>
                </div>

                <div className="summary-area">
                    <button
                        className="generate-ai-summary-btn"
                        onClick={handleGenerateSummary}
                    >
                        {!isSummaryGenerated && <div className="summary-loader"></div>}
                        Generate AI Summary
                    </button>
                    {summary && <div className='ai-summary-textarea'>{summary.summaryContent}</div>}
                </div>

                <div className="blog-content">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default ViewBlogPage
