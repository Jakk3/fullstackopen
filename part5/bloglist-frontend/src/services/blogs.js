import axios from 'axios'
const baseUrl = '/api/blogs'

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

export default { getAll, setToken, add }