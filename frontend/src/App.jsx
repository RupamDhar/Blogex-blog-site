import { useEffect, useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'
import BlogPreviewCard from '../components/BlogPreviewCard'
import Footer from '../components/Footer'


function App() {
  const tags = ['All', 'Sad', 'Comedy', 'Horror', 'Auto', 'Health', 'Travel', 'Life', 'Thoughts'];
  const authors = [
    'All',
    'Rahul Mehta',
    'Ananya Gupta',
    'Nisha Verma',
    'Jane Doe',
    'Priya Sharma',
    'Karan Malik',
    'Meera Kulkarni',
    'CyberG',
    'CyberX'
  ]
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    document.title = 'Blogex. - Home';
    fetchAllBlogs();
  }, []);

  async function fetchAllBlogs() {
    try {
      const result = await fetch(`https://blogex-backend.vercel.app//api/blogs/get-all-blogs`);
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

      <main className="blogex-body">
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

          <div className="author-filter-title" style={{ marginTop: '20px' }}>Authors</div>
          <hr style={{ margin: '0 16px 12px -6px' }} />
          <div className="author-filters-wrapper">
            {authors.map((author, index) => (
              <button
                key={index}
                className={`author-filters ${selectedAuthor === author ? 'author-filter-selected' : ''}`}
                onClick={() => setSelectedAuthor(author)}
              >
                {author}
              </button>
            ))}
          </div>

        </div>

        <div className="blog-cards-wrapper">
          {blogs ? (blogs
            .filter((blog) =>
              //pass this blog if selectedTag is All OR is included in blog tags
              (selectedTag === 'All' || blog.tags.includes(selectedTag))
              //AND pass this blog if selectedAuthor is All OR is equal to blog author
              && (selectedAuthor === 'All' || blog.author === selectedAuthor)
            )
            .map((blog, index) => (
              <BlogPreviewCard
                key={index}
                title={blog.title}
                slug={blog.slug}
                author={blog.author}
                tags={blog.tags}
                clippedContent={blog.clippedContent}
              />
            ))):(<h1>No blogs found</h1>)
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
