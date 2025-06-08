import { useEffect, useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'
import BlogPreviewCard from '../components/BlogPreviewCard'


function App() {
  const tags = ['All', 'Sad', 'Comedy', 'Horror', 'Auto', 'Health', 'Travel', 'Life', 'Thoughts'];
  const [selectedTag, setSelectedTag] = useState('All');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  async function fetchAllBlogs() {
    try {
      const result = await fetch('http://localhost:9000/api/blogs/get-all-blogs');
      const data = await result.json();
      console.log(data);
      
      setBlogs(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="blogex-body">
        <div className="filter-section">
          <div className="tag-filter-title">Tags</div>
          <hr style={{ margin: '0 16px 12px -6px' }} />
          <div className="tag-filters-wrapper">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`tag-filters ${selectedTag === tag ? 'tag-filter-selected' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-cards-wrapper">
          {blogs && blogs.map((blog, index) => (
            //conditionally rendering blog cards according to tags
            blog.tags.includes(selectedTag)
            &&
            <BlogPreviewCard
              key={index}
              title={blog.title}
              slug={blog.slug}
              author={blog.author}
              tags={blog.tags}
              clippedContent={blog.clippedContent}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
