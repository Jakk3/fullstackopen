import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const add = async props => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, props, config)
  return res.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const update = async (blog) => {
  blog.user = token.user

  const res = await axios.put(baseUrl + blog.id, blog)
  return res.data
}

const del = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const req = await axios.delete(baseUrl + blog.id, config)
  return req.data
}

export default { getAll, setToken, add, update, del }