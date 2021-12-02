import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Error from './components/Error'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
    
    await blogService.create(newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs) 
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
      <div>
        <h2>blogs</h2>
        <Error message={errorMessage} />
        {user === null ?
          <LoginForm 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        /> :
        <> 
          
          <h4>{user.name} logged-in 
            <button onClick={handleLogout}>logout</button>
          </h4>
          <h2>create new</h2>
          <AddBlogForm
          addBlog={addBlog}
          setNewBlog={setNewBlog}
          />
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)} </>
        }
      </div>
  )
}

export default App