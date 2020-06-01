import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = () => {
    if (blog.user.id === user.id) {
      return (
        <button onClick={deleteBlog(blog)}>delete</button>
      )
    }
    return null
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel='view' hideLabel='hide'>
        <span>
          {blog.url}<br />
          likes: {blog.likes} <button onClick={addLike(blog)}>like</button> <br />
          {blog.user.name}<br />
          {deleteButton()}<br />
        </span>
      </Togglable>
    </div>
  )
}

export default Blog
