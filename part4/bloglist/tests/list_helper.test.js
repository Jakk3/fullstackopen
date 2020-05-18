const listHelper = require('../utils/list_helper')

test('dummy test', () => {
  const result = listHelper.dummy(new Array('tatag', 'safa'))

  expect(result).toBe(1)
})

const listWithOneBlog = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })



  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total likes of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('top likes', () => {
  test('empty list returns "no blogs"', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe('no blogs')
  })

  test('list with one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('of list of blogs, returns top blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('top bloggers', () => {
  test('empty list returns "no blogs"', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual('no blogs')
  })

  const oneBlog = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  }

  test('list with one blog returns that blogger', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  const mostBlogs = {
    author: "Robert C. Martin",
    blogs: 3
  }

  test('of list of blogs, return top blogger', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })
})

describe('top authors by likes', () => {
  test('empty list returns "no blogs"', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual('no blogs')
  })

  const oneBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 5
  }

  test('list with one blog returns that blogger', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  const mostBlogs = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }

  test('of list of blogs, return top liked blogger', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostBlogs)
  })
})