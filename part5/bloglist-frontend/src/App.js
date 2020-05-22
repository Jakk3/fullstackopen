import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  // user
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notifications
  const [notification, setNotification] = useState(null)
  const [success, setSuccess] = useState(false)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sortBlogs(blogs)
      setBlogs(sortedBlogs)
    }

    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      createNotification('Wrong Credentials', false)
    }
  }

  const sortBlogs = (blogs) => {
    const compare = (a, b) => {
      if (a.likes > b.likes)
        return -1
      if (a.likes < b.likes)
        return 1

      return 0
    }
    blogs = blogs.sort(compare)
    return blogs
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.add(newBlog)
      setBlogs(blogs.concat(blog))
      createNotification(`new blog '${blog.title}' by ${blog.author}`, true)
    } catch (exception) {
      createNotification('Blog creation failed', false)
    }
  }

  const createNotification = (message, success) => {
    setNotification(message)
    setSuccess(success)
    notificationHide()
  }

  const notificationHide = () => {
    setTimeout(() => setNotification(null), 6000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  )

  const addLike = (blog) => () => {
    let blogCopy = { ...blog }
    blogCopy.likes++
    try {
      blogService.update(blogCopy)
    } catch (expection) {
      createNotification(expection, false)
    }
    const blogIndex = blogs.findIndex(b => b.id === blogCopy.id)

    let blogsCopy = [...blogs]
    blogsCopy[blogIndex].likes++
    blogsCopy = sortBlogs(blogsCopy)
    setBlogs(blogsCopy)
  }

  const deleteBlog = (blog) => () => {
    if (window.confirm('Are you sure you want to delete ' + blog.title + ' by ' + blog.author + '?'))
      try {
        blogService.del(blog)
        const blogIndex = blogs.findIndex(b => b.id === blog.id)
        let blogsCopy = [...blogs]
        blogsCopy.splice(blogIndex, 1)
        setBlogs(blogsCopy)
      } catch (exception) {
        createNotification(exception, false)
      }
  }

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />)
      }
    </>
  )

  return (
    <div>
      {notification === null ?
        null :
        <Notification message={notification} success={success} />}
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App