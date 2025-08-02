import { useEffect, useState } from 'react'
import './LandingPage.css'
import BlogPreviewCard from '../components/BlogPreviewCard';
import Footer from '../components/Footer';
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const LandingPage = () => {
    const featuredBlogCount = 3;
    const [featuredBlogs, setFeaturedBlogs] = useState([]);

    useEffect(() => {
        fetchFeaturedBlogs();
    }, []);

    async function fetchFeaturedBlogs() {
        try {
            const result = await fetch(`${BASE_API_URL}/api/blogs/get-featured-blogs?count=${featuredBlogCount}`);
            const blogs = await result.json();
            setFeaturedBlogs(blogs);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='landing-page'>
            <div className="hero-section">
                <div className="hero-section-title">Blogex.</div>
                <a href='/home' className="view-all-btn">VIEW ALL</a>
            </div>

            <div className="featured-blogs">
                {featuredBlogs &&
                    featuredBlogs.map((blog, index) => (
                        <BlogPreviewCard 
                            title={blog.title}
                            slug={blog.slug}
                            author={blog.author}
                            tags={blog.tags}
                            clippedContent={blog.clippedContent}
                        />
                    ))
                }
            </div>

            <footer className="blogex-footer"
                style={{ 
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                <span className='footer-title'>Blogex.</span>
                <div className="rights-reserved">©2025 Blogex. All Rights Reserved.</div>
            </footer>
        </div>
    )
}

export default LandingPage
