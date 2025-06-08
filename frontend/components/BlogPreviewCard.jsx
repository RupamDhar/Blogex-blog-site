import React from 'react'
import { NavLink } from 'react-router-dom';
import './BlogPreviewCard.css'

const BlogPreviewCard = ({ title, slug, author, tags, clippedContent }) => {

    //unique colors for each tags
    const tagColors = {
        All: '#6B7280',      // cool gray
        Sad: '#64748B',      // slate
        Comedy: '#A16207',   // muted mustard
        Horror: '#B91C1C',   // soft maroon
        Auto: '#2563EB',     // soft blue
        Health: '#059669',   // muted green
    };

    return (
        <NavLink to={`/view/blog/${slug}`} className='blog-preview-card' target='_blank'>
            <div className="blog-card-info-wrapper">
                <div id="blog-card-title">{title}</div>
                <span
                    id="blog-card-author"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open('https://anandi.vercel.app', '_blank');
                    }}
                >
                    by {author}
                </span>
            </div>
            <div className="blog-card-tags">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="tag"
                        style={{ backgroundColor: `${tagColors[tag]}` }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div id="blog-card-content">{clippedContent}</div>
        </NavLink>
    )
}

export default BlogPreviewCard
