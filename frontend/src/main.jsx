import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import CreateBlog from './CreateBlog.jsx'
import ViewBlogPage from './ViewBlogPage.jsx';
import LandingPage from './LandingPage.jsx';
import UpdateBlog from './UpdateBlog.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/create-blog',
    element: <CreateBlog />
  },
  {
    path: '/view/blog/:slug',
    element: <ViewBlogPage />
  },
  {
    path: '/update-blog/:slug',
    element: <UpdateBlog />
  }
])


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
