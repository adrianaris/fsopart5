import React, { useState } from 'react'

const Blog = ({ blog, addLike, user, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideDisplay = { display: visible ? 'none' : '' }
  const showDisplay = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    blog.likes++
    addLike(blog.id, blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = { display: blog.user.name === user.name ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideDisplay}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showDisplay}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        {blog.user &&
        <>
          <div>
            {blog.user.name}
          </div>
          <button style={removeButtonStyle} onClick={handleDeleteBlog}>
        remove
          </button>
        </>
        }
      </div>
    </div>
  )}

export default Blog