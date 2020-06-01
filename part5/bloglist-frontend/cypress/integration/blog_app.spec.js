
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alexander Hamilton',
      username: 'Hamilton',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    // cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succees with correct credentials', function () {
      cy.get('#username').type('Hamilton')
      cy.get('#password').type('salainen')
      cy.get('#login').click()

      cy.contains('Alexander Hamilton logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Jeffersson')
      cy.get('#password').type('presidentti')
      cy.get('#login').click()
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('.error').contains('Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('Hamilton')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Farmer Refuted')
      cy.get('#author').type('Alexander Hamilton')
      cy.get('#url').type('https://blogspot.com/aham/blog/farmer-refuted')
      cy.get('#submit-blog').click()
      cy.get('#blogs').contains('Farmer Refuted')
    })

    it('User can like a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Farmer Refuted')
      cy.get('#author').type('Alexander Hamilton')
      cy.get('#url').type('https://blogspot.com/aham/blog/farmer-refuted')
      cy.get('#submit-blog').click()
      cy.get('#blogs').contains('Farmer Refuted')

      cy.get('#blogs').contains('view').click()
      cy.get('#blogs').contains('like').click()
      cy.get('#blogs').contains('likes: 1')
    })

    it('User can delete a blog they created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Farmer Refuted')
      cy.get('#author').type('Alexander Hamilton')
      cy.get('#url').type('https://blogspot.com/aham/blog/farmer-refuted')
      cy.get('#submit-blog').click()
      cy.get('#blogs').contains('Farmer Refuted')

      cy.get('#blogs').contains('view').click()
      cy.get('#blogs').contains('delete').click()

      cy.get('#blogs').contains('Farmer Refuted').should('not.exist')
    })

    it('Blogs are sorted by most likes', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('What did I miss?')
      cy.get('#author').type('Thomas Jeffersson')
      cy.get('#url').type('https://blogspot.com/aham/blog/farmer-refuted')
      cy.get('#submit-blog').click()
      cy.get('#blogs').contains('What did I miss?')

      cy.contains('new blog').click()
      cy.get('#title').type('Farmer Refuted')
      cy.get('#author').type('Alexander Hamilton')
      cy.get('#url').type('https://blogspot.com/aham/blog/farmer-refuted')
      cy.get('#submit-blog').click()
      cy.get('#blogs').contains('Farmer Refuted')

      cy.get('.blog:last-child').contains('view').click()
      cy.get('.blog:last-child').contains('like').click()

      cy.get('.blog:last-child').contains('What did I miss?')
    })
  })
})

