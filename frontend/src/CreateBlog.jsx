import { useState } from "react";
import SimpleMDE from 'react-simplemde-editor';
import Navbar from '../components/Navbar';
import 'easymde/dist/easymde.min.css';
import './CreateBlog.css'


const CreateBlog = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [blog, setBlog] = useState('');
    const [published, setPublished] = useState(false);

    function resetForm() {
        setTitle('');
        setAuthor('');
        setTags('');
        setBlog('');
    }

    async function handlePublish() {
        //creating the POST payload
        const postBlog = {
            title: title,
            slug: title.toLowerCase().replaceAll(' ', '-'),
            author: author,
            tags: tags.split(','),
            content: blog,
            clippedContent: blog.split(' ').slice(0, 35).join(' ')
        }
        console.log(postBlog.slug);

        //POSTing the Blog
        const result = await fetch('http://localhost:9000/api/blogs/create-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBlog)
        });

        if (result.ok) {
            setPublished(true);
            resetForm();
            setTimeout(() => setPublished(false), 4000);
        }
    }

    return (
        <div className='create-blog-section'>
            <Navbar />
            <div className={`floating-message-success ${published ? 'show' : ''}`}>
                Blog Published Successfully!
            </div>
            <div className="blog-editor-wrapper">
                <button className="publish-btn" onClick={handlePublish}>PUBLISH BLOG</button>

                <span htmlFor="title-input" id="title-label" className="label">Title</span>
                <input type="text" value={title} id='title-input' className="input" placeholder='Enter blog title' onChange={(e) => setTitle(e.target.value)} /> <br />

                <span htmlFor="author-input" id="author-label" className="label">Author</span>
                <input type="text" value={author} id='author-input' className="input" placeholder='Enter author' onChange={(e) => setAuthor(e.target.value)} /> <br />

                <span htmlFor="tags-input" id="tags-label" className="label">Tags</span>
                <input type="text" value={tags} id='tags-input' className="input" placeholder='Enter tags seperated by commas(include All as a tag)' onChange={(e) => setTags(e.target.value)} /> <br />

                <SimpleMDE id="blog-input-area" value={blog} rows={40} placeholder="Your blog goes here..." onChange={(value) => setBlog(value)}></SimpleMDE>
            </div>
        </div>
    )
}

export default CreateBlog
