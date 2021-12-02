import React, {useState} from 'react'

const AddBlogForm = (props) => {
    const { addBlog } = props
    const [newBlog, setNewBlog] = useState({})

    const blog = {}
    const createBlog = (event) => {
        
        addBlog(newBlog)
        
        setNewBlog({})
    }

    return (
        <form onSubmit={createBlog}>
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