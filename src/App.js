import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Error from './components/Error'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
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
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  const addBlogFormRef = useRef()
  const addBlog = async (event) => {
    event.preventDefault()
    
    addBlogFormRef.current.toggleVisibility()
    await blogService.create(newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs) 
    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  
  return (
      <div>
        <h2>blogs</h2>
        <Error message={notification} />
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
          <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
          <AddBlogForm
          addBlog={addBlog}
          setNewBlog={setNewBlog}
          />
          </Toggable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)} </>
        }
      </div>
  )
}

export default App