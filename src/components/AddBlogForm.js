import React, { useState } from 'react'

const AddBlogForm = (props) => {
  const { addBlog } = props
  const [newBlog, setNewBlog] = useState({})

  const blog = {}
  const createBlog = (event) => {
    event.preventDefault()

    addBlog(newBlog)

    setNewBlog({})
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>

      <form onSubmit={createBlog}>
        <div>
                  Title:
          <input
            type="text"
            value={blog.title}
            id="title"
            onChange={({ target }) => blog.title = target.value}
          />
        </div>
        <div>
                  Author:
          <input
            type="text"
            value={blog.author}
            id="author"
            onChange={({ target }) => blog.author = target.value}
          />
        </div>
        <div>
                  URL:
          <input
            type="text"
            value={blog.url}
            id="url"
            onChange={({ target }) => blog.url = target.value}
          />
        </div>
        <button type="submit" onClick={() => setNewBlog(blog)}>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm