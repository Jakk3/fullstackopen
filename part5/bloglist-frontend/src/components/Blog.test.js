import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

test('blog additional information hidden by default', () => {
  const blog = {
    title: 'Your Obedient Servant',
    author: 'Alexander Hamilton',
    url: 'blogspot.com',
    likes: 34,
    user: {
      id: 15,
      username: 'Hamilton',
      name: 'Alexander Hamilton'
    }
  }

  const user = blog.user

  const addLike = () => {

  }

  const deleteBlog = () => {

  }

  const component = render(
    <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
  )

  const hiddenContainer = component.container.querySelector('.hiddencontent').style

  expect(hiddenContainer).toHaveProperty('display', 'none')
})

