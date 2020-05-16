import axios from 'axios'

const url = 'http://localhost:3001/persons/'

const add = newPerson => {
  const req = axios.post(url, newPerson)
  return req.then(response => response.data)
}

const getAll = () => {
  const req = axios.get(url)
  return req.then(response => response.data)
}

const del = (id) => {
  return axios.delete(url + id)
}

const update = (id, person) => {
  const req = axios.put(url + id, person)
  return req.then(response => response.data)
}

export default { add, getAll, del, update }