import React from 'react'

const AddBlogForm = (props) => {
    const { addBlog, setNewBlog} = props
    const blog = {}
    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input 
                type="text"
                value={blog.title}
                name="Title"
                onChange={({ target }) => blog.title = target.value}
                />
            </div>
            <div>
                Author:
                <input
                type="text"
                value={blog.author}
                name="Author"
                onChange={({ target }) => blog.author = target.value}
                />
            </div>
            <div>
                URL:
                <input
                type="text"
                value={blog.url}
                name="URL"
                onChange={({ target }) => blog.url = target.value}
                />
            </div>
            <button type="submit" onClick={() => setNewBlog(blog)}>Add Blog</button>
        </form>
    )
}

export default AddBlogForm