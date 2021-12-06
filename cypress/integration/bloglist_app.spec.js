describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Adrian Serbanescu',
            username: 'adrianaris',
            password: 'parola'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('blogs')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('login', function() {
        it('login can be performed', function() {
            cy.login({ username: 'adrianaris', password: 'parola' })
            cy.contains('Adrian Serbanescu logged-in')
        })
        it('login fails with wrong password', function() {
            cy.get('#username').type('adrianaris')
            cy.get('#password').type('gresit')
            cy.get('#login-button').click()

            cy.get('.notification')
              .should('contain', 'Wrong credentials')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'Adrian Serbanescu logged-in')
        })    
    })
    
    
    describe('when logged-in', function() {
        beforeEach(function() {
           cy.login({ username: 'adrianaris', password: 'parola' }) 
        })

        it('a new blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('cypress baby')
            cy.get('#author').type('CypressHill')
            cy.get('#url').type('https://www.cypress.io/')
            cy.contains('Add Blog').click()
            cy.contains('cypress baby')
        })
       
        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.contains('new blog').click()
                cy.get('#title').type('cypress preexisting blog')
                cy.get('#author').type('CypressHill')
                cy.get('#url').type('https://www.cypress.io/')
                cy.contains('Add Blog').click()
                cy.contains('cypress preexisting blog CypressHill')
            })
            
            it('a like can be added', function() {
                cy.contains('cypress preexisting blog CypressHill')
                  .contains('view').click()
                cy.contains('like').click()
                cy.contains('1')
            })
            
            it('the blog can be deleted', function () {
                cy.contains('cypress preexisting blog CypressHill')
                  .contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'cypress preexisting blog CypressHill')
            })
            
            it('the blog can not be deleted by different user', function() {
                cy.contains('logout').click()

                const diffUser = {
                    name: 'Luminita Serbanescu',
                    username: 'lumigoo',
                    password: 'parola'
                }
                
                cy.request('POST', 'http://localhost:3003/api/users', diffUser)
                cy.login({ username: 'lumigoo', password: 'parola' })
                
                cy.contains('cypress preexisting blog CypressHill')
                  .contains('view').click()
                cy.get('.removeButton').should('not.exist')
            })
            
            it.only('the blogs are ordered by likes descending', function() {
               cy.addBlog({
                   title: 'most likes',
                   author: 'CypressHill',
                   url: 'adrianserbanescu.com',
                   likes: 4
               }) 
               cy.addBlog({
                   title: 'title',
                   author: 'author',
                   url: 'adrianserbanescu.com',
                   likes: 2
               })
              
               cy.get('.viewButton').click({ multiple: true })
               cy.get('.likesCounter').invoke('text').then(like => {
                   const sorted = (arr) => {
                       for(let i = 0; i < arr.length; i++) {
                           let j = i + 1
                           if(arr[j] > arr[i]) {
                               return false
                           }
                           return true
                       }
                   } 
                   expect(sorted(like)).to.eq(true)
               })
            })
        })
    })
    
    
})

