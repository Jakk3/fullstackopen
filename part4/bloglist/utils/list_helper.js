const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const likesArray = blogs.map(blog => blog.likes)

  return blogs.length === 0
    ? 0
    : likesArray.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return 'no blogs'

  let maxI = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[maxI].likes)
      maxI = i
  }
  return blogs[maxI]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return 'no blogs'

  let counts = {}
  for (let i = 0; i < blogs.length; i++) {
    if (!counts.hasOwnProperty(blogs[i].author))
      counts[blogs[i].author] = 1
    else
      counts[blogs[i].author]++
  }

  const topAuthor = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)

  let top = {
    author: topAuthor,
    blogs: counts[topAuthor]
  }
  return top
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return 'no blogs'

  let counts = {}
  for (let i = 0; i < blogs.length; i++) {
    if (!counts.hasOwnProperty(blogs[i].author))
      counts[blogs[i].author] = blogs[i].likes
    else
      counts[blogs[i].author] += blogs[i].likes
  }

  const topAuthor = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)

  let top = {
    author: topAuthor,
    likes: counts[topAuthor]
  }
  return top
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}