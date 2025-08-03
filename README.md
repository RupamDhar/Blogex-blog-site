# Blogex

**Blogex** is a full-featured MERN-stack blog web application that allows users to read, explore, and publish blogs in a clean interface. Whether you're an avid reader or an aspiring writer, Blogex makes it simple to browse insightful content or share your own ideas with the world.


## Features

- **Blog Creation and Editing:** Users can view, create, update, and delete their blog posts with ease.
- **Rich Text Editor:** Markdown-supported editor for writing expressive and well-formatted blogs.
- **AI Summary Generation:** Readers can generate an AI summary of the blog.
- **Content Previews:** Blog listings show a short preview (`clippedContent`) of each post.
- **Blog Filters:** Readers can filter blogs by authors and blog tags.
- **Developer-Friendly Structure:** Clean separation of frontend and backend logic for easier development and maintenance.

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Libraries/Frameworks:** Mongoose, ReactJS
- **Deployment:** Vercel (Frontend & Backend)

## Routes

### For Blogs:
- `GET /` — Home page with n latest blog posts
- `GET /api/blogs/get-all-blogs` — Retrieve all blog entries
- `GET /api/blogs/view/:slug` — View a single blog post by slug
- `PATCH /api/blogs/update-blog/:slug` — Update an existing blog post
- `POST /api/blogs/create-blog` — Create a new blog post
- `POST /api/blogs/generate-ai-summary` — Generate AI summary for a blog post
- `DELETE /api/blogs/delete-blog` — Delete a blog post

---


**Author:** [Rupam Dhar](https://github.com/RupamDhar)

**Website:** [Blogex](https://blogexblog.vercel.app)
