import { useState, useEffect } from "react";
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './UpdateBlog.css'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const UpdateBlog = () => {

    const { slug } = useParams();

    const [tags, setTags] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blog, setBlog] = useState();
    const [blogUpdated, setBlogUpdated] = useState(false);

    useEffect(() => {
        fetchBlog(slug);
    }, []);

    //GETTING the blog to update
    async function fetchBlog(blogSlug) {
        try {
            const result = await fetch(`${BASE_API_URL}/api/blogs/view/${blogSlug}`);
            const data = await result.json();

            setBlog(data);
            setTags(data.tags.join(','));
            setBlogContent(data.content);
        }
        catch (error) {
            console.error(error);
        }
    }

    //UPDATING the blog
    async function handleUpdate () {
        console.log(tags);
        
        const updatedBlog = {
            tags: tags.split(','),
            content: blogContent,
            clippedContent: blogContent.split(' ').slice(0, 35).join(' ')
        }
        console.log(updatedBlog);
        
        try {
            const result = await fetch(`${BASE_API_URL}/api/blogs/update-blog/${slug}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBlog)
            });
            console.log(result);
            
            if(result.ok) {
                setBlogUpdated(true);
                setTimeout(() => setBlogUpdated(false), 2500);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <div className='update-blog-section'>
            <Navbar />
            <div className={`floating-message-update-success ${blogUpdated ? 'show' : ''}`}>
                Blog Updated Successfully!
            </div>
            {blog && tags && (
                <div className="blog-editor-wrapper">
                    <button className="update-btn" onClick={handleUpdate}>UPDATE BLOG</button>

                    <span htmlFor="title-input" id="title-label" className="label">Title</span>
                    <div id="title-input-update">{blog.title}</div> <br />

                    <span htmlFor="author-input" id="author-label" className="label">Author</span>
                    <div id="author-input-update">{blog.author}</div> <br />

                    <span htmlFor="tags-input" id="tags-label" className="label">Tags</span>
                    <input type="text" value={tags} id='tags-input' className="input" placeholder='Enter tags seperated by commas' onChange={(e) => setTags(e.target.value)} /> <br />

                    <SimpleMDE id="blog-input-area" value={blogContent} rows={40} placeholder="Your blog goes here..." onChange={(value) => setBlogContent(value)}></SimpleMDE>
                </div>
            )}
        </div>
    )
}

export default UpdateBlog
