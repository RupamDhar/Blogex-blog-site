import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './BlogPreviewCard.css'
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const BlogPreviewCard = ({ title, slug, author, tags, clippedContent, timestamp }) => {

    //unique colors for each tags
    const tagColors = {
        All: '#6B7280',      // cool gray
        Sad: '#64748B',      // slate
        Comedy: '#A16207',   // muted mustard
        Horror: '#B91C1C',   // soft maroon
        Auto: '#2563EB',     // soft blue
        Health: '#059669',   // muted green
    };

    const [blogDeleted, setBlogDeleted] = useState(false);

    const handleBlogDeleteDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Blog deleted for", title);

        const wrapper = e.currentTarget.closest('.blog-preview-card');
        const dialog = wrapper.querySelector('.delete-confirm-dialog-wrapper');
        if (dialog) dialog.classList.remove('hide-dialog');
    };

    const handleCloseDeleteWrapper = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const wrapper = e.currentTarget.closest('.blog-preview-card');
        const dialog = wrapper.querySelector('.delete-confirm-dialog-wrapper');
        if (dialog) dialog.classList.add('hide-dialog');
    }

    const handleDeleteBlog = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const result = await fetch(`${BASE_API_URL}/api/blogs/delete-blog`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug })
            });
            if (result.ok) {
                setBlogDeleted(true);
                alert('Blog deleted successfully!');
                setTimeout(() => {
                    setBlogDeleted(false);
                    window.location.reload();
                }, 1000);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleBlogEdit = () => {
        window.open(`/update-blog/${slug}`,'_blank')
    }


    return (
        <NavLink to={`/view/blog/${slug}`} className='blog-preview-card' target='_blank'>
            <div className="blog-card-info-wrapper">
                <div id="blog-card-title">{title}</div>
                <span
                    id="blog-card-author"
                // onClick={(e) => {
                //     e.stopPropagation();
                //     window.open('https://anandi.vercel.app', '_blank');
                // }}
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
            <div className="blog-card-date">
                {timestamp}
                <span className="blog-card-actionables">
                    {/* delete blog actionable */}
                    <i className="fa-solid fa-trash"
                        style={{ color: 'brown' }}
                        onClick={handleBlogDeleteDialog}
                    ></i>

                    {/* edit blog actionable */}
                    <i className="fa-solid fa-pen-to-square"
                        style={{ color: '#6B7280 ' }}
                        onClick={handleBlogEdit}
                    ></i>
                </span>
            </div>


            {/* below are dialog cards */}
            <div className="delete-confirm-dialog-wrapper hide-dialog">
                <i className="fa-solid fa-xmark"
                    style={{ color: 'white' }}
                    onClick={handleCloseDeleteWrapper}
                ></i>
                <div className="delete-dialog">
                    <div className="delete-dialog-header">
                        Permanently delete the blog?
                    </div>
                    <br /><br />
                    <div className="dialog-btn-wrapper">
                        <button className="delete-btn cancel" onClick={handleCloseDeleteWrapper}>Cancel</button>
                        <button className="delete-btn ok" onClick={handleDeleteBlog}>OK</button>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default BlogPreviewCard
